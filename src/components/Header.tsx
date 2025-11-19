import { Lock, Tractor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState, useEffect } from "react";

export const Header = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConnect = () => {
    const injectedConnector = connectors.find((c) => c.id === "injected");
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };

  if (!mounted) return null;

  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Tractor className="h-8 w-8 text-primary" />
              <Lock className="absolute -bottom-1 -right-1 h-4 w-4 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">FarmLedger</h1>
              <p className="text-sm text-muted-foreground">Operate Freely, Log Securely.</p>
            </div>
          </div>

          {isConnected ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs text-muted-foreground">Connected</span>
                <span className="text-sm font-mono text-foreground">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </div>
              <Button variant="outline" onClick={() => disconnect()}>
                Disconnect
              </Button>
            </div>
          ) : (
            <Button onClick={handleConnect} className="bg-primary hover:bg-primary/90">
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
