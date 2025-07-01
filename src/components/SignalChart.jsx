import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const sampleData = Array.from({ length: 128 }, (_, i) => ({
  x: i,
  power: Math.random() * 50,
}));

export function SignalChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sampleData}>
          <XAxis dataKey="x" hide />
          <YAxis domain={[0, 60]} />
          <Tooltip />
          <Line type="monotone" dataKey="power" stroke="#3b82f6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
