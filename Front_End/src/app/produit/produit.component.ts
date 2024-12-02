import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Produit } from '../../Model/Produit';
import { ProduitServices } from '../Services/ProduitServices';
import { Categorie } from '../../Model/Categorie';
import { CategorieComponent } from '../categorie/categorie.component';
import { CategorieService } from '../Services/CategorieServices';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [ReactiveFormsModule , RouterModule , CommonModule  ] ,
   templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent {
  produitForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  selectedImageName: string = ''; // Variable pour stocker le nom de l'image

  produits: Produit[] = [];
  categories: Categorie[] = [];
  constructor(private produitService: ProduitServices,
    private categorieServices: CategorieService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categorieServices.getCategories().subscribe(
      (data) => {
        this.categories = data;  // Assigner les données reçues au tableau
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    );
    this.produitService.getProduits().subscribe((data) => {
      this.produits = data;
    });

    this.produitForm = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      categorieId: [1, Validators.required],  // Valeur par défaut 0 (ou une valeur valide)
      imagePath: ['', Validators.required],  // Image Path peut être vide ou une valeur par défaut
      qteStock: [0, Validators.required] // Valeur par défaut pour stock
    });
    
  }


  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageName = file.name; // Récupérer le nom du fichier

      // Vous ne devez pas utiliser patchValue ici pour l'input file !
      // Cependant, vous pouvez ajouter le nom du fichier à un autre champ ou variable de votre formulaire
      this.produitForm.get('imagePath')?.setValue(this.selectedImageName); // Mettre à jour l'imageUrl dans le formulaire
    }
  }


  onSubmit(): void {
    if (this.produitForm.valid) {
      // Vider les messages d'erreur ou de succès précédents
      this.successMessage = '';
      this.errorMessage = '';
  
      const produitData = this.produitForm.value;  // Récupérer les données du formulaire
  
      // Vérifier si categorieId est bien défini et si c'est un nombre
      if (produitData.categorieId) {
        produitData.categorieId = parseInt(produitData.categorieId, 10); // Assurez-vous que l'ID est de type number (Long)
      }
  
      // Appel au service pour créer le produit
      this.produitService.createProduit(produitData).subscribe(
        (data) => {
          console.log(data);  // Assigner les produits reçus après l'ajout
          this.successMessage = 'Produit ajouté avec succès !'; // Afficher message de succès
  
          // Ajouter le produit ajouté à la liste (optionnel)
          this.produits.push(data);
  
          // Réinitialiser le formulaire après soumission réussie
          this.produitForm.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du produit:', error);
          this.errorMessage = error?.message || 'Une erreur est survenue lors de l\'ajout du produit.';  // Message d'erreur
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs requis.'; // Message d'erreur si le formulaire n'est pas valide
    }
  }
  


  openModal(): void {
    const modal = document.getElementById('produitModal');
    if (modal) {
      modal.setAttribute('aria-hidden', 'false'); // Affiche le modal et le rend accessible
    }
  }
  
  closeModal(): void {
    const modal = document.getElementById('produitModal');
    if (modal) {
      modal.setAttribute('aria-hidden', 'true'); // Cache le modal et le rend inaccessible
    }
  }
  
}
