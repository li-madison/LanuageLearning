// Example Next.js API route: /api/translate.ts
import { NextRequest, NextResponse } from "next/server";
import { Translate } from "@google-cloud/translate/build/src/v2/index.js";

const translate = new Translate({ key: process.env.GOOGLE_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { text, target } = await req.json();
    const [translation] = await translate.translate(text, target);
    return NextResponse.json({ translated: translation });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ translated: Text });
  }
}
