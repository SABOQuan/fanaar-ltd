// AWS Lambda handler (Node.js) for the contact form.
// Wire it to API Gateway (HTTP API) with a POST route.
// It re-validates server-side, blocks bots, stores each submission in
// DynamoDB (so you have a searchable record of every lead), and emails you via SES.
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const contactSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  countryCode: z.string().min(1).max(10),
  phone: z.string().min(4).max(20),
  service: z.string().min(1),
  budget: z.string().max(100).optional().or(z.literal("")),
  projectDescription: z.string().min(1).max(2000),
  requestNDA: z.boolean().optional(),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot
});

const ses = new SESClient({});
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    // Lock this down to your real domain in production.
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  try {
    const body = JSON.parse(event.body ?? "{}");
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid input" }) };
    }
    // Honeypot filled => silently treat as success so bots don't learn.
    if (result.data.website) {
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    }

    const { firstName, lastName, email, countryCode, phone, service, budget, projectDescription, requestNDA } =
      result.data;

    const submittedAt = new Date().toISOString();

    await ddb.send(
      new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
          id: randomUUID(),
          submittedAt,
          firstName,
          lastName,
          email,
          phone: `${countryCode} ${phone}`,
          service,
          budget: budget || null,
          projectDescription,
          requestNDA: !!requestNDA,
        },
      })
    );

    await ses.send(
      new SendEmailCommand({
        Source: process.env.FROM_EMAIL,        // a verified SES sender
        Destination: { ToAddresses: [process.env.TO_EMAIL] },
        Message: {
          Subject: { Data: `New enquiry from ${firstName} ${lastName}` },
          Body: {
            Text: {
              Data: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${countryCode} ${phone}\nService: ${service}\nBudget: ${budget || "-"}\nNDA requested: ${requestNDA ? "Yes" : "No"}\n\n${projectDescription}`,
            },
          },
        },
      })
    );

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Server error" }) };
  }
};
