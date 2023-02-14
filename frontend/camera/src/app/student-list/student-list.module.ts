import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentListPageRoutingModule } from './student-list-routing.module';

import { StudentListPage } from './student-list.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentListPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [StudentListPage]
})
export class StudentListPageModule {}
