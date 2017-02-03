import {Component, OnInit, OnDestroy} from '@angular/core';
import {SearchService} from '../../../shared/services/search.service';
import {NavigationService} from '../../../navigation/navigation.service';
import {StringUtils} from '../../../shared/utils/string-utils';
import {Subscription} from 'rxjs';

@Component({
  selector : 'c-layout-builder',
  templateUrl : './layout-builder.component.html',
  styleUrls : ['./layout-builder.component.scss']
})
export class LayoutBuilderComponent implements OnInit, OnDestroy {
  private _openSidenavStyle: string;
  private _closedSidenavStyle: string;
  private _fixedNavbar: boolean;
  private _sidenavOpened: boolean;
  private _appTitle: string;
  private _searchEnabled: boolean;

  private sidenavStyles: string[] = ['Side', 'Icon', 'Icon Overlay', 'Hidden', 'Off'];
  private _subscriptions: Subscription[] = [];

  constructor(private _navigation: NavigationService, private _search: SearchService) {
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngOnInit() {
    this._subscriptions.push(this._navigation.sidenavOpened.subscribe(opened => {
      this._sidenavOpened = opened;
    }));
    this._navigation.openSidenavStyle.take(1).subscribe(style => {
      this._openSidenavStyle = StringUtils.toTitleCase(style);
    });
    this._navigation.closedSidenavStyle.take(1).subscribe(style => {
      this._closedSidenavStyle = StringUtils.toTitleCase(style);
    });
    this._navigation.fixedNavbar.take(1).subscribe(fixed => {
      this._fixedNavbar = fixed;
    });
    this._navigation.sidenavOpened.take(1).subscribe(opened => {
      this._sidenavOpened = opened;
    });
    this._navigation.appTitle.take(1).subscribe(title => {
      this._appTitle = title;
    });
    this._search.searchEnabled.take(1).subscribe(enabled => {
      this._searchEnabled = enabled;
    });
  }

  get openSidenavStyle(): string {
    return this._openSidenavStyle;
  }

  set openSidenavStyle(sidenavStyle: string) {
    if(sidenavStyle.toLowerCase() === 'hidden' || sidenavStyle.toLowerCase() === 'off') {
      this._closedSidenavStyle = sidenavStyle;
      this._navigation.setClosedSidenavStyle(sidenavStyle.toLowerCase());
    }
    this._openSidenavStyle = sidenavStyle;
    this._navigation.setOpenSidenavStyle(sidenavStyle.toLowerCase());
  }

  get closedSidenavStyle(): string {
    return this._closedSidenavStyle;
  }

  set closedSidenavStyle(sidenavStyle: string) {
    this._closedSidenavStyle = sidenavStyle;
    this._navigation.setClosedSidenavStyle(sidenavStyle.toLowerCase());
  }

  get fixedNavbar(): boolean {
    return this._fixedNavbar;
  }

  set fixedNavbar(fixedNavbar: boolean) {
    this._fixedNavbar = fixedNavbar;
    this._navigation.setFixedNavbar(fixedNavbar);
  }

  get sidenavOpened(): boolean {
    return this._sidenavOpened;
  }

  set sidenavOpened(opened: boolean) {
    this._sidenavOpened = opened;
    this._navigation.setSidenavOpened(opened);
  }

  get appTitle(): string {
    return this._appTitle;
  }

  set appTitle(appTitle: string) {
    this._appTitle = appTitle;
    this._navigation.setAppTitle(appTitle);
    this._navigation.pageTitle.take(1).subscribe(pageTitle => {
      if(StringUtils.isNull(pageTitle)) {
        this._navigation.currentRoute.take(1).subscribe(currentRoute => {
          this._navigation.setBrowserTitle(this._navigation.getAutoBrowserTitle(this._navigation.getAutoPageTitle(currentRoute)));
        });
      } else {
        this._navigation.setBrowserTitle(this._navigation.getAutoBrowserTitle(pageTitle));
      }
    });
  }

  get searchEnabled(): boolean {
    return this._searchEnabled;
  }

  set searchEnabled(searchEnabled: boolean) {
    this._searchEnabled = searchEnabled;
    this._search.setSearchEnabled(searchEnabled);
  }


}
