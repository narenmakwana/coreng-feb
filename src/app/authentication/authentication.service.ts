import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseService} from '../shared/services/base.service';

@Injectable()
export class AuthenticationService extends BaseService {

  constructor(protected _http: Http) {
    super(_http);
  }
}
