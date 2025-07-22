import { useAppConfig } from "@/context/AppConfigContext";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ConstellationSelector() {
  const { selectedConstellations, setSelectedConstellations } = useAppConfig();

  return (
    <div>
      <p className="text-sm mb-2">Select GNSS Constellations:</p>
      <ToggleGroup
        type="multiple"
        value={selectedConstellations}
        onValueChange={setSelectedConstellations}
        className="grid grid-cols-2 gap-2 mb-4"
      >
        {["GPS", "Galileo", "BeiDou", "GLONASS"].map((type) => (
          <ToggleGroupItem
              key={type}
              value={type}
              className="w-20 bg-blue-100 text-blue-300 hover:bg-blue-200 data-[state=on]:bg-blue-500 data-[state=on]:text-white transition rounded text-sm px-2 py-1"
          >
              {type}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
