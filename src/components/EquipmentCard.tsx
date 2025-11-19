import { Lock, Unlock, Tractor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { DecryptModal } from "./DecryptModal";
import { useAccount } from "wagmi";
import { toast } from "sonner";

export interface Equipment {
  id: string;
  name: string;
  type: string;
  hourlyRate: string;
  status: "available" | "rented" | "maintenance";
  encryptedData?: {
    usage: string;
    damage: string;
    cost: string;
  };
  rentedBy?: string;
}

interface EquipmentCardProps {
  equipment: Equipment;
  onRent: (id: string) => void;
  onReturn: (id: string) => void;
}

export const EquipmentCard = ({ equipment, onRent, onReturn }: EquipmentCardProps) => {
  const [showDecrypt, setShowDecrypt] = useState(false);
  const { address, isConnected } = useAccount();
  const isRentedByUser = equipment.rentedBy?.toLowerCase() === address?.toLowerCase();

  const handleRent = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    onRent(equipment.id);
  };

  const handleReturn = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    onReturn(equipment.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-primary text-primary-foreground";
      case "rented":
        return "bg-secondary text-secondary-foreground";
      case "maintenance":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardHeader className="bg-gradient-to-br from-muted to-card pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-3">
                <Tractor className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{equipment.name}</h3>
                <p className="text-sm text-muted-foreground">{equipment.type}</p>
              </div>
            </div>
            <Badge className={getStatusColor(equipment.status)}>
              {equipment.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Hourly Rate</span>
              <span className="font-semibold text-foreground">{equipment.hourlyRate}</span>
            </div>

            {equipment.status === "rented" && equipment.encryptedData && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Lock className="h-4 w-4 text-encrypted" />
                  <span>Encrypted Usage Data</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded bg-encrypted/5 border border-encrypted/20">
                    <Lock className="h-3 w-3 text-encrypted" />
                    <div className="flex-1 h-2 bg-encrypted/30 rounded animate-pulse" />
                    <span className="text-xs text-encrypted font-mono">Usage Log</span>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded bg-encrypted/5 border border-encrypted/20">
                    <Lock className="h-3 w-3 text-encrypted" />
                    <div className="flex-1 h-2 bg-encrypted/30 rounded animate-pulse" />
                    <span className="text-xs text-encrypted font-mono">Damage Notes</span>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded bg-encrypted/5 border border-encrypted/20">
                    <Lock className="h-3 w-3 text-encrypted" />
                    <div className="flex-1 h-2 bg-encrypted/30 rounded animate-pulse" />
                    <span className="text-xs text-encrypted font-mono">Cost Details</span>
                  </div>
                </div>

                {isRentedByUser && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => setShowDecrypt(true)}
                  >
                    <Unlock className="h-4 w-4 mr-2" />
                    Decrypt & View
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="bg-muted/50 pt-4">
          {equipment.status === "available" && (
            <Button onClick={handleRent} className="w-full bg-primary hover:bg-primary/90">
              Request Rental
            </Button>
          )}
          {equipment.status === "rented" && isRentedByUser && (
            <Button onClick={handleReturn} variant="secondary" className="w-full">
              Return Equipment
            </Button>
          )}
          {equipment.status === "rented" && !isRentedByUser && (
            <Button disabled className="w-full">
              Currently Rented
            </Button>
          )}
          {equipment.status === "maintenance" && (
            <Button disabled className="w-full">
              Under Maintenance
            </Button>
          )}
        </CardFooter>
      </Card>

      {equipment.encryptedData && (
        <DecryptModal
          isOpen={showDecrypt}
          onClose={() => setShowDecrypt(false)}
          data={equipment.encryptedData}
          equipmentName={equipment.name}
        />
      )}
    </>
  );
};
