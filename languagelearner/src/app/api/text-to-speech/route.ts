import { NextRequest, NextResponse } from 'next/server';
import { ElevenLabsClient } from "elevenlabs";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const elevenlabs = new ElevenLabsClient({
      apiKey: process.env.ELEVENLABS_API_KEY
    });

    // Generate speech using ElevenLabs
    const audio = await elevenlabs.generate({
      voice: "UpphzPau5vxibPYV2NeV", // You can change this to any voice ID
      text: text,
      model_id: "eleven_multilingual_v2", // Supports Spanish
    });

    // Convert the audio stream to a buffer
    const chunks = [];
    for await (const chunk of audio) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);

    // Return the audio as a response
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('ElevenLabs API error:', error);
    return NextResponse.json({ error: 'Failed to generate speech' }, { status: 500 });
  }
}