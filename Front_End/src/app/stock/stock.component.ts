import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importation nécessaire
import { ReactiveFormsModule } from '@angular/forms'; // Pour utiliser [formGroup] et les formulaires réactifs
import { StockService , Stock } from '../Services/stock.service';


@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Ajoutez CommonModule et ReactiveFormsModule ici
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  stocks: Stock[] = []; // Liste des stocks
  stockForm!: FormGroup; // Formulaire d'ajout/modification
  selectedStock: Stock | null = null; // Stock sélectionné
  isFormVisible = false; // Indique si le formulaire est visible
  isAdding: boolean = false; // Initialize the property

  constructor(private stockService: StockService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadStocks();
    this.initializeForm();
  }

  // Charger la liste des stocks
  loadStocks(): void {
    this.stockService.getStocks().subscribe(
      (data) => (this.stocks = data),
      (error) => console.error('Erreur lors du chargement des stocks :', error)
    );
  }

  // Initialiser le formulaire
  initializeForm(): void {
    this.stockForm = this.fb.group({
      dateDepot: ['', Validators.required],
      typeOperation: ['ENTREE', Validators.required],
      quantite: [0, [Validators.required, Validators.min(1)]],
    });
  }

  // Afficher le formulaire pour ajouter un stock
  openForm(): void {
    this.isFormVisible = true;
    this.selectedStock = null;
    this.stockForm.reset();
  }

  // Fermer le formulaire
  closeForm(): void {
    this.isFormVisible = false;
    this.stockForm.reset();
  }

  // Supprimer un stock
  deleteStock(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID invalide :', id);
      return;
    }
    if (confirm('Êtes-vous sûr de vouloir supprimer ce stock ?')) {
      this.stockService.deleteStock(id).subscribe(
        () => this.loadStocks(),
        (error) => console.error('Erreur lors de la suppression du stock :', error)
      );
    }
  }
  

  // Modifier un stock
  editStock(stock: Stock): void {
    this.selectedStock = stock;
    this.stockForm.patchValue(stock);
    this.isFormVisible = true;
  }

  // Afficher les détails d'un stock
  viewDetails(stock: Stock): void {
    alert(`Détails du Stock :
      ID : ${stock.id}
      Date : ${stock.dateDepot}
      Type : ${stock.typeOperation}
      Quantité : ${stock.quantite}`);
  }

  // Soumettre le formulaire pour ajouter ou modifier un stock
  onSubmit(): void {
    if (this.stockForm.valid) {
      const newStock = this.stockForm.value; // Données du formulaire
      this.stockService.createStock(newStock).subscribe(
        (response) => {
          console.log('Stock ajouté avec succès :', response);
          this.stocks.push(response); // Ajouter directement le stock à la liste
          this.stockForm.reset(); // Réinitialiser le formulaire
          this.isFormVisible = false; // Fermer le formulaire
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du stock :', error);
        }
      );
    } else {
      console.error('Le formulaire est invalide');
    }
  }
  
  
}