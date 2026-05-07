import { time } from 'console';
import { NextResponse } from 'next/server';

export async function GET() {
    const res = await fetch(
        'https://api.geckoterminal.com/api/v2/networks/eth/pools/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640/ohlcv/minute?aggregate=15&limit=1000',
        { next: { revalidate: 60 } }
    );

    const data = await res.json();

    console.log('RAW:', data.data.attributes.ohlcv_list[0])

    const formatted = data.data.attributes.ohlcv_list
        .map((item: any) => {
            const open = Number(item[1]);
            const close = Number(item[4]);
            const high = Number(item[2]);
            const low = Number(item[3]);

            if (!open || !close || !high || !low) return null;

            return { time: item[0], open, close, high, low };

        })
        .filter(Boolean)
        .reverse();

    // Verify kar — yeh 2400+ dikhna chahiye
    console.log('FIRST CANDLE:', formatted[0]);

    return NextResponse.json(formatted);
}