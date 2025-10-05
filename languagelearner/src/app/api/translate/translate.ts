import type { NextApiRequest, NextApiResponse } from "next";
import { TranslationServiceClient } from "@google-cloud/translate";

// Initialize the client using service account JSON
const client = new TranslationServiceClient({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON!),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text, target } = req.body;

    if (!text || !target) {
      return res.status(400).json({ error: "Missing text or target language" });
    }

    const request = {
      parent: `projects/${process.env.GOOGLE_PROJECT_ID}/locations/global`,
      contents: [text],
      mimeType: "text/plain",
      targetLanguageCode: target,
    };

    const [response] = await client.translateText(request);
    const translation = response.translations?.[0]?.translatedText || "";

    res.status(200).json({ translation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Translation failed" });
  }
}
