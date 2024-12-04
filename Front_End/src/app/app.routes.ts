import { Routes } from '@angular/router';
//import { HeaderComponent } from './header/header.component';
import { StockComponent } from './stock/stock.component';

import { ProduitComponent } from './produit/produit.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CategorieComponent } from './categorie/categorie.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },  // Default redirect
    { path: 'side-nav', component: SideNavComponent },
    { path: 'main', component: MainComponent },
    
    //{ path: '', redirectTo: '/produit', pathMatch: 'full' }, // Redirection par défaut
    { path: 'header', component: HeaderComponent },
    { path: 'produit', component: ProduitComponent },
    { path: 'categorie', component: CategorieComponent },

    { path: 'details/:id', component: ProductDetailsComponent }, // Page Détails
    { path: 'stock', component: StockComponent },
  ];
  