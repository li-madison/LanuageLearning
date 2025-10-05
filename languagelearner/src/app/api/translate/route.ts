// src/app/api/translate/route.ts
import { NextResponse } from "next/server";
import path from "path";
import { TranslationServiceClient } from "@google-cloud/translate/build/src/v3";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // <- this gets the JSON payload
    const { text, target } = body;

    if (!text || !target) {
      return NextResponse.json({ error: "Text and target language are required" }, { status: 400 });
    }

    // Path to your service account JSON
    const serviceAccountPath = path.join(process.cwd(), "./translate-service.json");

    const client = new TranslationServiceClient({
      keyFilename: serviceAccountPath,
    });

    const projectId = "master-chariot-474122-d9"; // replace with your GCP project ID
    const location = "global";

    const [response] = await client.translateText({
      parent: `projects/${projectId}/locations/${location}`,
      contents: [text],
      targetLanguageCode: target,
    });

    if (!response.translations || !response.translations[0]) {
      throw new Error("No translation returned");
    }

    const translated = response.translations[0].translatedText;

    return NextResponse.json({ translated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ translated: "?" });
  }
}
