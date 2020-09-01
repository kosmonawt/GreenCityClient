import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '@global-user/components/profile/profile-service/profile.service';
import { LocalStorageService } from '@global-service/localstorage/local-storage.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit {
  public socialNetworksIcons = [];
  public mockedUserInfo = {
    profilePicturePath: './assets/img/profileAvatar.png',
    city: '',
    status: 'online',
    rating: 0,
    userCredo: ''
  };
  public editIcon = './assets/img/profile/icons/edit-line.svg';
  public userId: number;
  @Input() public userInfo;
  public isUserOnline;
  private instagramIcon = './assets/img/profile/icons/ic-instag.svg';
  private facebookIcon = './assets/img/profile/icons/ic-faceb.svg';
  private facebook = 'facebook.com';
  private instagram = 'instagram.com';

  constructor(private profileService: ProfileService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.initUser();
  }

  public showUserInfo(): void {
    this.profileService.getUserInfo().subscribe(item => {
      this.userInfo = item;
      this.setIcons();
    });
  }

  private setIcons(): void {
    this.userInfo.socialNetworks.map((elem: string) => {
      if (elem.includes(this.facebook)) {
        this.socialNetworksIcons = [...this.socialNetworksIcons, this.facebookIcon];
      } else if (elem.includes(this.instagram)) {
        this.socialNetworksIcons = [...this.socialNetworksIcons, this.instagramIcon];
      }
    });
  }

  public showCorrectImage(): string {
    return this.userInfo.profilePicturePath ?
      this.userInfo.profilePicturePath : this.mockedUserInfo.profilePicturePath;
  }

  private initUser(): void {
    this.localStorageService.userIdBehaviourSubject
      .subscribe(userId => this.assignData(userId));
  }

  private assignData(userId: number): void {
    this.userId = userId;
  }
}

