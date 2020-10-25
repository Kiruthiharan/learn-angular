import { Component, OnInit } from '@angular/core';
import { UserTestService } from '../user-test.service';

@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html',
  styleUrls: ['./user-test.component.css']
})
export class UserTestComponent implements OnInit {
  user: {name: string};
  isLoggedIn = false;
  data: string;

  constructor(private userTestService: UserTestService) { }

  ngOnInit() {
    this.user = this.userTestService.user;
    this.userTestService.getDetails().then((data: string) => this.data = data);
  }

}
