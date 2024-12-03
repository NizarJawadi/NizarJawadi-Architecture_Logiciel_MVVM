import { Produit } from "./Produit";

export interface Stock {
    id?: number;
    dateDepot: string;
    typeOperation: 'ENTREE' | 'SORTIE';
    lignesStock: {
      produit: Produit;
      qte: number;
    }[];
  }
  