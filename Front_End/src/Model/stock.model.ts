export interface Stock {
    id?: number;
    dateDepot: string;
    typeOperation: 'ENTREE' | 'SORTIE';
    lignesStock: {
      produitId: number;
      qte: number;
    }[];
  }
  