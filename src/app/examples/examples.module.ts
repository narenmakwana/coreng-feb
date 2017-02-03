import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {exampleRouting} from './examples.routing';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedModule} from '../shared/shared.module';
import {ChartsModule} from './charts/charts.module';
import {BadgesComponent} from './badges/badges.component';
import {ButtonsComponent} from './buttons/buttons.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {CardsComponent} from './cards/cards.component';
import {FormsComponent} from './forms/forms.component';
import {FormsModule} from '@angular/forms';
import {IconsComponent} from './icons/icons.component';
import {PaginationComponent} from './pagination/pagination.component';
import {TablesComponent} from './tables/tables.component';
import {MaterialModule} from '@angular/material';
import {CheckboxesComponent} from './checkboxes/checkboxes.component';
import {ListsComponent} from './lists/lists.component';
import {TabsComponent} from './tabs/tabs.component';
import {DataTablesComponent} from './data-tables/data-tables.component';
import {GoogleChartsComponent} from './google-charts/google-charts.component';
import {GoogleMapsComponent} from './google-maps/google-maps.component';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {ProgressComponent} from './progress/progress.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {LevelsComponent} from './levels/levels.component';
import {NavigationModule} from '../navigation/navigation.module';
import {MenuComponent} from './dynamic/menu/menu.component';
import {ExampleComponent} from './dynamic/example/example.component';
import {DialogComponent} from './dialog/dialog.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {WizardComponent} from './wizard/wizard.component';
import {GithubService} from '../shared/services/github.service';

@NgModule({
  imports : [
    exampleRouting,
    NavigationModule,
    ChartsModule,
    SharedModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    AgmCoreModule
  ],
  entryComponents : [],
  declarations : [DashboardComponent, BadgesComponent, ButtonsComponent, BreadcrumbsComponent, CardsComponent,
    FormsComponent, IconsComponent,
    PaginationComponent, TablesComponent, CheckboxesComponent, ListsComponent, TabsComponent, DataTablesComponent,
    GoogleChartsComponent, GoogleMapsComponent, ProgressComponent, ToolbarComponent, LevelsComponent, MenuComponent,
    ExampleComponent, DialogComponent, NotificationsComponent, WizardComponent],
})
export class ExamplesModule {
  static forRoot(): ModuleWithProviders { // currently fails, https://github.com/angular/angular-cli/issues/4245
    return {
      ngModule: ExamplesModule,
      providers: [GithubService]
    }
  }
}
