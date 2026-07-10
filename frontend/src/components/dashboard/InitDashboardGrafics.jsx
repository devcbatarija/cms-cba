import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const FALLBACK_DATA = [
  { name: "0–12", cantidad: 0 },
  { name: "13–17", cantidad: 0 },
  { name: "18–25", cantidad: 0 },
  { name: "26–35", cantidad: 0 },
  { name: "36–50", cantidad: 0 },
  { name: "50+", cantidad: 0 },
];

// Alternando rojo y azul CBA
const BAR_COLORS = ["#D50032", "#002E5F", "#D50032", "#002E5F", "#D50032", "#002E5F"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#DEDEDE] shadow-xl rounded-xl px-4 py-3 text-sm"
        style={{ fontFamily: "'Poppins', sans-serif" }}>
        <p className="font-semibold text-[#002E5F] mb-1">{label}</p>
        <p className="font-bold text-lg leading-none" style={{ color: payload[0].fill }}>
          {payload[0].value}
          <span className="text-gray-400 font-normal text-xs ml-1">usuarios</span>
        </p>
      </div>
    );
  }
  return null;
};

export const InitDashboardGrafics = ({ data }) => {
  const raw = data && data.length > 0 ? data : FALLBACK_DATA;
  const normalized = raw.map((item) => ({
    name: item.name ?? item.rango ?? item.label ?? item.edad ?? "—",
    cantidad: item.cantidad ?? item.count ?? item.total ?? item.pv ?? 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={normalized}
        margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
        barSize={36}
        barCategoryGap="35%"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#DEDEDE" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 500, fontFamily: "Poppins, sans-serif" }}
          axisLine={false}
          tickLine={false}
          padding={{ left: 15, right: 15 }}
        />
        <YAxis
          tick={{ fill: "#9ca3af", fontSize: 12, fontFamily: "Poppins, sans-serif" }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F5F6FA" }} />
        <Bar dataKey="cantidad" radius={[8, 8, 0, 0]}>
          {normalized.map((_, i) => (
            <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};