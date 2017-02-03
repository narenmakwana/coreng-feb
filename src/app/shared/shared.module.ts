import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {WidgetComponent} from './layout/widget/widget.component';
import {MaterialModule} from '@angular/material';
import {ColorService} from './services/color.service';
import {CodeHighlighterDirective} from './layout/code-highlighter/code-highlighter.directive';
import {SearchService} from './services/search.service';

@NgModule({
  declarations : [
    WidgetComponent, CodeHighlighterDirective
  ],
  exports : [WidgetComponent, CodeHighlighterDirective, MaterialModule, FlexLayoutModule],
  imports : [FormsModule, CommonModule, MaterialModule, FlexLayoutModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule : SharedModule,
      providers : [ColorService, SearchService]
    };
  }
}
