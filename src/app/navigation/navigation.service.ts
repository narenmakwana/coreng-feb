import {Inject, Injectable} from '@angular/core';
import {MdDialog} from '@angular/material';
import {Subject, BehaviorSubject} from 'rxjs';
import {MenuItem} from './menu-item';
import {StringUtils} from '../shared/utils/string-utils';
import {menuItemSetup} from './menu-setup';

export interface ICoreOptions {
  appTitle?: string;
  openSidenavStyle?: string;
  closedSidenavStyle?: string;
  sidenavOpened?: boolean;
  fixedNavbar?: boolean;
  titleSeparator?: string;
}

@Injectable()
export class NavigationService {
  public static smallViewportWidth: number = 600;
  public static largeViewportWidth: number = 992;

  private _menuItems: Subject<MenuItem[]> = new BehaviorSubject(menuItemSetup);
  private _menuItemsTemp: Subject<MenuItem[]> = new BehaviorSubject(null);
  private _activeMenuItem: Subject<MenuItem> = new BehaviorSubject(null);
  private _pageTitle: Subject<string> = new BehaviorSubject(null);
  private _appTitle: Subject<string> = new BehaviorSubject('Core');
  private _browserTitle: Subject<string> = new BehaviorSubject(null);
  private _titleSeparator: Subject<string> = new BehaviorSubject('|');
  private _currentRoute: Subject<string> = new BehaviorSubject(null);
  private _breadcrumbs: Subject<Array<{title: string, link: any[] | string}>> = new BehaviorSubject([]);
  private _windowSize: Subject<number> = new BehaviorSubject(NavigationService.largeViewportWidth);
  private _openSidenavStyle: Subject<string> = new BehaviorSubject('side');
  private _closedSidenavStyle: Subject<string> = new BehaviorSubject('icon overlay');
  private _sidenavOpened: Subject<boolean> = new BehaviorSubject(this.largeScreen);
  private _fixedNavbar: Subject<boolean> = new BehaviorSubject(false);
  private _isRouteLoading: Subject<boolean> = new BehaviorSubject(true);

  constructor(public dialog: MdDialog, @Inject('CoreOptions') private _coreOptions: ICoreOptions) {
    if(!StringUtils.isNull(_coreOptions.appTitle)) {
      this._appTitle.next(_coreOptions.appTitle);
    }
    if(!StringUtils.isNull(_coreOptions.openSidenavStyle)) {
      this._openSidenavStyle.next(_coreOptions.openSidenavStyle);
    }
    if(!StringUtils.isNull(_coreOptions.closedSidenavStyle)) {
      this._closedSidenavStyle.next(_coreOptions.closedSidenavStyle);
    }
    if(!StringUtils.isNull(_coreOptions.sidenavOpened)) {
      this._sidenavOpened.next(_coreOptions.sidenavOpened);
    }
    if(!StringUtils.isNull(_coreOptions.fixedNavbar)) {
      this._fixedNavbar.next(_coreOptions.fixedNavbar);
    }
    if(!StringUtils.isNull(_coreOptions.titleSeparator)) {
      this._titleSeparator.next(_coreOptions.titleSeparator);
    }
    let style: string = localStorage.getItem('sidenavOpened');
    if(!StringUtils.isEmpty(style) && this.largeScreen) {
      this._sidenavOpened.next(style === 'true');
    }
  }

  public get menuItems(): Subject<MenuItem[]> {
    return this._menuItems;
  }

  public get tempMenuItems(): Subject<MenuItem[]> {
    return this._menuItemsTemp;
  }

  public get activeMenuItem(): Subject<MenuItem> {
    return this._activeMenuItem;
  }

  public setMenuItems(menuItems: MenuItem[]): void {
    this._menuItems.next(menuItems);
  }

  public setActiveMenuItem(menuItem: MenuItem): void {
    this._activeMenuItem.next(menuItem);
  }

  public modifyMenuItem(original: MenuItem | string, replacement: MenuItem): MenuItem[] {
    let menuItems: MenuItem[] = [];
    this._menuItems.take(1).subscribe(currentMenuItems => {
      if(typeof original === 'string') {
        original = this.findMenuItem(original, currentMenuItems);
      }
      if(original !== undefined && original !== null) {
        currentMenuItems = this.findAndModifyMenuItem(<MenuItem>original, replacement, currentMenuItems);
      }
      menuItems = currentMenuItems;
    });
    this._menuItems.next(menuItems);
    return menuItems;
  }

  private findAndModifyMenuItem(original: MenuItem, replacement: MenuItem, menuItems: MenuItem[]): MenuItem[] {
    let foundItem = this.findMenuItem(original, menuItems, false);
    if(foundItem !== null) {
      let index: number = menuItems.indexOf(foundItem);
      menuItems.splice(index, 1, replacement);
      return menuItems;
    } else {
      for (let i = 0; i < menuItems.length; i++) {
        if(this.findMenuItem(original, menuItems[i].children) !== null) {
          menuItems[i].children = this.findAndModifyMenuItem(original, replacement, menuItems[i].children);
          break;
        }
      }
    }
    return menuItems;
  }

  public addMenuItem(menuItem: MenuItem, index: number = -1): void {
    this._menuItems.take(1).subscribe(menuItems => {
      if(menuItems.indexOf(this.findMenuItem(menuItem, menuItems)) < 0) {
        if(index < 0) {
          menuItems.push(menuItem);
        } else {
          menuItems.splice(index, 0, menuItem);
        }
        this._menuItems.next(menuItems);
      }
    });
  }

  public addMenuItems(menuItems: MenuItem[]): void {
    for (let item of menuItems) {
      this.addMenuItem(item);
    }
  }

  public removeMenuItem(menuItem: MenuItem | string): MenuItem[] {
    let menuItems: MenuItem[] = [];
    this._menuItems.take(1).subscribe(currentMenuItems => {
      if(typeof menuItem === 'string') {
        menuItem = this.findMenuItem(menuItem, currentMenuItems);
      }
      if(menuItem !== undefined && menuItem !== null) {
        currentMenuItems = this.findAndRemoveMenuItem(<MenuItem>menuItem, currentMenuItems);
      }
      menuItems = currentMenuItems;
    });
    this._menuItems.next(menuItems);
    return menuItems;
  }

  private findAndRemoveMenuItem(menuItem: MenuItem, menuItems: MenuItem[]): MenuItem[] {
    let index = menuItems.indexOf(this.findMenuItem(menuItem, menuItems));
    if(index >= 0) {
      menuItems.splice(index, 1);
    } else {
      for (let i = 0; i < menuItems.length; i++) {
        let item: MenuItem = this.findMenuItem(menuItem, menuItems[i].children);
        if(item !== null) {
          menuItems[i].children = this.findAndRemoveMenuItem(menuItem, menuItems[i].children);
          break;
        }
      }
    }
    return menuItems;
  }

  public removeMenuItems(menuItems: MenuItem[]): void {
    for (let item of menuItems) {
      this.removeMenuItem(item);
    }
  }

  public showOnly(menuItem: MenuItem | string): void {
    this._menuItems.take(1).subscribe(items => {
      if(typeof menuItem === 'string') {
        menuItem = this.findMenuItem(menuItem, items);
      }
      if(menuItem === null) {
        return;
      }
      const showAllButton = new MenuItem({
        title : 'Show All Menus', icon : 'keyboard return', clickHandler : () => {
          this._menuItemsTemp.next([]);
          return false;
        }
      });
      this._menuItemsTemp.next([showAllButton, menuItem]);
    });
  }

  public getAutoPageTitle(route: string): string {
    let pageTitle: string = '';
    this._menuItems.take(1).subscribe(items => {
      pageTitle = this.createPageTitle(this.findMenuItem(route, items));
    });
    return pageTitle;
  }

  public get pageTitle(): Subject<string> {
    return this._pageTitle;
  }

  public setPageTitle(title: string): void {
    this._pageTitle.next(title);
  }

  public get appTitle(): Subject<string> {
    return this._appTitle;
  }

  public setAppTitle(appTitle: string): void {
    this._appTitle.next(appTitle);
  }

  public get titleSeparator(): Subject<string> {
    return this._titleSeparator;
  }

  public setTitleSeparator(titleSeparator: string): void {
    this._titleSeparator.next(titleSeparator);
  }

  public get browserTitle(): Subject<string> {
    return this._browserTitle;
  }

  public setBrowserTitle(browserTitle: string): void {
    this._browserTitle.next(browserTitle);
  }

  public getAutoBrowserTitle(pageTitle: string): string {
    let hasPageTitle = !StringUtils.isEmpty(pageTitle);
    let title = '';
    let separator;
    this._appTitle.take(1).subscribe(appTitle => {
      if(appTitle !== null) {
        this._titleSeparator.take(1).subscribe(titleSeparator => {
          separator = titleSeparator !== null ? titleSeparator : '';
          title += appTitle + (hasPageTitle ? (' ' + separator + ' ') : '');
        });
      }
    });
    title += hasPageTitle ? pageTitle : '';
    return title;
  }

  public get currentRoute(): Subject<string> {
    return this._currentRoute;
  }

  public setCurrentRoute(route: string): void {
    this._currentRoute.next(route);
  }

  public getAutoBreadcrumbs(route: string): Array<{title: string, link: any[] | string}> {
    let breadcrumbs: Array<{title: string, link: any[] | string}> = [];
    this._menuItems.take(1).subscribe(items => {
      breadcrumbs = this.createBreadcrumb(this.findMenuItem(route, items));
    });
    return breadcrumbs;
  }

  public get breadcrumbs(): Subject<Array<{title: string, link: any[] | string}>> {
    return this._breadcrumbs;
  }

  public setBreadcrumbs(breadcrumbs: Array<{title: string, link: any[] | string}>): void {
    this._breadcrumbs.next(breadcrumbs);
  }

  public get windowSize(): Subject<number> {
    return this._windowSize;
  }

  public updateViewport(): void {
    this._windowSize.next(NavigationService.viewport().width);
  }

  public get openSidenavStyle(): Subject<string> {
    return this._openSidenavStyle;
  }

  public setOpenSidenavStyle(openSidenavStyle: string): void {
    this._openSidenavStyle.next(openSidenavStyle);
  }

  public get closedSidenavStyle(): Subject<string> {
    return this._closedSidenavStyle;
  }

  public setClosedSidenavStyle(closedSidenavStyle: string): void {
    this._closedSidenavStyle.next(closedSidenavStyle);
  }

  public get sidenavOpened(): Subject<boolean> {
    return this._sidenavOpened;
  }

  public setSidenavOpened(sidenavOpened: boolean): void {
    this._sidenavOpened.next(sidenavOpened);
    this.updateViewport();
    localStorage.setItem('sidenavOpened', ''+sidenavOpened);
  }

  public get fixedNavbar(): Subject<boolean> {
    return this._fixedNavbar;
  }

  public setFixedNavbar(fixedNavbar: boolean): void {
    this._fixedNavbar.next(fixedNavbar);
  }

  public get isRouteLoading(): Subject<boolean> {
    return this._isRouteLoading;
  }

  public setIsRouteLoading(isRouteLoading: boolean): void {
    this._isRouteLoading.next(isRouteLoading);
  }

  public get mediumScreenAndDown(): boolean {
    return window !== undefined ? window.matchMedia(`(max-width: ${NavigationService.largeViewportWidth}px)`).matches : false;
  }

  public get mediumScreenAndUp(): boolean {
    return window !== undefined ? window.matchMedia(`(min-width: ${NavigationService.smallViewportWidth}px)`).matches : false;
  }

  public get smallScreen(): boolean {
    return window !== undefined ? window.matchMedia(`(max-width: ${NavigationService.smallViewportWidth}px)`).matches : false;
  }

  public get mediumScreen(): boolean {
    return window !== undefined ? (!this.smallScreen && !this.largeScreen) : false;
  }

  public get largeScreen(): boolean {
    return window !== undefined ? window.matchMedia(`(min-width: ${NavigationService.largeViewportWidth}px)`).matches : false;
  }

  private createPageTitle(item: MenuItem): string {
    let title = '';
    if(item !== null && item.title !== null) {
      title += item.title;
    }
    return title;
  }

  private createBreadcrumb(item: MenuItem): Array<{title: string, link: any[] | string}> {
    let breadcrumbs: Array<{title: string, link: any[] | string}> = [];
    while (item !== null && item.parent !== null && item.parent !== undefined) {
      breadcrumbs = [{title : item.parent.title, link : item.parent.link}, ...breadcrumbs];
      item = item.parent;
    }
    return breadcrumbs;
  }

  public findMenuItem(link: string | MenuItem, items: MenuItem[], deepCheck: boolean = true): MenuItem {
    if(typeof link === 'string') {
      link = StringUtils.cleanLinkString(<string>link);
    }
    let menuItem: MenuItem = null;
    for (let i = 0; i < items.length; i++) {
      if(link instanceof MenuItem) {
        if(items[i].link === (<MenuItem>link).link && items[i].title === (<MenuItem>link).title) {
          menuItem = items[i];
          break;
        } else if(items[i].children.length > 0 && deepCheck) {
          menuItem = this.findMenuItem(link, items[i].children);
          if(menuItem !== null) {
            break;
          }
        }
      } else {
        if(items[i].link === <string>link) {
          menuItem = items[i];
          break;
        } else if(items[i].children.length > 0 && deepCheck) {
          menuItem = this.findMenuItem(link, items[i].children);
          if(menuItem !== null) {
            break;
          }
        } else if(items[i].pathMatch === 'partial' && StringUtils.startsWith(link, items[i].link)) {
          menuItem = items[i];
          break;
        }
      }
    }
    return menuItem;
  }

  private static viewport(): ViewPort {
    if(!window) {
      return {width : this.smallViewportWidth, height : 500};
    }
    let e: any = window;
    let a: string = 'inner';
    if(!('innerWidth' in window )) {
      a = 'client';
      e = document.documentElement || document.body;
    }
    return {width : e[a + 'Width'], height : e[a + 'Height']};
  }

}

interface ViewPort {
  width: number;
  height: number;
}
