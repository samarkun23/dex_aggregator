import { NextResponse } from 'next/server';

export async function GET() {
    const res = await fetch(
        'https://api.geckoterminal.com/api/v2/networks/eth/pools/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640/ohlcv/minute?aggregate=15&limit=1000',
        { next: { revalidate: 60 } }
    );

    const data = await res.json();

    const formatted = data.data.attributes.ohlcv_list
        .map((item: any) => {
            const rawOpen  = Number(item[1]);
            const rawClose = Number(item[4]);
            const rawHigh  = Number(item[2]);
            const rawLow   = Number(item[3]);

            if (!rawOpen || !rawClose || !rawHigh || !rawLow) return null;

            return {
                time: item[0],
                open:  1 / rawOpen,
                close: 1 / rawClose,
                high:  1 / rawLow,   // inverted: low → high
                low:   1 / rawHigh,  // inverted: high → low
            };
        })
        .filter(Boolean)
        .reverse();

    // Verify kar — yeh 2400+ dikhna chahiye
    console.log('FIRST CANDLE:', formatted[0]);

    return NextResponse.json(formatted);
}