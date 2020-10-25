/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserTestComponent } from './user-test.component';
import { UserTestService } from '../user-test.service';

describe('UserTestComponent', () => {
  let component: UserTestComponent;
  let fixture: ComponentFixture<UserTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTestComponent);
    component = fixture.componentInstance;
    // need change detection to update properties 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the user name from the service', () => {
    // injecting service
    const userService = fixture.debugElement.injector.get(UserTestService);
    expect(userService.user.name).toEqual(component.user.name);
  });


  it('should display username if user is logged in', () => {
    // injecting service
    component.isLoggedIn = true;
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toEqual(component.user.name);
  });


  it('shouldnt fetch data succesfully if not called asyncronously', () => {
    const userService = fixture.debugElement.injector.get(UserTestService);
    // give us our own data
    const spy = spyOn(userService, 'getDetails').and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    expect(component.data).toEqual(undefined);
  });

  it('should fetch data succesfully if  called asyncronously', async() => {
    const userService = fixture.debugElement.injector.get(UserTestService);
    // give us our own data
    const spy = spyOn(userService, 'getDetails').and.returnValue(Promise.resolve('Data'));
    fixture.whenStable().then(() => {
      expect(component.data).toEqual('Data');
    });
    // can use fake async and call tick() to finish all async
  });



});
