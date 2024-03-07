import React from "react";
import { useToast } from "@chakra-ui/react";
import {
  getWallets,
  Wallet,
  WalletAccount,
} from '@talismn/connect-wallets';
import { useAppDispatch } from "../../app/hooks";
import { login } from "./walletSlice";

const DAPP_NAME = process.env.REACT_APP_DAPP_NAME || "development";
const SUPPORTED_WALLETS = ["Talisman"];
const chooseWallets = (wallet: Wallet) => SUPPORTED_WALLETS.includes(wallet.title);

// get an array of wallets which are installed
const installedWallets = getWallets().filter(wallet => wallet.installed)

// get talisman from the array of installed wallets
const talismanWallet = installedWallets.find(wallet => wallet.extensionName === 'talisman')

export const WalletSelector = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  if (talismanWallet) {
    ((talismanWallet as Wallet).enable(DAPP_NAME) as Promise<unknown>).then(() => {
      talismanWallet.subscribeAccounts((accounts) => {
        if (!accounts) return;//TODO: handle error
        dispatch(login({
          address: accounts[0].address,
          source: accounts[0].source,
          name: accounts[0].name
        }))
      })
    })
  }
  return <div>Connecting wallet...</div>
  // return (
  //   <div>
  //     {supportedWallets.filter(chooseWallets).map((wallet: Wallet) =>
  //       <>
  //       <Button
  //         key={wallet.extensionName}
  //         onClick={async () => {
  //           try {
  //             await wallet.enable(DAPP_NAME);
  //             const subscribe = (accounts?: WalletAccount[]) => {
  //               console.log(wallet.getAccounts())
  //               if (!accounts) return
  //               dispatch(login(accounts[0]))
  //               return accounts
  //             };
  //             //const unsubscribe = await wallet.subscribeAccounts(subscribe);
  //             subscribe();
  //           } catch (err) {
  //             toast({
  //               title: "Wallet error",
  //               status: 'error',
  //               description: err as string,
  //               isClosable: true,
  //               duration: 10000,
  //               position: 'top-right'
  //             })
  //           }
  //         }}
  //       >
  //         Connect to {wallet.title}
  //       </Button>
  //         </>
  //     )}
  //   </div>
  // );
}
