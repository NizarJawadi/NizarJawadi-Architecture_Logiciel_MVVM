import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { StockComponent } from './stock/stock.component';
import { ProduitComponent } from './produit/produit.component';

export const routes: Routes = [
    {path:"header" , component: HeaderComponent},
    {path:"produit" , component: ProduitComponent},
    {path:"stock" , component: StockComponent},
];
