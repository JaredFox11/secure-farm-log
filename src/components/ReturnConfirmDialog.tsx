import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface ReturnConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (notes: string) => void;
  equipment: {
    name: string;
    hourlyRate: string;
  };
}

export const ReturnConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  equipment,
}: ReturnConfirmDialogProps) => {
  const [notes, setNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onConfirm(notes);
    setNotes("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Return Equipment</DialogTitle>
          <DialogDescription>
            Complete rental and submit final usage report
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-1">{equipment.name}</h3>
            <p className="text-sm text-muted-foreground">Rate: {equipment.hourlyRate}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="damage-notes">Condition & Damage Notes</Label>
            <Textarea
              id="damage-notes"
              placeholder="Describe any damage, wear, or issues encountered during rental..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Be specific about equipment condition. This will be encrypted and stored on-chain.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/5 border border-accent/20">
              <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Usage Data Logged</p>
                <p className="text-xs text-muted-foreground">
                  Operational hours and metrics have been recorded
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Final Calculation</p>
                <p className="text-xs text-muted-foreground">
                  Total cost will be calculated based on logged usage time
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isProcessing}
            variant="secondary"
          >
            {isProcessing ? (
              <>
                <div className="h-4 w-4 border-2 border-secondary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                Processing Return...
              </>
            ) : (
              "Confirm Return"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
