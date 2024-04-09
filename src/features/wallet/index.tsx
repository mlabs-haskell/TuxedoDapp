import React, { useEffect } from "react";
import { useToast, CircularProgress } from "@chakra-ui/react";
import {
  getWallets,
} from '@talismn/connect-wallets';
import { useAppDispatch } from "../../app/hooks";
import { connect, login } from "./walletSlice";
import { api } from "../../api/client";
import { getCoins } from "../trade";
import { getKitties } from "../kittiesList";
import { decodeAddress } from "@polkadot/keyring";
import { u8aToHex } from "@polkadot/util";

const DAPP_NAME = process.env.REACT_APP_DAPP_NAME || "development";

// get an array of wallets which are installed
const installedWallets = getWallets().filter(wallet => wallet.installed)

// get talisman from the array of installed wallets
const talismanWallet = installedWallets.find(wallet => wallet.extensionName === 'talisman')

export const WalletSelector = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  //start connecting to talisman
  useEffect(()=>{
    const fetchData = async () => {
      toast({
        title: 'Talisman connecting',
        description: 'Getting your information from Tuxedo',
        status: 'info',
        duration: 4000,
        isClosable: true,
      });
      if (talismanWallet) {
        await talismanWallet.enable(DAPP_NAME);
        talismanWallet.subscribeAccounts(async (accounts) => {
          if (!accounts) {
            toast({
              title: 'Error',
              description: 'No accounts found',
              status: 'error',
              duration: 4000,
              isClosable: true,
            })
            return;
          }
          // @ts-ignore
          if (!window.accounts){
            console.log('no connect')
            //check if it's first connect
            for (const account of accounts) {
              const key = u8aToHex(decodeAddress(account.address));
              const coins = await dispatch(getKitties(key));
              // @ts-ignore
              const hasNoCoins = !!coins?.payload?.message?.toLowerCase()?.includes('error') || !!coins.error;
              const kitties = await dispatch(getCoins(key));
              // @ts-ignore
              const hasNoKitties = !!kitties?.payload?.message?.toLowerCase()?.includes('error') || !!kitties.error;
              //if it's first connect
              if(hasNoCoins && hasNoKitties){
                //TODO: kitty name generator
                await Promise.allSettled([
                  api["mint-kitty"]('gene', key),
                  api["mint-coins"](key, 600)
                ])
              }
            }
          }


          //finish connecting
          toast({
            title: 'Talisman connected',
            description: `Accounts: ${accounts.map(account =>account.name).join(' ,')} are connected`,
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
          //each account has its own signer, and it can't be saved to store
          //maybe need to use other api to access it
          // @ts-ignore
          window.accounts = accounts;
          dispatch(login(accounts.map(account =>({
            address: account.address,
            source: account.source,
            name: account.name,
            key: u8aToHex(decodeAddress(account.address))
          }))));
          dispatch(connect());
        })
      }
    }
    fetchData()
      .catch(error => {
        toast({
          title: 'Talisman connecting',
          description: error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      });
  },[]);



  return <div>Connecting wallet...<CircularProgress isIndeterminate color='teal' /></div>
}
