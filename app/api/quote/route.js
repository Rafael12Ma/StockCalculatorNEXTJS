import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json(
      { error: 'Missing symbol' },
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`,
    { cache: 'no-store' }
  );

  const data = await res.json();
  // console.log(data)
  const percentFromOpen =
    data.o && data.c
      ? ((data.c - data.o) / data.o) * 100
      : null;

  return NextResponse.json({
    symbol,
    open: data.o,
    current: data.c,
    hightPrice: data.h,
    lowPrice: data.l,
    percentFromOpen
  });
}
