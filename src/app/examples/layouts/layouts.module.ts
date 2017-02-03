import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {layoutsRouting} from './layouts.routing';
import {MaterialModule} from '../../../../node_modules/@angular/material/module';
import {SharedModule} from '../../shared/shared.module';
import {NavigationModule} from '../../navigation/navigation.module';
import {FullWidthComponent} from './full-width/full-width.component';
import {IconMenuComponent} from './icon-menu/icon-menu.component';
import {LayoutBuilderComponent} from './layout-builder/layout-builder.component';
import {ChartsModule} from '../charts/charts.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports : [
    layoutsRouting,
    ChartsModule,
    MaterialModule,
    SharedModule,
    NavigationModule,
    FormsModule,
    CommonModule
  ],
  declarations : [FullWidthComponent, IconMenuComponent, LayoutBuilderComponent]
})
export class LayoutsModule {
}
