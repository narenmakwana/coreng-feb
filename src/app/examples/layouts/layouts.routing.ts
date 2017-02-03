import {RouterModule} from '@angular/router';
import {FullWidthComponent} from './full-width/full-width.component';
import {IconMenuComponent} from './icon-menu/icon-menu.component';
import {LayoutBuilderComponent} from './layout-builder/layout-builder.component';

export const layoutsRouting = RouterModule.forChild([
  {
    path : 'full-width', component : FullWidthComponent
  },
  {
    path : 'icon-menu', component : IconMenuComponent
  },
  {
    path : 'builder', component : LayoutBuilderComponent
  }
]);

