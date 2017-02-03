import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../shared/models/user';

@Component({
  selector : 'c-register',
  templateUrl : './register.component.html',
  styleUrls : ['./register.component.scss']
})
export class RegisterComponent {
  private user: User = new User();
  private confirmPassword: string;
  private errorText: string;

  constructor(private _router: Router) {
  }

  register() {
    if(this.user.password != this.confirmPassword) {
      this.errorText = 'Passwords Do NOT Match';
    } else {
      this._router.navigate(['/dashboard']);
    }
  }
}
