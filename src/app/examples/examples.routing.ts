import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BadgesComponent} from './badges/badges.component';
import {ButtonsComponent} from './buttons/buttons.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {CardsComponent} from './cards/cards.component';
import {FormsComponent} from './forms/forms.component';
import {IconsComponent} from './icons/icons.component';
import {PaginationComponent} from './pagination/pagination.component';
import {TablesComponent} from './tables/tables.component';
import {CheckboxesComponent} from './checkboxes/checkboxes.component';
import {ListsComponent} from './lists/lists.component';
import {TabsComponent} from './tabs/tabs.component';
import {DataTablesComponent} from './data-tables/data-tables.component';
import {GoogleChartsComponent} from './google-charts/google-charts.component';
import {GoogleMapsComponent} from './google-maps/google-maps.component';
import {ProgressComponent} from './progress/progress.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {LevelsComponent} from './levels/levels.component';
import {DefaultLayoutComponent} from '../navigation/layouts/default/default.layout.component';
import {MenuComponent} from './dynamic/menu/menu.component';
import {ExampleComponent} from './dynamic/example/example.component';
import {DialogComponent} from './dialog/dialog.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {WizardComponent} from './wizard/wizard.component';

export const exampleRouting = RouterModule.forChild([
  {
    path : 'examples', component : DefaultLayoutComponent, children : [
    {path : '', redirectTo : 'dashboard', pathMatch: 'full'},
    {path : 'dashboard', component : DashboardComponent},
    {path : 'badges', component : BadgesComponent},
    {path : 'buttons', component : ButtonsComponent},
    {path : 'breadcrumbs', component : BreadcrumbsComponent},
    {path : 'cards', component : CardsComponent},
    {path : 'checkboxes', component : CheckboxesComponent},
    {path : 'dialog', component : DialogComponent},
    {path : 'dynamic', component : MenuComponent},
    {path : 'dynamic-example', component : ExampleComponent},
    {path : 'forms', component : FormsComponent},
    {path : 'google-charts', component : GoogleChartsComponent},
    {path : 'google-maps', component : GoogleMapsComponent},
    {path : 'icons', component : IconsComponent},
    {path : 'layouts', loadChildren : './layouts/layouts.module#LayoutsModule'},
    {path : 'levels/:level', component : LevelsComponent},
    {path : 'lists', component : ListsComponent},
    {path : 'notifications', component : NotificationsComponent},
    {path : 'pagination', component : PaginationComponent},
    {path : 'progress', component : ProgressComponent},
    {path : 'tabs', component : TabsComponent},
    {path : 'tables', component : TablesComponent},
    {path : 'toolbar', component : ToolbarComponent},
    {path : 'wizard', component : WizardComponent},
    {path : 'data-tables', component : DataTablesComponent},
  ]
  }
]);

