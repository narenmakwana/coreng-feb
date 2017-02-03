import {Component, OnInit, AfterViewInit} from '@angular/core';
import {NavigationService} from '../../navigation/navigation.service';
import 'prismjs/';

@Component({
  selector : 'c-cards',
  templateUrl : './cards.component.html',
  styleUrls : ['./cards.component.scss']
})
export class CardsComponent implements AfterViewInit, OnInit {
  private showBasic: boolean = false;

  constructor(private _navigation: NavigationService) {
  }

  ngOnInit() {
    this._navigation.setPageTitle('Cards');
  }

  ngAfterViewInit() {
    Prism.highlightAll(false);
  }

  toggleBasic() {
    console.log('toggling');
    this.showBasic = !this.showBasic;
  }

}
