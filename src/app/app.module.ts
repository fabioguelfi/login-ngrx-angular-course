import { AuthGuardService } from './services/auth-guard.service';
import { TokenInterceptor, ErrorInterceptor } from './services/token.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

// ngrx
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AuthActionTypes, All } from './store/actions/user.actions';
import { reducers } from './store/app.states';
import { StatusComponent } from './components/status/status.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignUpComponent,
    LogInComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    RouterModule.forRoot([
      { path: 'log-in', component: LogInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'status', component: StatusComponent, canActivate: [AuthGuard] },
      { path: '', component: LandingComponent },
      { path: '**', redirectTo: '/' },
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
