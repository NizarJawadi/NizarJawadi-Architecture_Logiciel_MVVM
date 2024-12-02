import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [ RouterModule , CommonModule] ,
   templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent {

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
    },
    {
      id: 5,
      nom: 'Produit 1',
      description: 'Description du produit 1.',
      imageUrl: 'assets/images/b4.jpg'
    },
    {
      id: 6,
      nom: 'Produit 2',
      description: 'Description du produit 2.',
      imageUrl: 'assets/images/a3.jpg'
    },
    {
      id: 7,
      nom: 'Produit 3',
      description: 'Description du produit 3.',
      imageUrl: 'assets/images/a1.jpg'
    },
    {
      id: 8,
      nom: 'Produit 4',
      description: 'Description du produit 4.',
      imageUrl: 'assets/images/a2.jpg'
    }
  ];


  supprimerProduit(id: number): void {
    this.produits = this.produits.filter(produit => produit.id !== id);
  }

  afficherDetails(id: number): void {
    console.log('Détails du produit avec ID:', id);
  }
}
