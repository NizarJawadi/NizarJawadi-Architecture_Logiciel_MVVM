import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { StockComponent } from './stock/stock.component';
import { ProduitComponent } from './produit/produit.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  /*
    //{ path: '', redirectTo: '/produit', pathMatch: 'full' }, // Redirection par défaut
    { path: '', redirectTo: '/main', pathMatch: 'full'},
    { path :'side-nav',component: SideNavComponent},

    { path :'main',component: MainComponent},
    { path: 'header', component: HeaderComponent },
    { path: 'produit', component: ProduitComponent },
    { path: 'details/:id', component: ProductDetailsComponent }, // Page Détails
    { path: 'stock', component: StockComponent },
     */
    { path: '', redirectTo: '/main', pathMatch: 'full' },  // Default redirect
    { path: 'side-nav', component: SideNavComponent },
    { path: 'main', component: MainComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'produit', component: ProduitComponent },
    { path: 'details/:id', component: ProductDetailsComponent },
    { path: 'stock', component: StockComponent },
    /* { path: 'locations', component: LocationsComponent },  // Make sure LocationsComponent exists
    { path: 'shops', component: ShopsComponent },          // Make sure ShopsComponent exists
    { path: 'sales', component: SalesComponent },          // Make sure SalesComponent exists
    { path: 'statistics', component: StatisticsComponent },// Make sure StatisticsComponent exists
    { path: 'contact', component: ContactComponent },      // Make sure ContactComponent exists
    { path: 'help', component: HelpComponent },    */
  ];
  
  