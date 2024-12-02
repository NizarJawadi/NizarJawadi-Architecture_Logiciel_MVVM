import { Component, OnInit } from '@angular/core';
import { ProduitComponent } from '../produit/produit.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ProduitComponent ,CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productId: number | null = null;
  product: any = null;

  produits = [
    {
      id: 1,
      nom: 'Produit 1',
      description: 'Description du produit 1.',
      imageUrl: 'assets/images/b4.jpg'
    },
    {
      id: 2,
      nom: 'Produit 2',
      description: 'Description du produit 2.',
      imageUrl: 'assets/images/a3.jpg'
    },
    {
      id: 3,
      nom: 'Produit 3',
      description: 'Description du produit 3.',
      imageUrl: 'assets/images/a1.jpg'
    },
    {
      id: 4,
      nom: 'Produit 4',
      description: 'Description du produit 4.',
      imageUrl: 'assets/images/a2.jpg'
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupère l'ID depuis l'URL
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      this.product = this.produits.find(p => p.id === this.productId);
    });
  }
}
