import { NextResponse } from 'next/server';

export async function GET(request) {
    const token = process.env.FINNHUB_API_KEY;

    if (!token) {
        return NextResponse.json(
            { error: 'Missing Finnhub API key' },
            { status: 500 }
        );
    }

    const { searchParams } = new URL(request.url);
    const symbols = (searchParams.get('symbols') || 'AAPL')
        .split(',')
        .map(s => s.trim());

    const encoder = new TextEncoder();
    let isClosed = false;

    const stream = new ReadableStream({
        start(controller) {
            const ws = new WebSocket(`wss://ws.finnhub.io?token=${token}`);

            const safeClose = () => {
                if (!isClosed) {
                    isClosed = true;
                    controller.close();
                    ws.close();
                }
            };

            ws.onopen = () => {
                symbols.forEach(symbol => {
                    ws.send(JSON.stringify({
                        type: 'subscribe',
                        symbol
                    }));
                });
            };

            ws.onmessage = (event) => {
                if (isClosed) return;
                controller.enqueue(
                    encoder.encode(`data: ${event.data}\n\n`)
                );
            };

            ws.onerror = safeClose;
            ws.onclose = safeClose;

            // Handle client disconnect
            request.signal.addEventListener('abort', safeClose);
        }
    });

    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive'
        }
    });
}
