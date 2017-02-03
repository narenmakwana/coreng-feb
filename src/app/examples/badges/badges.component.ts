import {Component, OnInit, AfterViewInit} from '@angular/core';
import {NavigationService} from '../../navigation/navigation.service';
import 'prismjs/';

@Component({
  selector : 'c-badges',
  templateUrl : './badges.component.html',
  styleUrls : ['./badges.component.scss']
})
export class BadgesComponent implements OnInit, AfterViewInit {

  constructor(private _navigation: NavigationService) {
  }

  ngOnInit() {
    this._navigation.setPageTitle('Badges');
  }


  ngAfterViewInit() {
    Prism.highlightAll(false);
  }

}
