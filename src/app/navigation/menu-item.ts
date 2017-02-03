import {StringUtils} from '../shared/utils/string-utils';
import {NavigationService} from './navigation.service';
import {SidenavItemComponent} from './sidenav/sidenav-item/sidenav-item.component';
export class MenuItem {
  public title: string;
  public parent: MenuItem;
  private _shrinkDisplayHeight: boolean = false;
  private _showOnly: boolean = false;
  private _icon: string = null;

  /* Allow creation using object or pass in each property individually */
  constructor(private titleOrData: string | {title: string, link?: string, children?: MenuItem[], queryParams?: Object, clickHandler?: (event: MouseEvent, navigation: NavigationService, sidenavItem: SidenavItemComponent) => boolean, icon?: string, pathMatch?: string}, public link: string = null, public children: MenuItem[] = [], public queryParams: Object = {}, public clickHandler: (event: MouseEvent, navigation: NavigationService, sidenavItem: SidenavItemComponent) => boolean = null, icon: string = null, public pathMatch: string = 'full') {
    if(!(typeof titleOrData === 'string')) {
      this.title = titleOrData.title;
      this.link = titleOrData.link || null;
      this.children = titleOrData.children || [];
      this.queryParams = titleOrData.queryParams || {};
      this.clickHandler = titleOrData.clickHandler || null;
      this.icon = titleOrData.icon || null;
      this.pathMatch = titleOrData.pathMatch || 'full';
    } else {
      this.title = titleOrData;
    }
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].parent = this;
    }
    this.icon = icon || this.icon;
  }

  set icon(icon: string) {
    this._icon = StringUtils.cleanIconName(icon);
  }

  get icon(): string {
    return this._icon;
  }

  setShrinkDisplayHeight(shrinkDisplayHeight: boolean): MenuItem {
    this._shrinkDisplayHeight = shrinkDisplayHeight;
    return this;
  }

  get shrinkDisplayHeight(): boolean {
    return this._shrinkDisplayHeight;
  }

  set shrinkDisplayHeight(shrinkDisplayHeight: boolean) {
    this._shrinkDisplayHeight = shrinkDisplayHeight;
  }

  setShowOnly(showOnly: boolean): MenuItem {
    this._showOnly = showOnly;
    return this;
  }

  get showOnly(): boolean {
    return this._showOnly;
  }

  set showOnly(showOnly: boolean) {
    this._showOnly = showOnly;
  }
}
