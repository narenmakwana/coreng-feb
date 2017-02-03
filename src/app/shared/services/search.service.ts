import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class SearchService {
  private _searchTerm: Subject<string> = new BehaviorSubject(null);
  private _searchEnabled: Subject<boolean> = new BehaviorSubject(true);

  constructor() {}

  public get searchTerm(): Subject<string> {
    return this._searchTerm;
  }

  public updateSearchTerm(searchTerm: string): void {
    this._searchTerm.next(searchTerm);
  }

  public get searchEnabled(): Subject<boolean> {
    return this._searchEnabled;
  }

  public setSearchEnabled(searchEnabled: boolean): void {
    this._searchEnabled.next(searchEnabled);
    if(!searchEnabled) {
      this.resetSearch();
    }
  }

  public resetSearch(): void {
    this._searchTerm.next(null);
  }

}
