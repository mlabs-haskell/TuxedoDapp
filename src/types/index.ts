export type Kitty = {
  owner?: string;
  dna?: string;
  name: string;
  gender: 'male' | 'female';
  mom: {
    DNA: string;
    name: string;
  }
  dad: {
    DNA: string;
    name: string;
  }
  breedings: number;// Number of breedings
  status: string;
  forSale: boolean;
  price?: number;
};
