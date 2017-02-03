import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {pagesRouting} from './pages.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports : [
    pagesRouting,
    SharedModule,
    CommonModule,
    FormsModule
  ],
  declarations : []
})
export class PagesModule {
}
