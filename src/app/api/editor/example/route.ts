import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`${process.env.API_URL}/api/editor/example`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      code: data.code,
    });
  } catch (error) {
    console.error('Error fetching example code:', error);
    return NextResponse.json({ error: 'Failed to fetch example code' }, { status: 500 });
  }
}