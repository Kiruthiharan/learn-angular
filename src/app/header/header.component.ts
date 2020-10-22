import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  constructor( private dataStorage: DataStorageService, private authService: AuthService) { }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData(){
    this.dataStorage.storeRecipies();
  }

  onFetchData() {
    this.dataStorage.fetchData().subscribe()
  }

  onLogOut() {
    this.authService.logout()
  }


}
