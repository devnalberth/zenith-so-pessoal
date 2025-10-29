import React, { useState } from 'react';

interface ChartData {
    label: string;
    value: number;
    color?: string;
}

const DonutTooltip: React.FC<{ data: { label: string, value: number, percentage: number } | null, position: { x: number, y: number }, visible: boolean }> = ({ data, position, visible }) => {
    if (!data) return null;
    return (
        <div
            className={`absolute bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm shadow-lg pointer-events-none transition-opacity duration-200 z-10 ${visible ? 'opacity-100' : 'opacity-0'}`}
            style={{ left: position.x + 10, top: position.y + 10 }}
        >
            <div className="font-bold text-white">{data.label}</div>
            <div className="text-slate-400">{data.value} tarefas ({data.percentage}%)</div>
        </div>
    );
};


interface DonutChartProps {
    data: ChartData[];
}

export const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
    const [activeData, setActiveData] = useState<{ label: string, value: number, percentage: number } | null>(null);
    const [lastData, setLastData] = useState<{ label: string, value: number, percentage: number } | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const total = data.reduce((sum, item) => sum + item.value, 0);
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
        const svgRect = event.currentTarget.getBoundingClientRect();
        const mouseX = event.clientX - svgRect.left;
        const mouseY = event.clientY - svgRect.top;
        setTooltipPosition({ x: mouseX, y: mouseY });

        const x = mouseX - 100;
        const y = mouseY - 100;
        const angle = (Math.atan2(y, x) * (180 / Math.PI) + 450) % 360;

        let cumulativeAngle = 0;
        for (const item of data) {
            const itemAngle = (item.value / total) * 360;
            if (angle >= cumulativeAngle && angle < cumulativeAngle + itemAngle) {
                const newData = {
                    label: item.label,
                    value: item.value,
                    percentage: parseFloat(((item.value / total) * 100).toFixed(1))
                };
                setActiveData(newData);
                setLastData(newData);
                return;
            }
            cumulativeAngle += itemAngle;
        }
    };

    const handleMouseLeave = () => {
        setActiveData(null);
    };


    return (
        <div className="relative flex flex-col md:flex-row items-center gap-6">
            <DonutTooltip data={lastData} position={tooltipPosition} visible={!!activeData} />
            <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <circle cx="100" cy="100" r={radius} fill="transparent" stroke="#334155" strokeWidth="20" />
                {data.map((item, index) => {
                    const percentage = (item.value / total) * 100;
                    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                    const currentOffset = offset;
                    offset += (percentage / 100) * circumference;
                    return (
                        <circle
                            key={index}
                            cx="100"
                            cy="100"
                            r={radius}
                            fill="transparent"
                            stroke={item.color || '#fff'}
                            strokeWidth="20"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={-currentOffset}
                            strokeLinecap="round"
                            className="transition-all duration-300 hover:opacity-80"
                        />
                    );
                })}
            </svg>
            <div className="flex-1 space-y-2 w-full">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-slate-300">{item.label}</span>
                        </div>
                        <span className="font-semibold text-slate-400">{item.value} ({Math.round((item.value/total)*100)}%)</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


interface BarChartProps {
    data: { label: string; value: number }[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const [activeTooltipData, setActiveTooltipData] = useState<{ label: string, value: number } | null>(null);
    const [lastTooltipData, setLastTooltipData] = useState<{ label: string, value: number } | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const maxValue = Math.max(...data.map(d => d.value), 1);
    const chartHeight = 200;
    const barWidth = 40;
    const barMargin = 20;
    
    return (
        <div className="w-full relative">
            {lastTooltipData && (
                 <div
                    className={`absolute bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm shadow-lg pointer-events-none transition-opacity duration-200 z-10 ${activeTooltipData ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        left: tooltipPosition.x,
                        top: tooltipPosition.y,
                        transform: 'translate(-50%, -120%)'
                    }}
                >
                    <div className="font-bold text-white">{lastTooltipData.label}</div>
                    <div className="text-slate-400">{lastTooltipData.value} {lastTooltipData.value === 1 ? 'tarefa' : 'tarefas'}</div>
                </div>
            )}
            <svg width="100%" height={chartHeight + 40} viewBox={`0 0 ${data.length * (barWidth + barMargin)} ${chartHeight + 40}`}>
                {data.map((item, index) => {
                    const barHeight = (item.value / maxValue) * chartHeight;
                    const x = index * (barWidth + barMargin);
                    const y = chartHeight - barHeight;

                    return (
                        <g 
                            key={index}
                            onMouseEnter={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const svgRect = e.currentTarget.ownerSVGElement!.getBoundingClientRect();
                                setActiveTooltipData(item);
                                setLastTooltipData(item);
                                setTooltipPosition({ 
                                    x: (rect.left - svgRect.left + rect.width / 2), 
                                    y: (rect.top - svgRect.top)
                                });
                            }}
                            onMouseLeave={() => setActiveTooltipData(null)}
                        >
                            <rect
                                x={x}
                                y={y}
                                width={barWidth}
                                height={barHeight}
                                fill="url(#barGradient)"
                                rx="4"
                                className="transition-all duration-200 hover:opacity-80"
                            />
                            <text x={x + barWidth / 2} y={chartHeight + 20} textAnchor="middle" fill="#94a3b8" fontSize="12" className="pointer-events-none">{item.label}</text>
                            {item.value > 0 && <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" fill="#cbd5e1" fontSize="14" fontWeight="bold" className="pointer-events-none">{item.value}</text>}
                        </g>
                    );
                })}
                 <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};