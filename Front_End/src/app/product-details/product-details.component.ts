import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Produit } from '../../Model/Produit';
import { ProduitServices } from '../Services/ProduitServices';
import { ProduitComponent } from '../produit/produit.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ProduitComponent ,CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productId: number | null = null;
  product: Produit | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitServices
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID depuis l'URL
    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
      if (this.productId) {
        this.fetchProduct(this.productId);// Appeler le service pour récupérer le produit
      }
    });
  }

  fetchProduct(id: number): void {
    this.produitService.getProduitById(id).subscribe(
      (product : any) => {
        this.product = product; 
        console.log( product ) // Assigner le produit récupéré
      },
      (error : any) => {
        console.error('Erreur lors de la récupération du produit:', error);
        this.errorMessage = 'Impossible de récupérer le produit.';
      }
    );
  }
}
