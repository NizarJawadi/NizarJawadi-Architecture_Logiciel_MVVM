// app.module.ts
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular-highcharts';
import { SalesByMonthComponent } from './sales-by-month.component';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';

@NgModule({
  declarations: [
    //SalesByCategoryComponent,
     //SalesByMonthComponent,
  ],
  imports: [
    ChartModule,
    //CommonModule,
     // Import ChartModule here
  ],
  exports: [
    //SalesByCategoryComponent,
    //SalesByMonthComponent,
  ]
  
})
export class AppModule {}