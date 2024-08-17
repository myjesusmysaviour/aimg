import { NextResponse } from "next/server";

const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
const API_HOST = 'https://api.stability.ai';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      console.log("Error: Prompt is missing");
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (!STABILITY_API_KEY) {
      console.log("Error: STABILITY_API_KEY is missing");
      return NextResponse.json({ error: "Missing Stability API key" }, { status: 500 });
    }

    console.log("Attempting to generate image with prompt:", prompt);

    const response = await fetch(
      `${API_HOST}/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
            },
          ],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          samples: 1,
          steps: 30,
        }),
      }
    );

    const responseText = await response.text();

    if (!response.ok) {
      console.log("API Response Error:", response.status, responseText);
      return NextResponse.json({ error: `API responded with status ${response.status}: ${responseText}` }, { status: response.status });
    }

    let responseJSON;
    try {
      responseJSON = JSON.parse(responseText);
    } catch (parseError) {
      console.log("Error parsing JSON:", parseError);
      return NextResponse.json({ error: "Failed to parse API response" }, { status: 500 });
    }

    if (!responseJSON.artifacts || responseJSON.artifacts.length === 0) {
      console.log("API Response missing artifacts:", responseJSON);
      return NextResponse.json({ error: "API response is missing image data" }, { status: 500 });
    }

    const image = responseJSON.artifacts[0].base64;

    console.log("Image generated successfully");
    return NextResponse.json({ image: `data:image/png;base64,${image}` });
  } catch (error) {
    console.error("Unexpected error in image generation:", error);
    return NextResponse.json(
      { error: "Unexpected error in image generation", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}