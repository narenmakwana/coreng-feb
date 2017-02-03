import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../../navigation/navigation.service';
import {MenuItem} from '../../../navigation/menu-item';


export const DynamicMenuItem: MenuItem = new MenuItem({title: 'Dynamic Menu Item', link: '/examples/dynamic-example', icon: 'opacity'});

@Component({
  selector : 'c-menu',
  templateUrl : './menu.component.html',
  styleUrls : ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  showDynamicMenu: boolean = false;


  constructor(private _navigation: NavigationService) {
  }

  ngOnInit() {
    this._navigation.menuItems.take(1).subscribe(menuItems => {
      this.showDynamicMenu = this._navigation.findMenuItem(DynamicMenuItem, menuItems) !== null;
    });
  }

  toggleDynamicMenuItem() {
    if(this.showDynamicMenu) {
      this._navigation.addMenuItem(DynamicMenuItem, 0);
    } else {
      this._navigation.removeMenuItem(DynamicMenuItem);
    }
  }

}
