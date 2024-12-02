import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { StockComponent } from './stock/stock.component';
import { ProduitComponent } from './produit/produit.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CategorieComponent } from './categorie/categorie.component';

export const routes: Routes = [
    { path: '', redirectTo: '/produit', pathMatch: 'full' }, // Redirection par défaut
    { path: 'header', component: HeaderComponent },
    { path: 'produit', component: ProduitComponent },
    { path: 'categorie', component: CategorieComponent },

    { path: 'details/:id', component: ProductDetailsComponent }, // Page Détails
    { path: 'stock', component: StockComponent },
  ];
  