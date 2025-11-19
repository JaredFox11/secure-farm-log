import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lock, Unlock, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DecryptModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    usage: string;
    damage: string;
    cost: string;
  };
  equipmentName: string;
}

export const DecryptModal = ({ isOpen, onClose, data, equipmentName }: DecryptModalProps) => {
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(false);

  const handleDecrypt = () => {
    setIsDecrypting(true);
    // Simulate decryption process
    setTimeout(() => {
      setIsDecrypting(false);
      setIsDecrypted(true);
    }, 1500);
  };

  const handleClose = () => {
    setIsDecrypted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isDecrypted ? (
              <Unlock className="h-5 w-5 text-primary" />
            ) : (
              <Lock className="h-5 w-5 text-encrypted" />
            )}
            {isDecrypted ? "Decrypted Data" : "Decrypt Usage Data"}
          </DialogTitle>
          <DialogDescription>
            {isDecrypted
              ? `Viewing encrypted data for ${equipmentName}`
              : `Authorize decryption of usage data for ${equipmentName}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!isDecrypted ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 rounded bg-encrypted/5 border border-encrypted/20">
                <Lock className="h-4 w-4 text-encrypted" />
                <div className="flex-1 h-3 bg-encrypted/30 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-2 p-3 rounded bg-encrypted/5 border border-encrypted/20">
                <Lock className="h-4 w-4 text-encrypted" />
                <div className="flex-1 h-3 bg-encrypted/30 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-2 p-3 rounded bg-encrypted/5 border border-encrypted/20">
                <Lock className="h-4 w-4 text-encrypted" />
                <div className="flex-1 h-3 bg-encrypted/30 rounded animate-pulse" />
              </div>

              <Button
                onClick={handleDecrypt}
                disabled={isDecrypting}
                className="w-full bg-accent hover:bg-accent/90"
              >
                {isDecrypting ? (
                  <>
                    <Lock className="mr-2 h-4 w-4 animate-spin" />
                    Decrypting...
                  </>
                ) : (
                  <>
                    <Unlock className="mr-2 h-4 w-4" />
                    Authorize Decryption
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Usage Log</h4>
                    <p className="text-sm text-muted-foreground">{data.usage}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Damage Notes</h4>
                    <p className="text-sm text-muted-foreground">{data.damage}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Cost Details</h4>
                    <p className="text-sm text-muted-foreground">{data.cost}</p>
                  </div>
                </div>
              </div>

              <Button onClick={handleClose} variant="outline" className="w-full">
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
