import {Component, ElementRef, OnInit} from '@angular/core';
import {Angulartics2GoogleAnalytics} from 'angulartics2';
import {NavigationService} from './navigation/navigation.service';
import {HostListener} from '@angular/core/src/metadata/directives';
import {Router, Event, NavigationStart, NavigationEnd} from '@angular/router';
import 'hammerjs';

@Component({
  selector : 'app-root',
  templateUrl : './app.component.html',
  styleUrls : ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private pageTitle: string;

  constructor(private _navigation: NavigationService, private _router: Router, private _elementRef: ElementRef, _analytics: Angulartics2GoogleAnalytics) {
  }

  ngOnInit() {
    this._router.events.subscribe((event: Event) => {
      if(event instanceof NavigationStart) {
        this._navigation.setIsRouteLoading(true);
        this._navigation.setBreadcrumbs(null); // Reset breadcrumbs before route change
        this._navigation.setPageTitle(null); // Reset page title before route change
      } else if(event instanceof NavigationEnd) {
        this._navigation.setCurrentRoute((<NavigationEnd>event).urlAfterRedirects);
        this._navigation.setIsRouteLoading(false);
        let routerOutletComponent: HTMLElement = this._elementRef.nativeElement.getElementsByTagName('app-topnav')[0];
        if(routerOutletComponent) {
          routerOutletComponent.scrollIntoView(); // Scroll back to top after route change
        }
      }
    });
    this._navigation.pageTitle.subscribe(pageTitle => {
      this.pageTitle = pageTitle;
    });
  }

  @HostListener('window:resize', ['$event'])
  private resize($event) {
    // Need this to trigger change detection for screen size changes!
    this._navigation.updateViewport();
  }
}
