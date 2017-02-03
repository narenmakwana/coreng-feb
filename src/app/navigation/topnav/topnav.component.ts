import {Component, OnInit, OnDestroy} from '@angular/core';
import {NavigationService} from '../navigation.service';
import {Title} from '@angular/platform-browser';
import {SearchService} from '../../shared/services/search.service';
import {StringUtils} from '../../shared/utils/string-utils';
import {Subscription} from 'rxjs';

@Component({
  selector : 'app-topnav',
  templateUrl : './topnav.component.html',
  styleUrls : ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit, OnDestroy {
  private _sidenavOpenStyle: string;
  private _sidenavOpened: boolean;
  private _pageTitle: string;
  private _browserTitle: string;
  private _isLoadingRoute: boolean = false;
  private _breadcrumbs: Array<{title: string, link: any[] | string}> = [];
  private _autoBreadcrumbs: boolean = true;
  private _searchToggled: boolean = false;
  private _searchTerm: string = '';

  private _breadcrumbInterval: number;
  private _pageTitleInterval: number;
  private _subscriptions: Subscription[] = [];

  constructor(private _navigation: NavigationService, private _search: SearchService, private _title: Title) {
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngOnInit() {
    this._subscriptions.push(this._navigation.openSidenavStyle.subscribe(style => {
      this._sidenavOpenStyle = style;
    }));
    this._subscriptions.push(this._navigation.isRouteLoading.subscribe(isRouteLoading => {
      this._isLoadingRoute = isRouteLoading;
    }));
    this._subscriptions.push(this._navigation.sidenavOpened.subscribe(sidenavOpen => {
      this._sidenavOpened = sidenavOpen;
    }));
    this._subscriptions.push(this._navigation.menuItems.subscribe(items => {
      if(this._autoBreadcrumbs) {
        this.updateAutoBreadcrumbs();
      }
      this.updatePageTitle();
    }));
    this._subscriptions.push(this._navigation.breadcrumbs.subscribe(breadcrumbs => {
      if(breadcrumbs !== null) {
        window.clearInterval(this._breadcrumbInterval);
        this._autoBreadcrumbs = false;
        this._breadcrumbs = breadcrumbs;
      } else {
        if(this._isLoadingRoute) {
          this._breadcrumbInterval = window.setInterval(() => {
            if(!this._isLoadingRoute) {
              window.clearInterval(this._breadcrumbInterval);
              this.updateAutoBreadcrumbs();
            }
          });
        } else {
          this.updateAutoBreadcrumbs();
        }
      }
    }));
    this._subscriptions.push(this._navigation.pageTitle.subscribe(pageTitle => {
      if(pageTitle !== null) {
        window.clearInterval(this._pageTitleInterval);
        this._pageTitle = pageTitle;
        if(this._browserTitle === null) {
          this._title.setTitle(this._navigation.getAutoBrowserTitle(pageTitle));
        }
      } else {
        if(this._isLoadingRoute) {
          this._pageTitleInterval = window.setInterval(() => {
            if(!this._isLoadingRoute) {
              window.clearInterval(this._pageTitleInterval);
              this.updatePageTitle();
            }
          });
        } else {
          this.updatePageTitle();
        }
      }
    }));
    this._subscriptions.push(this._navigation.browserTitle.subscribe(browserTitle => {
      this._browserTitle = browserTitle;
      if(browserTitle !== null) {
        this._title.setTitle(browserTitle);
      } else {
        this._title.setTitle(this._navigation.getAutoBrowserTitle(this._pageTitle));
      }
    }));

    this._subscriptions.push(this._search.searchTerm.subscribe(searchTerm => {
      if(searchTerm !== this._searchTerm) {
        this._searchTerm = searchTerm;
      }
    }));
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(searchTerm: string) {
    this._searchTerm = searchTerm;
    this._search.updateSearchTerm(searchTerm);
  }

  toggleSidenav() {
    this._navigation.setSidenavOpened(!this._sidenavOpened);
  }

  toggleSearch(input: HTMLInputElement) {
    this._searchToggled = !this._searchToggled;
    if(this._searchToggled) {
      window.setTimeout(() => {
        input.focus();
      }, 0);
    }
  }

  searchBlur() {
    if(StringUtils.isEmpty(this.searchTerm)) {
      this._searchToggled = false;
    }
  }

  private updateAutoBreadcrumbs() {
    this._navigation.currentRoute.take(1).subscribe(currentRoute => {
      this._autoBreadcrumbs = true;
      this._breadcrumbs = this._navigation.getAutoBreadcrumbs(currentRoute);
    });
  }

  private updatePageTitle() {
    this._navigation.currentRoute.take(1).subscribe(currentRoute => {
      this._pageTitle = this._navigation.getAutoPageTitle(currentRoute);
      if(this._browserTitle === null) {
        this._title.setTitle(this._navigation.getAutoBrowserTitle(this._pageTitle));
      }
    });
  }

}
