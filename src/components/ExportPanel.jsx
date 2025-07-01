import React from "react";
import { Button } from "./ui/button";

export function ExportPanel() {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2">Export Tools</h3>
      <div className="space-x-2">
        <Button variant="default">Export CSV</Button>
        <Button variant="outline">Generate Report</Button>
      </div>
    </div>
  );
}
