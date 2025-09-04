'use client'

import { useEffect, useRef } from 'react'
import { createChart, IChartApi, ISeriesApi, LineData, LineSeries } from 'lightweight-charts'

export function PriceChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const lineSeriesRef = useRef<ISeriesApi<'Line'> | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#1f2937' }, // gray-800
        textColor: '#ffffff',
      },
      grid: {
        vertLines: { color: '#374151' }, // gray-700
        horzLines: { color: '#374151' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    })

    chartRef.current = chart

    // Create line series
    const lineSeries = chart.addSeries(LineSeries, {
      color: '#10b981', // green-500
      lineWidth: 2,
    })

    lineSeriesRef.current = lineSeries

    // Dummy data
    const data: LineData[] = [
      { time: '2023-01-01', value: 0.0001 },
      { time: '2023-01-02', value: 0.00012 },
      { time: '2023-01-03', value: 0.00015 },
      { time: '2023-01-04', value: 0.00018 },
      { time: '2023-01-05', value: 0.00022 },
      { time: '2023-01-06', value: 0.00028 },
      { time: '2023-01-07', value: 0.00035 },
    ]

    lineSeries.setData(data)

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [])

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-green-400">Price Chart</h3>
      <div ref={chartContainerRef} className="w-full" />
    </div>
  )
}