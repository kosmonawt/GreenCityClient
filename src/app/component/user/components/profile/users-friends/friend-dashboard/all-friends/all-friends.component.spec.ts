import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '@global-service/localstorage/local-storage.service';
import { UserFriendsService } from '@global-user/services/user-friends.service';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, of } from 'rxjs';

import { AllFriendsComponent } from './all-friends.component';

describe('AllFriendsComponent', () => {
  let component: AllFriendsComponent;
  let fixture: ComponentFixture<AllFriendsComponent>;
  let localStorageServiceMock: LocalStorageService;
  localStorageServiceMock = jasmine.createSpyObj('LocalStorageService', ['userIdBehaviourSubject']);
  localStorageServiceMock.userIdBehaviourSubject = new BehaviorSubject(1111);
  let userFriendsServiceMock: UserFriendsService;

  const response = {
    id: 1,
    name: 'Name',
    profilePicture: '',
    added: false
  };

  const userFriends = {
    totalElements: 1,
    totalPages: 1,
    currentPage: 1,
    page: [
      {
       id: 1,
       name: 'Name',
       profilePicture: '',
       added: true,
       rate: 380,
       city: 'Lviv',
       mutualFriends: 5
      },
      {
        id: 2,
        name: 'Name2',
        profilePicture: '',
        added: true,
        rate: 380,
        city: 'Lviv',
        mutualFriends: 5
       },
     ]
    };

  userFriendsServiceMock = jasmine.createSpyObj('UserFriendsService', ['getAllFriends', 'deleteFriend', 'addFriend']);
  userFriendsServiceMock.getAllFriends = () => (of(userFriends));
  userFriendsServiceMock.deleteFriend = (idUser, idFriend) => (of(response));
  userFriendsServiceMock.addFriend = (idUser, idFriend) => (of(response));


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFriendsComponent ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        MatSnackBarModule
      ],
      providers: [
        {provide: LocalStorageService, useValue: localStorageServiceMock},
        {provide: UserFriendsService, useValue: userFriendsServiceMock}
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get userId', () => {
    expect(localStorageServiceMock.userIdBehaviourSubject.value).toBe(1111);
  });

  it('should get a user', () => {
    const initUserSpy = spyOn(component as any, 'initUser');
    component.ngOnInit();
    expect(initUserSpy).toHaveBeenCalledTimes(1);
    });

  it('should get a user\'s friends', () => {
    const getUsersFriendsSpy = spyOn(component as any, 'getAllFriends');
    component.ngOnInit();
    expect(getUsersFriendsSpy).toHaveBeenCalledTimes(1);
  });

  it('should change status a friend\'s', () => {
    const changeStatusSpy = spyOn(component as any, 'changeStatus');
    component.changeStatus(1, userFriends.page);
    expect(changeStatusSpy).toHaveBeenCalledWith(1, userFriends.page);
  });

  it('should add status to friend\'s array', () => {
    const addStatusSpy = spyOn(component as any, 'addStatus');
    component.addStatus(userFriends.page);
    expect(addStatusSpy).toHaveBeenCalledWith(userFriends.page);
  });

  it ('should delete friend', () => {
    const changeStatusSpy = spyOn(component as any, 'changeStatus');
    userFriendsServiceMock.deleteFriend(1, 5).subscribe(
      () => {
        component.changeStatus(1, userFriends.page);
        expect(changeStatusSpy).toHaveBeenCalledTimes(1);
        expect(changeStatusSpy).toHaveBeenCalledWith(1, userFriends.page);
      }
    )
  });

  it ('should call method deleteFriend', () => {
    // @ts-ignore
    const deleteFriendSpy = spyOn (component.userFriendsService, 'deleteFriend').and.returnValue(of(true));
    component.handleDeleteFriend(4);
    expect(deleteFriendSpy).toHaveBeenCalled();
  });

  it ('should call method addFriend', () => {
    // @ts-ignore
    const addFriendSpy = spyOn (component.userFriendsService, 'addFriend').and.returnValue(of(true));
    component.handleAddFriend(4);
    expect(addFriendSpy).toHaveBeenCalled();
  });

  it ('should call getFriends on scroll', () => {
    // @ts-ignore
    const getAllFriendSpy = spyOn (component.userFriendsService, 'getAllFriends').and.returnValue(of(userFriends));
    component.onScroll();
    expect(getAllFriendSpy).toHaveBeenCalled();
  });
});
