import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import {
  getWallets,
  Wallet,
  WalletAccount,
} from '@talismn/connect-wallets';


const DAPP_NAME = process.env.DAPP_NAME || "development";
const SUPPORTED_WALLETS = ["Talisman"];
const chooseWallets = (wallet: Wallet) => SUPPORTED_WALLETS.includes(wallet.title);

export const WalletSelector = () => {
  const supportedWallets: Wallet[] = getWallets();
  const toast = useToast();
  return (
    <div>
      {supportedWallets.filter(chooseWallets).map((wallet: Wallet) =>
        <>
        <Button
          key={wallet.extensionName}
          onClick={async () => {
            try {
              await wallet.enable(DAPP_NAME);
              const callback = (accounts?: WalletAccount[]) => {
                if (accounts) return
                // Save accounts...
                // Also save the selected wallet name as well...
                return accounts
              };
              const unsubscribe = await wallet.subscribeAccounts(callback);
            } catch (err) {
              toast({
                title: "Wallet error",
                status: 'error',
                description: err as string,
                isClosable: true,
                duration: 10000,
                position: 'top-right'
              })
            }
          }}
        >
          Connect to {wallet.title}
        </Button>
          </>
      )}
    </div>
  );
}
