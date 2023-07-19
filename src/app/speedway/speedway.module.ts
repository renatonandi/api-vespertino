import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeedwayComponent } from './components/speedway/speedway.component';
import { SpeedwayFormComponent } from './components/speedway-form/speedway-form.component';
import { SpeedwayTableComponent } from './components/speedway-table/speedway-table.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';



@NgModule({
  declarations: [
    SpeedwayComponent,
    SpeedwayFormComponent,
    SpeedwayTableComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SpeedwayModule { }
