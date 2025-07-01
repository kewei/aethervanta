import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SdrConfigurations({ sdrs, onSdrSelect }) {
  const [selectedSdr, setSelectedSdr] = useState(null);

  const handleSdrClick = (sdr) => {
    setSelectedSdr(sdr);
    onSdrSelect(sdr);
  };

  return (
    <div className="space-y-4">
        <p className="font-semibold">SDR Configurations</p>
        <div className="space-y-2">
            <div>
                <Select className="w-full" onValueChange={handleSdrClick} value={selectedSdr?.id || ""}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select SDR device" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>SDR Devices</SelectLabel>
                    {sdrs.map((sdr) => (
                    <SelectItem key={sdr.id} value={sdr.id}>
                        {sdr.name}
                    </SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
                </Select>
            </div>
            <div className="flex items-center space-x-2">
                <Label htmlFor="frequency">Frequency (MHz)</Label>
                <Input type="number" id="frequency" placeholder="Frequency" />
            </div>
            <div className="flex items-center space-x-2">
                <Label htmlFor="sampling-frequency">Sampling Frequency (MHz)</Label>
                <Input type="number" id="sampling-frequency" placeholder="Sampling Frequency" />
            </div>
        </div>
    </div>
  );
}