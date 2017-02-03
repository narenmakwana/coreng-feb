import {BrowserModule} from '@angular/platform-browser';
import {NgModule, OpaqueToken} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule, MdSnackBar} from '@angular/material';
import {HttpModule} from '@angular/http';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {Angulartics2Module, Angulartics2GoogleAnalytics} from 'angulartics2';
import {routing} from './app.routing';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {NavigationModule} from './navigation/navigation.module';
import {BaseService} from './shared/services/base.service';
import {SampleDialogComponent} from './examples/dialog/sample-dialog/sample-dialog.component';
import {SampleMenuDialogComponent} from './examples/dialog/sample-menu-dialog/sample-menu-dialog.component';
import {CompletedDialogComponent} from './examples/wizard/completed-dialog/completed-dialog.component';
import {ExamplesModule} from './examples/examples.module';
import {ICoreOptions} from './navigation/navigation.service';

const defaultOptions: ICoreOptions = {
  appTitle : 'CoreNG',
  openSidenavStyle: 'side',
  closedSidenavStyle: 'icon overlay'
};

@NgModule({
  declarations : [
    AppComponent, SampleDialogComponent, SampleMenuDialogComponent, CompletedDialogComponent
  ],
  imports : [
    NavigationModule.forRoot(defaultOptions),
    SharedModule.forRoot(),
    ExamplesModule,
    routing,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey : 'YOUR_API_KEY_HERE' // Enter your key here!
    }),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers : [BaseService, MdSnackBar],
  entryComponents : [AppComponent, SampleDialogComponent, SampleMenuDialogComponent, CompletedDialogComponent],
  bootstrap : [AppComponent]
})
export class AppModule {
}
