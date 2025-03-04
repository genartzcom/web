import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const codeBase64 = Buffer.from(code).toString('base64');

    const response = await fetch(`${process.env.API_URL}/api/p5compile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: codeBase64 }),
    });

    if (!response.ok) {
      const { error } = await response.json();
      return NextResponse.json(
        {
          error: error || 'Failed to compile code',
        },
        {
          status: 500,
        },
      );
    }

    const data = await response.json();

    const compiledCode = data?.data?.code;
    if (!compiledCode) {
      return NextResponse.json({ error: 'Invalid API response format', response: data }, { status: 500 });
    }

    return NextResponse.json({
      precompiled: compiledCode,
    });
  } catch (error) {
    console.error('Compilation error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
