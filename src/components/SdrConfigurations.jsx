import React, { useState, useEffect } from "react";
import { invoke } from '@tauri-apps/api/core';
import { useAppConfig } from "@/context/AppConfigContext";
import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectLabel, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function SdrConfigurations() {
  const { setSdrConfig } = useAppConfig();
  const [sdrs, setSdrs] = useState([]);
  const [selectedSdr, setSelectedSdr] = useState("");
  const [frequency, setFrequency] = useState("");
  const [sampleRate, setSampleRate] = useState("");
  const [gain, setGain] = useState("");

  const handleSaveSdrConfigurations = async () => {
    const sdr = sdrs.find(s => Object.values(s)[0] === selectedSdr);
    if (!sdr) {
      toast.warn("Please select a valid SDR device.");  
      return;
    }

    if (!frequency) {
      toast.warn("Please input a valid frequency.");
      return;
    }
    if (!sampleRate) {
      toast.warn("Please input a valid sample rate.");
      return;
    }
    if (!gain) {
      toast.warn("Please input a valid gain.");
      return;
    }

    setSdrConfig({
      device: sdr,
      frequency: parseFloat(frequency) * 1e6,
      sampleRate: parseFloat(sampleRate) * 1e6,
      gain: parseFloat(gain),
    });

    try {
      await invoke("upload_sdr_config", {
        device: sdr,
        frequency: parseFloat(frequency) * 1e6,
        sampleRate: parseFloat(sampleRate) * 1e6,
        gain: parseFloat(gain),
      });
    } catch (error) {
      toast.error("Failed to upload SDR configuration. Please try again.");
      return;
    }
  };

  useEffect(() => {
    const fetchSdrs = async () => {
      const data = await invoke("list_sdrs");
      setSdrs(data);
    };

    fetchSdrs();
  }, []);

  useEffect(() => {
    // Optionally reset form on mount
    setSelectedSdr("");
    setFrequency("");
    setSampleRate("");
    setGain("");
  }, []);


  return (
    <div className="space-y-4">
      {/* <p className="font-semibold">SDR Configuration</p> */}

      <div className="space-y-2">
        <div className="flex flex-col space-y-1">
          <Label>SDR Device</Label>
          <Select value={selectedSdr} onValueChange={setSelectedSdr}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select SDR device" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Devices</SelectLabel>
                {sdrs.map((sdr) => (
                  <SelectItem key={Object.keys(sdr)[0]} value={Object.values(sdr)[0]} className="cursor-pointer">
                    {Object.values(sdr)[0]}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-1">
          <Label htmlFor="frequency">Frequency (MHz)</Label>
          <Input
            type="number"
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            placeholder="e.g. 1575.42"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <Label htmlFor="sampleRate">Sample Rate (MHz)</Label>
          <Input
            type="number"
            id="sampleRate"
            value={sampleRate}
            onChange={(e) => setSampleRate(e.target.value)}
            placeholder="e.g. 2.0"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <Label htmlFor="gain">Gain (dB)</Label>
          <Input
            type="number"
            id="gain"
            value={gain}
            onChange={(e) => setGain(e.target.value)}
            placeholder="e.g. 20"
          />
        </div>
      </div>

      <Button onClick={handleSaveSdrConfigurations} type="submit" className="w-full cursor-pointer">
        Save
      </Button>
    </div>
  );
}
