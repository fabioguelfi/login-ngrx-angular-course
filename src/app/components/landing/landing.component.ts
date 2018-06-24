import { Observable } from 'rxjs/Observable';
import { LogOut } from './../../store/actions/user.actions';
import { AppState, selectAuthState } from './../../store/app.states';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  public getState: Observable<any>;
  public isAuthenticated = false;
  public user = null;
  public errorMessage = null;

  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    })
  }

  private logOut(): void {
    this.store.dispatch(new LogOut({}));
  }

}
