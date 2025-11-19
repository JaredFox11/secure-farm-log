import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EquipmentCard, Equipment } from "@/components/EquipmentCard";
import { useState } from "react";
import { useAccount } from "wagmi";
import { toast } from "sonner";

const Index = () => {
  const { address, isConnected } = useAccount();
  
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([
    {
      id: "1",
      name: "John Deere 8R Tractor",
      type: "Heavy Duty Tractor",
      hourlyRate: "$150/hr",
      status: "available",
    },
    {
      id: "2",
      name: "Case IH Combine Harvester",
      type: "Combine Harvester",
      hourlyRate: "$200/hr",
      status: "rented",
      rentedBy: address || "",
      encryptedData: {
        usage: "Total usage: 24.5 hours across 3 fields. Average fuel consumption: 18.2 L/hr",
        damage: "Minor wear on left track. Small dent on front panel (non-critical). Needs standard maintenance check.",
        cost: "Total: $4,900 (24.5hr × $200/hr). Fuel surcharge: $127. Damage assessment: $50",
      },
    },
    {
      id: "3",
      name: "Kubota M7 Series",
      type: "Utility Tractor",
      hourlyRate: "$85/hr",
      status: "available",
    },
    {
      id: "4",
      name: "New Holland Plow",
      type: "Heavy Plow",
      hourlyRate: "$60/hr",
      status: "maintenance",
    },
    {
      id: "5",
      name: "Massey Ferguson Baler",
      type: "Round Baler",
      hourlyRate: "$120/hr",
      status: "available",
    },
    {
      id: "6",
      name: "Claas Sprayer",
      type: "Self-Propelled Sprayer",
      hourlyRate: "$95/hr",
      status: "rented",
      rentedBy: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      encryptedData: {
        usage: "12 hours of operation. Covered 450 acres. Tank filled 3 times.",
        damage: "No damage reported. All systems functioning normally.",
        cost: "Total: $1,140 (12hr × $95/hr). Tank refill charges: $85",
      },
    },
  ]);

  const handleRent = (id: string) => {
    if (!isConnected) {
      toast.error("Please connect your wallet to rent equipment");
      return;
    }

    setEquipmentList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "rented" as const,
              rentedBy: address,
              encryptedData: {
                usage: "Rental in progress. Data will be logged during operation.",
                damage: "Initial inspection completed. No pre-existing damage noted.",
                cost: `Hourly rate: ${item.hourlyRate}. Final cost calculated upon return.`,
              },
            }
          : item
      )
    );
    
    toast.success("Rental request confirmed! Equipment is now assigned to you.", {
      description: "Usage data is being encrypted and logged to the blockchain.",
    });
  };

  const handleReturn = (id: string) => {
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }

    const equipment = equipmentList.find((item) => item.id === id);
    if (equipment?.rentedBy?.toLowerCase() !== address?.toLowerCase()) {
      toast.error("You can only return equipment you've rented");
      return;
    }

    setEquipmentList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "available" as const,
              rentedBy: undefined,
              encryptedData: undefined,
            }
          : item
      )
    );
    
    toast.success("Equipment returned successfully!", {
      description: "Encrypted usage data has been logged. Thank you for using FarmLedger.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Available Farm Equipment
          </h2>
          <p className="text-muted-foreground">
            Secure, transparent equipment rental with encrypted usage logs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipmentList.map((equipment) => (
            <EquipmentCard
              key={equipment.id}
              equipment={equipment}
              onRent={handleRent}
              onReturn={handleReturn}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
