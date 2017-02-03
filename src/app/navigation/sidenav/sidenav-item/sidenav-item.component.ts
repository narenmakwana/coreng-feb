import {Component, AfterViewInit, OnDestroy, Input, ViewChildren, QueryList} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {MenuItem} from '../../menu-item';
import {StringUtils} from '../../../shared/utils/string-utils';
import {NavigationService} from '../../navigation.service';

@Component({
  selector : 'c-sidenav-item',
  template : `
    <a md-list-item *ngIf="hasExternalLink" (click)="clicked($event)" [href]="menuItem.link" [ngClass]="{ 'active' : active }">
      <md-icon *ngIf="showIcon">{{menuItem.icon}}</md-icon>
      <span class="title">{{ menuItem.title }}</span>
    </a>
    <a md-list-item *ngIf="!hasLink && !hasChildren && !hasQuery && !hasExternalLink" (click)="clicked($event)" [ngClass]="{ 'active' : active }">
      <md-icon *ngIf="showIcon">{{menuItem.icon}}</md-icon>
      <span class="title">{{ menuItem.title }}</span>
    </a>
    <a md-list-item *ngIf="hasLink && !hasChildren && !hasQuery && !hasExternalLink" [routerLink]="menuItem.link" [ngClass]="{ 'active' : active }" (toggle)="true" (click)="clicked($event)">
      <md-icon *ngIf="showIcon">{{menuItem.icon}}</md-icon>
      <span class="title">{{ menuItem.title }}</span>
    </a>
    <a md-list-item *ngIf="hasLink && !hasChildren && hasQuery && !hasExternalLink" [routerLink]="menuItem.link" [queryParams]="menuItem.queryParams" [ngClass]="{ 'active' : active }" (toggle)="true">
      <md-icon *ngIf="showIcon">{{menuItem.icon}}</md-icon>
      <span class="title">{{ menuItem.title }}</span>
    </a>
    <a md-list-item class="nav-dropdown" *ngIf="hasChildren" [ngClass]="{ 'active' : active }" (click)="clicked($event)">
      <md-icon *ngIf="showIcon">{{menuItem.icon}}</md-icon>
      <span class="title">{{ menuItem.title }}</span>
      <span class="app-flex-filler"></span>
      <i class="material-icons" *ngIf="!menuItem.showOnly"></i>
    </a>
    <md-nav-list *ngIf="hasChildren" class="nav-children {{levelClass}}" [ngClass]="{ 'active' : active, 'shrink' : menuItem.shrinkDisplayHeight, 'no-animation' : menuItem.showOnly }" [ngStyle]="{'height.px': height}">
      <c-sidenav-item *ngFor="let menuItemChild of menuItem.children" [menuItem]="menuItemChild" [level]="level + 1" [parent]="_this"></c-sidenav-item>
    </md-nav-list>
  `,
  styles : []
})
export class SidenavItemComponent implements AfterViewInit, OnDestroy {
  @ViewChildren(SidenavItemComponent) children: QueryList<SidenavItemComponent>;
  @Input() menuItem: MenuItem;
  @Input() level: number = 1;

  @Input() set active(active: boolean) {
    this._active = active;
  }

  @Input() parent: SidenavItemComponent;

  private _this: SidenavItemComponent = this;
  private _subscription: Subscription;
  private _active: boolean = false;
  private _currentRoute: string;

  constructor(private _navigation: NavigationService, private _router: Router, private _activatedRoute: ActivatedRoute) {
  }

  ngAfterViewInit() {
    if(!this.hasChildren && this.hasLink) {
      this._subscription = this._navigation.currentRoute.subscribe(currentRoute => { // Open up the current menu item on initial load (i.e. someones refreshes the page or you go directly to an inner page)
        this._currentRoute = currentRoute;
        if(this.isActive(currentRoute)) {
          let hasShowOnly: boolean = false;
          let parent: SidenavItemComponent = this;
          while (parent !== undefined && parent !== null) {
            if(!StringUtils.isNull(parent, 'menuItem') && parent.menuItem.showOnly) {
              hasShowOnly = true;
              break;
            }
            parent = parent.parent;
          }
          if(!hasShowOnly) {
            this.toggle(true);
          } else {
            this._navigation.activeMenuItem.take(1).subscribe(activeMenu => {
              this._navigation.tempMenuItems.take(1).subscribe(tempMenus => {
                if(activeMenu === null && tempMenus === null) {
                  this._navigation.showOnly(parent.menuItem);
                } else if(tempMenus !== null && tempMenus.length > 0) {
                  parent.toggle(true, null, true);
                } else if(activeMenu !== null && tempMenus !== null && tempMenus.length === 0) {
                  if(parent.parent !== undefined && parent.parent !== null) {
                    parent.parent.toggle(true, null, false, true);
                  }
                }
              });
            });
          }
        }
      });
    } else if(this.menuItem.showOnly) {
      this._navigation.tempMenuItems.take(1).subscribe(tempMenus => {
        if(tempMenus !== null && tempMenus.length > 0) {
          this.toggle(true, null, true, true);
        }
      });
    }
  }

  ngOnDestroy() {
    if(this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  toggleDropdown(active: boolean) {
    this.active = active;
    if(this.children) {
      this.children.forEach(childMenu => {
        childMenu.toggle(false, undefined, true);
      });
    }
    if(this.parent && active) {
      this.parent.toggle(active, this);
    }

    if(this.menuItem.showOnly && active) {
      this._navigation.showOnly(this.menuItem);
    }

  }

  toggle(active: boolean, child?: SidenavItemComponent, noParent: boolean = false, noChildren: boolean = false): void {
    this.active = active;
    if(!noChildren && this.children) {
      this.children.forEach(childComponent => {
        if(child !== undefined) {
          if(child !== childComponent) {
            childComponent.toggle(false, undefined, true);
          }
        } else {
          childComponent.toggle(active, undefined, true);
        }
      });
    } else if(active) {
      this._navigation.setActiveMenuItem(this.menuItem);
    }

    if(this.parent !== undefined && !noParent) {
      this.parent.toggle(active, this);
    }
  }

  clicked(event: MouseEvent) {
    if(this.menuItem.clickHandler !== null) {
      let clickResult: boolean = this.menuItem.clickHandler(event, this._navigation, this);
      if(clickResult) {
        this.toggleDropdown(!this._active);
      }
    } else {
      this.toggleDropdown(!this._active);
    }
  }

  isActive(currentRoute: string): boolean {
    if(StringUtils.isEmpty(currentRoute)) {
      return false;
    }
    if(StringUtils.cleanLinkString(currentRoute) === this.menuItem.link) {
      if(this.hasQuery) {
        let active: boolean = false;
        this._activatedRoute.queryParams.take(1).subscribe(params => {
          if(StringUtils.deepCompare(this.menuItem.queryParams, params)) {
            active = true;
          }
        });
        return active;
      } else {
        return true;
      }
    } else if(this.menuItem.pathMatch === 'partial' && StringUtils.startsWith(currentRoute, this.menuItem.link)) {
      return true;
    }
    return false;
  }

  get active(): boolean {
    return this._active || (StringUtils.isEmpty(this._currentRoute) ? false : this.isActive(this._currentRoute));
  }

  get height(): number {
    let addedHeight = 0;
    if(this.children) {
      this.children.forEach(childComponent => {
        if(childComponent.active) {
          addedHeight += childComponent.height;
        }
      });
    }
    return (this.menuItem.children.length * (this.menuItem.shrinkDisplayHeight ? 36 : 48)) + addedHeight;
  }

  get levelClass(): string {
    if(this.level < 4) {
      return `level${this.level}`;
    }
    return 'level5';
  }

  get showIcon(): boolean {
    return !(!this.menuItem || !this.menuItem.icon || StringUtils.isEmpty(this.menuItem.icon)) && (!this.menuItem.showOnly || (this.parent === undefined || this.parent.parent === undefined));
  }

  get hasExternalLink(): boolean {
    if(!this.menuItem) {
      return false;
    }
    return !StringUtils.isEmpty(this.menuItem.link) && (StringUtils.startsWith(this.menuItem.link, 'http://') || StringUtils.startsWith(this.menuItem.link, 'https://'));
  }

  get hasLink(): boolean {
    if(!this.menuItem || this.hasExternalLink) {
      return false;
    }
    return !StringUtils.isEmpty(this.menuItem.link);
  }

  get hasChildren(): boolean {
    if(!this.menuItem) {
      return false;
    }
    return this.menuItem.children.length > 0;
  }

  get hasQuery(): boolean {
    if(!this.menuItem) {
      return false;
    }
    return !this.menuItem.queryParams ? false : Object.getOwnPropertyNames(this.menuItem.queryParams).length !== 0;
  }
}

