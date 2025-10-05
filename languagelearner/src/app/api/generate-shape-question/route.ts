import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { usedCombinations = [] } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const usedList = usedCombinations.length > 0 
      ? `\nDo NOT use these combinations that were already used: ${JSON.stringify(usedCombinations)}`
      : '';

    const prompt = `Generate a Simon Says command for a children's game using colors and shapes.

Available colors: red, blue, green, yellow, purple, orange, pink
Available shapes: circle, square, triangle, rectangle, star, heart

${usedList}

Generate a JSON response with:
- command: A phrase like "Touch the red circle" or "Touch the blue star"
- correctAnswer: object with {color: string, shape: string}
- wrongOptions: array of 2 objects with {color: string, shape: string} that are different from the correct answer

IMPORTANT: Make sure the correct answer is DIFFERENT from previously used combinations.
Make it varied and fun! Return ONLY valid JSON, no markdown formatting.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up the response (remove markdown code blocks if present)
    const cleanedText = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    const data = JSON.parse(cleanedText);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Gemini API error:", error);
    
    // Fallback with random generation
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];
    const shapes = ['circle', 'square', 'triangle', 'rectangle', 'star', 'heart'];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    
    const wrongOptions = [];
    for (let i = 0; i < 2; i++) {
      let wrongColor = colors[Math.floor(Math.random() * colors.length)];
      let wrongShape = shapes[Math.floor(Math.random() * shapes.length)];
      
      // Make sure wrong options are different
      while (wrongColor === randomColor && wrongShape === randomShape) {
        wrongColor = colors[Math.floor(Math.random() * colors.length)];
        wrongShape = shapes[Math.floor(Math.random() * shapes.length)];
      }
      
      wrongOptions.push({ color: wrongColor, shape: wrongShape });
    }
    
    const fallback = {
      command: `Touch the ${randomColor} ${randomShape}`,
      correctAnswer: { color: randomColor, shape: randomShape },
      wrongOptions
    };
    
    return NextResponse.json(fallback);
  }
}