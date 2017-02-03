import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NavigationService} from '../../navigation/navigation.service';
import {MenuItem} from '../../navigation/menu-item';

@Component({
  selector : 'c-levels',
  template : `
    <md-card>
      <md-card-title>Menu Levels</md-card-title>
      <md-card-content>
        Menu Level {{level}}
      </md-card-content>
      <md-card-actions>
        <button md-raised-button color="primary" (click)="addChildMenu()">Add Custom Level Menu Item</button>
      </md-card-actions>
    </md-card>
  `,
  styles : []
})
export class LevelsComponent implements OnInit {
  private level: number;

  constructor(private _route: ActivatedRoute, private _router: Router, private _navigation: NavigationService) {
  }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.level = params['level'];
    });
  }

  addChildMenu() {
    this._navigation.menuItems.take(1).subscribe(menuItems => {
      let current: MenuItem = this._navigation.findMenuItem('/examples/levels/' + this.level, menuItems);
      if(current !== null && current.children.length === 0) {
        current.children.push(new MenuItem({title : 'Custom Level', link : '/examples/levels/custom'}));
        this._navigation.modifyMenuItem('/examples/levels/' + this.level, current);
        this._router.navigate(['/examples/levels/custom']);
      }
    });
  }
}
