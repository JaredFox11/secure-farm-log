import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

export const Footer = () => {
  const [statusItems, setStatusItems] = useState([
    { label: "Tractors Active", value: 12, trend: "up" },
    { label: "Harvesters Available", value: 8, trend: "stable" },
    { label: "Plows in Maintenance", value: 3, trend: "down" },
    { label: "Total Rentals Today", value: 27, trend: "up" },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusItems((prev) =>
        prev.map((item) => ({
          ...item,
          value: Math.max(0, item.value + Math.floor(Math.random() * 3 - 1)),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Activity className="h-4 w-4 text-primary" />
            <span className="font-medium">Equipment Status</span>
          </div>
          
          <div className="flex items-center gap-6 flex-wrap">
            {statusItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{item.label}:</span>
                <span className="text-sm font-semibold text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
