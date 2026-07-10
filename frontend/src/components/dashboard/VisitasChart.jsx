import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-white border border-[#DEDEDE] shadow-xl rounded-xl px-4 py-3 text-sm"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <p className="font-semibold text-[#002E5F] mb-1">{label}</p>
        <p className="font-bold text-lg leading-none text-[#D50032]">
          {payload[0].value}
          <span className="text-gray-400 font-normal text-xs ml-1">visitas</span>
        </p>
      </div>
    );
  }
  return null;
};

export const VisitasChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
        <defs>
          <linearGradient id="visitasGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D50032" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#D50032" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#DEDEDE" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: "#9ca3af", fontSize: 11, fontFamily: "Poppins, sans-serif" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#9ca3af", fontSize: 12, fontFamily: "Poppins, sans-serif" }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="visitas"
          stroke="#D50032"
          strokeWidth={2.5}
          fill="url(#visitasGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default VisitasChart;