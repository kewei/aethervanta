// import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SignalChart } from "@/components/SignalChart";
import { AnomalyLog } from "@/components/AnomalyLog";
import { ExportPanel } from "@/components/ExportPanel";
import { Header } from "@/components/Header";
import { SdrConfigurations } from "@/components/SdrConfigurations";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <Header />
      <Tabs defaultValue="live">
        <TabsList>
          <TabsTrigger value="live">Live Monitor</TabsTrigger>
          <TabsTrigger value="offline">Offline Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="live">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <Card className="md:col-span-1">
                <CardContent>
                    <SdrConfigurations
                      sdrs={[
                        { id: "sdr1", name: "SDR 1" },
                        { id: "sdr2", name: "SDR 2" },
                      ]}
                      onSdrSelect={(sdr) => console.log("Selected SDR:", sdr)}
                    />
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardContent>
                <SignalChart />
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardContent>
                <AnomalyLog />
              </CardContent>
            </Card>
          </div>

          <ExportPanel />
        </TabsContent>

        <TabsContent value="offline">
          <div className="space-y-4">
            <p className="text-sm">Load IQ/RINEX files for post-analysis</p>
            <Button variant="secondary">Choose File</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 