import { Observable } from 'rxjs/Observable';
import { LogIn } from './../../store/actions/user.actions';
import { AppState, selectAuthState } from './../../store/app.states';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public user: User = new User();
  public getState: Observable<any>;
  public errorMessage: string | null;

  constructor(
    private store: Store<AppState>
  ) { 
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe(state => {
      this.errorMessage =  state.errorMessage;
    })
  }

  private onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    }
    this.store.dispatch(new LogIn(payload));
  }

}
