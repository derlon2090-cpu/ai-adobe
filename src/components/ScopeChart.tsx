import { Area, AreaChart, CartesianGrid, Line, LineChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

type ScopeChartProps = {
  type: "rgb" | "wave" | "vector" | "curve";
};

const rgbData = Array.from({ length: 18 }).map((_, index) => ({
  name: index,
  r: 20 + (index % 5) * 14 + (index % 2 ? 8 : 0),
  g: 28 + ((index + 2) % 5) * 12,
  b: 24 + ((index + 1) % 5) * 15
}));

const curveData = Array.from({ length: 10 }).map((_, index) => ({
  x: index,
  value: index * index * 0.8 + 8
}));

const vectorData = [
  { subject: "R", A: 71 },
  { subject: "G", A: 89 },
  { subject: "B", A: 68 },
  { subject: "Y", A: 65 },
  { subject: "M", A: 73 },
  { subject: "C", A: 54 }
];

export function ScopeChart({ type }: ScopeChartProps) {
  if (type === "vector") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={vectorData}>
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }} />
          <Radar dataKey="A" stroke="#9b5cff" fill="#1fd6ff" fillOpacity={0.25} />
        </RadarChart>
      </ResponsiveContainer>
    );
  }

  if (type === "curve") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={curveData}>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <XAxis dataKey="x" tick={false} axisLine={false} tickLine={false} />
          <YAxis tick={false} axisLine={false} tickLine={false} />
          <Line type="monotone" dataKey="value" stroke="#c48cff" strokeWidth={3} dot={{ r: 4, fill: "#ffffff" }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={rgbData}>
        <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false} axisLine={false} tickLine={false} />
        <YAxis tick={false} axisLine={false} tickLine={false} />
        {type === "rgb" ? (
          <>
            <Area type="monotone" dataKey="r" stroke="#ff4d6d" fill="#ff4d6d" fillOpacity={0.18} />
            <Area type="monotone" dataKey="g" stroke="#49e89d" fill="#49e89d" fillOpacity={0.15} />
            <Area type="monotone" dataKey="b" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} />
          </>
        ) : (
          <Area type="monotone" dataKey="b" stroke="#9b5cff" fill="#9b5cff" fillOpacity={0.2} />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}
