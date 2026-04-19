import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";


const CustomBarChart = ({ data = [] }) => {

    const getBarColor = (index) => {
        const color= index % 2 === 0 ? "#ff0000" : "#00ff00";
        console.log(`🟣 getBarColor → index: ${index}, color: ${color}`); // alternating purple shades
        return color;
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                    <p className='text-xs font-semibold text-purple-800 mb-1'>
                        {payload[0].payload.category }
                    </p>
                    <p className='text-sm text-gray-600'>
                        Amount:
                        <span className='text-sm font-medium text-gray-900'>
                            ${payload[0].payload.amount}
                        </span>
                    </p>
                </div>
            )
        }
        return null;
    };

    return (
        <div className='bg-white p-4 rounded-lg shadow mt-6'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 20, left: 10, bottom: 10 }} // ✅ prevents clipping
                    barSize={40} // ✅ ensures thicker visible bars
                >
                    <CartesianGrid strokeDasharray="none" />
                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12, fill: "#555" }}
                        stroke="none"/>
                    <YAxis
                        tick={{ fontSize: 12, fill: "#555" }}
                        stroke="none"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="amount"
                    fill="#FF8042" 
                    radius={[10, 10, 0, 0]}
                    activeDot={{r:8,fill:"yellow"}}
                    activeStyle={{fill:"green"}}
                    >
                        {data.map((entry, index) => {
                            console.log(`📍 Rendering bar ${index}: category=${entry.category}, amount=${entry.amount}`);
                            return <Cell key={index} fill={getBarColor(index)} />
                            })}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart;
