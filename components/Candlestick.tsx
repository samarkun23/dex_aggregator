'use client';

import { useEffect, useRef } from 'react';
import { createChart, CandlestickSeries, ColorType } from 'lightweight-charts';

export default function DexChart() {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<any>(null);
    const seriesRef = useRef<any>(null);
    const init = useRef(false);

    useEffect(() => {
        if (init.current) return;
        if (!chartContainerRef.current) return;
        const container = chartContainerRef.current;
        if (container.clientWidth === 0) return;

        init.current = true;

        const chart = createChart(container, {
            autoSize: true,
            layout: {
                background: { type: ColorType.Solid, color: '#0d1117' },
                textColor: '#4a6080',
                fontSize: 12,
                fontFamily: "'IBM Plex Mono', monospace",
            },
            grid: {
                vertLines: { color: '#1e2d3d' },
                horzLines: { color: '#1e2d3d' },
            },
            rightPriceScale: {
                borderColor: '#1e2d3d',
                minimumWidth: 50,
                scaleMargins: { top: 0.08, bottom: 0.08 },
            },
            timeScale: {
                borderColor: '#1e2d3d',
                timeVisible: true,
                secondsVisible: false,
                barSpacing: 16,
            },
            crosshair: {
                vertLine: {
                    color: '#2a4060',
                    labelBackgroundColor: '#00e5ff',
                },
                horzLine: {
                    color: '#2a4060',
                    labelBackgroundColor: '#00e5ff',
                },
            },
        });

        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#00e676',
            downColor: '#ff1744',
            borderVisible: true,
            wickUpColor: '#00e676',
            wickDownColor: '#ff1744',
            priceFormat: {
                type: 'price',
                precision: 6,
                minMove: 0.0000001,
            },
        });

        chart.timeScale().applyOptions({ barSpacing: 16 });

        chartRef.current = chart;
        seriesRef.current = candleSeries;

        const loadData = async () => {
            const res = await fetch('/api/charts');
            const raw = await res.json();

            const formatted = raw
                .map((item: any) => ({
                    time: item.time,
                    open: Number(item.open),
                    high: Number(item.high),
                    low: Number(item.low),
                    close: Number(item.close),
                }))
                .filter((c: any) =>
                    typeof c.time === 'number' &&
                    !isNaN(c.open) && !isNaN(c.high) &&
                    !isNaN(c.low) && !isNaN(c.close)
                )
                .sort((a: any, b: any) => a.time - b.time);

            if (seriesRef.current && formatted.length) {
                seriesRef.current.setData(formatted);
                chart.timeScale().fitContent();
            }
        };

        loadData();

        const handleResize = () => {
            if (!chartContainerRef.current) return;
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, []);

    return <div ref={chartContainerRef} className="w-full h-full" />;
}