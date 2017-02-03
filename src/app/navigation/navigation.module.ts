import {NgModule, ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';
import {SidenavComponent} from './sidenav/sidenav.component';
import {TopnavComponent} from './topnav/topnav.component';
import {NavigationService, ICoreOptions} from './navigation.service';
import {SidenavItemComponent} from './sidenav/sidenav-item/sidenav-item.component';
import {FooterComponent} from './footer/footer.component';
import {DefaultLayoutComponent} from './layouts/default/default.layout.component';
import {FlexLayoutModule} from '../../../node_modules/@angular/flex-layout/flexbox/_module';

@NgModule({
  imports : [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations : [SidenavComponent, TopnavComponent, SidenavItemComponent, FooterComponent, DefaultLayoutComponent],
  exports : [SidenavComponent, TopnavComponent, FooterComponent, DefaultLayoutComponent]
})
export class NavigationModule {
  static forRoot(defaults: ICoreOptions = {}): ModuleWithProviders {
    return {
      ngModule : NavigationModule,
      providers : [
        NavigationService,
        {provide: 'CoreOptions', useValue: defaults}
      ]
    };
  }
}

