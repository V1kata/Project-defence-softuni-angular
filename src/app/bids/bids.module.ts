import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { BidsRoutingModule } from './bids-routing.module';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    CatalogComponent,
    DetailsComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    BidsRoutingModule
  ],
  
})
export class BidsModule { }
