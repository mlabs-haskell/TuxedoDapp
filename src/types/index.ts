import {
  WalletAccount,
} from '@talismn/connect-wallets';

export type KittyStatus = "had birth recently" | "tired" |  "RearinToGo";

export type Kitty = {
  owner?: string;
  dna?: string;
  name: string;
  gender: 'male' | 'female';
  mom: {
    dna: string;
    name: string;
  }
  dad: {
    dna: string;
    name: string;
  }
  breedings: number;// Number of breedings
  status: KittyStatus;
  forSale: boolean;
  price?: number;
};

export type Coin = {
  hash: string;
  value: number;
}

export type wallet = WalletAccount & {key: string};
