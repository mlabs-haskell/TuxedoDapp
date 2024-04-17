import React, { useEffect, useState } from "react";
import { useToast, CircularProgress } from "@chakra-ui/react";
import { getWallets } from "@talismn/connect-wallets";
import { useAppDispatch } from "../../app/hooks";
import { connect, login } from "./walletSlice";
import { api } from "../../api/client";
import { getCoins } from "../trade";
import { getKitties } from "../kittiesList";
import { decodeAddress } from "@polkadot/keyring";
import { u8aToHex } from "@polkadot/util";

const DAPP_NAME = process.env.REACT_APP_DAPP_NAME || "development";

// get an array of wallets which are installed
const installedWallets = getWallets().filter((wallet) => wallet.installed);

// get talisman from the array of installed wallets
const talismanWallet = installedWallets.find(
  (wallet) => wallet.extensionName === "talisman",
);

export const WalletSelector = () => {
  const [init, setInit] = useState(false);
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      toast({
        title: "Talisman connecting",
        description: "Getting your information from Tuxedo",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
      if (talismanWallet) {
        await talismanWallet.enable(DAPP_NAME);
        talismanWallet.subscribeAccounts(async (accounts) => {
          if (!accounts) {
            toast({
              title: "Error",
              description: "No accounts found",
              status: "error",
              duration: 4000,
              isClosable: true,
            });
            return;
          }

          //finish connecting
          toast({
            title: "Talisman connected",
            description: `Accounts: ${accounts.map((account) => account.name).join(" ,")} are connected`,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
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
              })),
            ),
          );
          dispatch(connect());
        });
      }
    };
    if (init) {
      fetchData().catch((error) => {
        toast({
          title: "Talisman connecting",
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
    }
  }, [init]);

  return (
    <div>
      Connecting wallet...
      <CircularProgress isIndeterminate color="teal" />
    </div>
  );
};
