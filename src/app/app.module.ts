import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from 'src/environments/environment';
import { AnimationsComponent } from './animations/animations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestingComponent } from './testing/testing.component';
import { UserTestComponent } from './testing/user-test/user-test.component';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      AnimationsComponent,
      TestingComponent,
      UserTestComponent
   ],
   imports: [
      BrowserModule.withServerTransition({ appId: 'serverApp' }),
      BrowserAnimationsModule,
      FormsModule,
      AppRoutingModule,
      HttpClientModule,
      SharedModule,
      CoreModule,
      StoreModule.forRoot(fromApp.appReducer),
      EffectsModule.forRoot([AuthEffects]),
      StoreDevtoolsModule.instrument({logOnly: environment.production}),
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
