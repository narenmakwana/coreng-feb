import {Component, AfterViewInit, OnInit} from '@angular/core';
import {NavigationService} from '../../navigation/navigation.service';
import 'prismjs/';

@Component({
  selector : 'c-checkboxes',
  templateUrl : './checkboxes.component.html',
  styleUrls : ['./checkboxes.component.scss']
})
export class CheckboxesComponent implements AfterViewInit, OnInit {

  constructor(private _navigation: NavigationService) {
  }

  ngOnInit() {
    this._navigation.setPageTitle('Checkboxes');
  }

  ngAfterViewInit() {
    Prism.highlightAll(false);
  }
}
