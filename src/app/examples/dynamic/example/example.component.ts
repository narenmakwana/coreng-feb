import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../../navigation/navigation.service';
import {DynamicMenuItem} from '../menu/menu.component';

@Component({
  selector : 'c-example',
  templateUrl : './example.component.html',
  styleUrls : ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  private position = 0;

  constructor(private _navigation: NavigationService) {
  }

  moveDown() {
    this.position++;
    this.move();
  }

  moveUp() {
    this.position > 0 ? this.position-- : this.position = 0;
    this.move();
  }

  move() {
    this._navigation.removeMenuItem('/examples/dynamic-example');
    this._navigation.addMenuItem(DynamicMenuItem, this.position);
  }

  ngOnInit() {
    this._navigation.menuItems.take(1).subscribe(menuItems => {
      if(this._navigation.findMenuItem(DynamicMenuItem, menuItems) === null) {
        this._navigation.addMenuItem(DynamicMenuItem, 0)
      }
    });
  }

}
