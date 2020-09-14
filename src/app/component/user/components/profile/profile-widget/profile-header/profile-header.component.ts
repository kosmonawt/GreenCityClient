import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '@global-user/components/profile/profile-service/profile.service';
import { LocalStorageService } from '@global-service/localstorage/local-storage.service';
import {ProfileModel} from '@user-models/profile.model';
import {SocialNetworkModel} from '@user-models/social-network.model';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit {
  public socialNetworksIcons: string[] = [];
  public mockedUserInfo = {
    profilePicturePath: './assets/img/profileAvatar.png',
    city: '',
    status: 'online',
    rating: 0,
    userCredo: ''
  };
  public editIcon = './assets/img/profile/icons/edit-line.svg';
  public userId: number;
  @Input() public userInfo: ProfileModel;

  constructor(private profileService: ProfileService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.initUser();
    this.setIcons();
  }

  private setIcons(): void {
    this.socialNetworksIcons = this.userInfo
      .socialNetworks
      .map((elem: SocialNetworkModel) => elem.socialNetworkImage.imagePath);
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

