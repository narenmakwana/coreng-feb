import {Component, AfterViewInit, OnDestroy} from '@angular/core';
import {NavigationService} from '../../navigation/navigation.service';
import 'prismjs/';

@Component({
  selector : 'c-breadcrumbs',
  templateUrl : './breadcrumbs.component.html',
  styleUrls : ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements AfterViewInit, OnDestroy {

  constructor(private _navigation: NavigationService) {
  }

  ngAfterViewInit() {
    Prism.highlightAll(false);
    this._navigation.setBreadcrumbs([{title : 'Examples', link : ''}, {title : 'Multiple', link : ''}, {title : 'Levels', link : ''}]);
    this._navigation.setBrowserTitle('My Page Title');
  }

  ngOnDestroy() {
    this._navigation.setBrowserTitle(null);
  }
}
