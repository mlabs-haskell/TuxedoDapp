import { useEffect } from "react";
import { useToast, CircularProgress } from "@chakra-ui/react";
import { getWallets } from "@talismn/connect-wallets";
import { useAppDispatch } from "../../app/hooks";
import { login } from "./walletSlice";
import { decodeAddress } from "@polkadot/keyring";
import { u8aToHex } from "@polkadot/util";

const DAPP_NAME = process.env.REACT_APP_DAPP_NAME || "development";

export const WalletSelector = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    const connectWallet = async () => {
      toast({
        title: "Talisman connecting",
        description: "Getting your information from Tuxedo",
        status: "info",
        duration: 4000,
        isClosable: true,
      });

      const installedWallets = getWallets().filter(
        (wallet) => wallet.installed
      );

      const talismanWallet = installedWallets.find(
        (wallet) => wallet.extensionName === "talisman"
      );

      if (!talismanWallet) {
        toast({
          title: "Error connecting wallet",
          description: "Talisman wallet not found",
          status: "error",
          duration: 4000,
          isClosable: true,
        });

        return;
      }

      await talismanWallet.enable(DAPP_NAME);

      talismanWallet.subscribeAccounts(async (accounts) => {
        if (!accounts) {
          toast({
            title: "Error connecting wallet",
            description: "No Talisman accounts found",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
          return;
        }

        //each account has its own signer, and it can't be saved to store
        //maybe need to use other api to access it
        // @ts-ignore
        window.accounts = accounts;

        dispatch(
          login(
            accounts.map((account) => ({
              address: account.address,
              source: account.source,
              name: account.name,
              key: u8aToHex(decodeAddress(account.address)),
            }))
          )
        );

        toast({
          title: "Talisman connected",
          description: `Accounts: ${accounts
            .map((account) => account.name)
            .join(" ,")} are connected`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      });
    };

    // Connect wallet after slight delay to avoid intermittent problem with
    // talismanWallet not being found
    const timeout = setTimeout(() => {
      connectWallet().catch((error) => {
        toast({
          title: "Error connecting wallet",
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, toast]);

  return (
    <div>
      Connecting wallet...
      <CircularProgress isIndeterminate color="teal" />
    </div>
  );
};
