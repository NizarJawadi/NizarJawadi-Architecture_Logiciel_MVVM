import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService, Stock, Produit, LigneStock } from '../Services/stock.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-stock',
  standalone: true, // Ajout de standalone: true
  
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule] // Ajout des modules nécessaires
})
export class StockComponent implements OnInit {
  stocks: Stock[] = [];
  produits: Produit[] = []; // Liste des produits disponibles
  stockForm!: FormGroup;
  //lignesStock: LigneStock[] = [];
  //selectedProduit: Produit | null = null;
  //selectedQuantite: number = 0;
  isFormVisible = false;
  selectedStock: Stock | null = null;


  selectedProduit: Produit = {} as Produit; // or an empty object if no product is selected
//selectedQuantite: number = 0;

  lignesStock: { produit: Produit; qte: number }[] = [];
  selectedQuantite: number = 0;

  constructor(private stockService: StockService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadStocks();
    this.loadProduits();
    this.initializeForm();
  }

  loadStocks(): void {
    this.stockService.getStocks().subscribe((data) => (this.stocks = data));
    console.log(this.stocks) ;
  }

  loadProduits(): void {
    // Charger les produits depuis le backend
    this.stockService.getProduits().subscribe((data) => (this.produits = data));
  }

  initializeForm(): void {
    this.stockForm = this.fb.group({
      dateDepot: ['', Validators.required],
      typeOperation: ['ENTREE', Validators.required],
    });
  }

  openForm(): void {
    this.isFormVisible = true;
    this.selectedStock = null;
    this.lignesStock = [];
    this.stockForm.reset();
  }

  closeForm(): void {
    this.isFormVisible = false;
    this.stockForm.reset();
  }

  addProduct(): void {
    if (this.selectedProduit && this.selectedQuantite && this.selectedQuantite > 0) {
      this.lignesStock.push({
        produit: this.selectedProduit,
        qte: this.selectedQuantite,
      });
  
      // Réinitialiser les champs après ajout
      this.selectedProduit = {} as Produit;;
      this.selectedQuantite = 0;
    } else {
      alert('Veuillez sélectionner un produit et une quantité valide.');
    }
  }
  

  removeProduct(ligne: LigneStock): void {
    const index = this.lignesStock.indexOf(ligne);
    if (index > -1) {
      this.lignesStock.splice(index, 1);
    }
  }

  getTotalQuantity(stock: Stock): number {
    return stock.lignesStock?.reduce((total, ligne) => total + ligne.qte, 0) || 0;
  }

  // viewDetails(stock: Stock): void {
  //   this.selectedStock = stock;
  // }
  viewDetails(stock: Stock): void {
    this.stockService.getStockById(stock.id!).subscribe((data: Stock) => {
      console.log('Stock details:', data);
      this.selectedStock = data;
    }, error => {
      console.error('Error fetching stock details:', error);
    });
  }
  

  deleteStock(id: number | undefined): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce stock ?')) {
      this.stockService.deleteStock(id!).subscribe(() => {
        this.stocks = this.stocks.filter((s) => s.id !== id);
      });
    }
  }

  
  onSubmit(): void {
    if (this.stockForm.valid) {
      const newStock: Stock = {
        ...this.stockForm.value,
        lignesStock: this.lignesStock.map((ligne) => ({
          produitId: ligne.produit.id,
          qte: ligne.qte,
        })),
      };
  
      if (this.selectedStock) {
        // Modify existing stock
        this.stockService.updateStock(this.selectedStock.id!, newStock).subscribe((response) => {
          this.loadStocks();
          this.closeForm();
        });
      } else {
        // Create new stock
        this.stockService.createStock(newStock).subscribe((response) => {
          this.stocks.push(response);
          this.closeForm();
        });
      }
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }
  
}
