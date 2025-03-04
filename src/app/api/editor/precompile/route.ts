import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const { p5 } = body;

  const codeBase64 = Buffer.from(p5).toString('base64');

  const response = await fetch(`${process.env.API_URL}/api/precompile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      p5Code: codeBase64
    }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    return NextResponse.json({
      error: error || 'Failed to compile code'
    }, {
      status: 500
    });
  }

  const data = await response.json();

  return NextResponse.json({
    code: data.data.contract
  });
}
