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
  status: string;
  forSale: boolean;
  price?: number;
};
