import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, Shield } from "lucide-react";
import { useState } from "react";

interface RentalConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  equipment: {
    name: string;
    type: string;
    hourlyRate: string;
  };
}

export const RentalConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  equipment,
}: RentalConfirmDialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Equipment Rental</DialogTitle>
          <DialogDescription>
            Review rental details and confirm transaction
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">{equipment.name}</h3>
            <p className="text-sm text-muted-foreground">{equipment.type}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Hourly Rate</p>
                <p className="text-sm text-muted-foreground">{equipment.hourlyRate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
              <Shield className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm font-medium text-foreground">Encrypted Logging</p>
                <p className="text-sm text-muted-foreground">
                  Usage data will be encrypted and stored on-chain
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/5 border border-secondary/20">
              <DollarSign className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-sm font-medium text-foreground">Security Deposit</p>
                <p className="text-sm text-muted-foreground">
                  Refundable upon equipment return
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-muted border border-border">
            <p className="text-xs text-muted-foreground">
              By confirming, you agree to the rental terms and authorize the creation of
              encrypted usage logs. Final charges will be calculated upon equipment return.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="bg-primary hover:bg-primary/90"
          >
            {isProcessing ? (
              <>
                <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                Processing...
              </>
            ) : (
              "Confirm Rental"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
