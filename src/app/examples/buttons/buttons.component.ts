import {Component, OnInit, AfterViewInit} from '@angular/core';
import {NavigationService} from '../../navigation/navigation.service';
import 'prismjs/';

@Component({
  selector : 'c-buttons',
  templateUrl : './buttons.component.html',
  styleUrls : ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit, AfterViewInit {

  constructor(private _navigation: NavigationService) {
  }

  ngOnInit() {
    this._navigation.setPageTitle('Buttons');
  }


  ngAfterViewInit() {
    Prism.highlightAll(false);
  }

}
