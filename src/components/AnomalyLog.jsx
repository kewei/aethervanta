import React from "react";

const dummyLogs = [
  { time: "12:03:11", type: "Spoofing", severity: "High" },
  { time: "12:05:22", type: "Jamming", severity: "Medium" },
];

export function AnomalyLog() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Anomaly Log</h2>
      <ul className="space-y-1">
        {dummyLogs.map((log, i) => (
          <li key={i} className="text-sm">
            [{log.time}] <span className="font-semibold text-red-600">{log.type}</span> - {log.severity}
          </li>
        ))}
      </ul>
    </div>
  );
}
