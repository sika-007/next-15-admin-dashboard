"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { lusitana } from "../fonts";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function RevenueChart({
  revenue,
}: {
  revenue: { month: string; revenue: number }[];
}) {
  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart data={revenue}>
        <XAxis dataKey="month" fontSize={12} tickLine={true} axisLine={true} />
        <YAxis
          fontSize={12}
          tickLine={true}
          axisLine={true}
          tickFormatter={(value: number) => `$${value}`}
        />
        <Bar
          dataKey="revenue"
          fill="currentColor"
          radius={[9, 9, 0, 0]}
          className="fill-primary"
          minPointSize={4}
        />
        <CartesianGrid strokeDasharray="1 10" />
        <Tooltip contentStyle={{ color: "black" }} />
      </BarChart>
    </ResponsiveContainer>
  );
}
