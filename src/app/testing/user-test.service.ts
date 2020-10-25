import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserTestService {
  user = {
    name: 'max'
  };

constructor() { }

  getDetails() {
    const resultPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Data');
      }, 1500);
    })
    return resultPromise;
  }

}
