import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Produit } from '../../Model/Produit';
import { ProduitServices } from '../Services/ProduitServices';
import { ProduitComponent } from '../produit/produit.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ProduitComponent, CommonModule, RouterLink , ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId: any ;
  product: Produit | null = null;
  isEditing: boolean = false; // Indique si on est en mode édition
  errorMessage: string | null = null;
  imagePreview: string | ArrayBuffer | null = null; // Aperçu de l'image

  selectedImage: File | null = null; 

  productForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produitService: ProduitServices
  ) {}

  ngOnInit(): void {

    this.initializeForm();
    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
      if (this.productId) {
        this.fetchProduct(this.productId);
      }
    });


    

    // Récupérer l'ID du produit depuis les paramètres de l'URL
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    
    // Maintenant vous pouvez charger le produit existant pour l'édition
    if (this.productId) {
      this.produitService.getProduitById(this.productId).subscribe(
        (product: Produit) => {
          this.productForm.patchValue(product);  // Remplir le formulaire avec les données du produit
        },
        (error) => {
          console.error('Erreur lors du chargement du produit:', error);
        }
      );
    } else {
      console.error('ID de produit invalide');
    }
  }


   // Gestion de l'upload d'image
   onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];

      // Prévisualisation de l'image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;  // Stocke l'aperçu de l'image
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  fetchProduct(id: number): void {
    this.produitService.getProduitById(id).subscribe(
      (product: any) => {
        this.product = product;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du produit:', error);
        this.errorMessage = 'Impossible de récupérer le produit.';
      }
    );
  }


  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }


  initializeForm(): void {
    this.productForm = this.fb.group({
      libelle: [this.product?.libelle || '', [Validators.required]],
      description: [this.product?.description || ''],
      prix: [this.product?.prix || '', [Validators.required, Validators.min(0)]],
      qteStock: [this.product?.qteStock || '', [Validators.required, Validators.min(0)]],
      imagePath: ['']
    });
  }

  updateProduct(): void {
    if (this.productForm.valid) {
      const updatedProduct: Produit = this.productForm.value;  // Récupère les données du formulaire
      updatedProduct.id = parseInt( this.productId,10);  // Ajouter l'ID récupéré aux données mises à jour

      console.log('Produit mis à jour :', updatedProduct);

      // Vous devez passer l'ID du produit à mettre à jour
      this.produitService.updateProduit(this.productId, updatedProduct)
        .subscribe(
          (response) => {
            console.log('Produit mis à jour avec succès :', response);
            // Redirigez l'utilisateur ou affichez un message de succès
            location.reload()  // Exemple de redirection vers la liste des produits
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du produit :', error);
          }
        );
    } else {
      console.error('Formulaire invalide');
    }
  }
}
