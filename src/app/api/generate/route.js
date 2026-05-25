import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { product, audience, tone } = await req.json();

    if (!product || !audience || !tone) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const prompt = `You are a world-class marketing copywriter.
Generate 4 different marketing copy variations for the following:

Product/Service: ${product}
Target Audience: ${audience}
Tone: ${tone}

Return ONLY a valid JSON array with exactly 4 objects. No explanation, no markdown, no backticks. Just raw JSON:
[
  { "type": "Headline", "copy": "..." },
  { "type": "Ad Caption", "copy": "..." },
  { "type": "Email Subject", "copy": "..." },
  { "type": "Tagline", "copy": "..." }
]`;

    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON array from response
    const start = text.indexOf('[');
    const end = text.lastIndexOf(']') + 1;

    if (start === -1 || end <= start) {
      return new Response(
        JSON.stringify({ error: 'Could not parse AI response. Try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const parsed = JSON.parse(text.slice(start, end));

    return new Response(JSON.stringify(parsed), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('API Error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate copy.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}