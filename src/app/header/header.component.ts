import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../_services/auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  constructor( private dataStorage: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) { }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  ngOnInit() {
    this.userSub = this.store.select('auth').subscribe(authState => {
      this.isAuthenticated = !!authState.user;
    });
  }

  onSaveData(){
    this.dataStorage.storeRecipies();
  }

  onFetchData() {
    this.dataStorage.fetchData().subscribe();
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.Logout())
    // this.authService.logout();
  }


}
