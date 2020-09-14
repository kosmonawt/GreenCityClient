import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ProfileModel } from '@user-models/profile.model';
import { ProfileService } from '@global-user/components/profile/profile-service/profile.service';
import { SocialNetworkModel } from '@user-models/social-network.model';
import {EditProfileModel} from '@user-models/edit-profile.model';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.scss']
})
export class SocialNetworksComponent implements OnInit {
  @Input() public socialNetworks: SocialNetworkModel[] = [];
  @ViewChild('input', {static: true})
  public input: ElementRef;
  public icons = {
    edit: './assets/img/profile/icons/edit.svg',
    add: './assets/img/profile/icons/add.svg',
    delete: './assets/img/profile/icons/delete.svg',
    default: './assets/img/profile/icons/default_social.png'
  };

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.getData();
  }

  public sendData(): void {
    const link = this.input.nativeElement.value;
    const tempNetwork: SocialNetworkModel = {
      id: 0,
      socialNetworkImage: {
        hostPath: '',
        id: 0,
        imagePath: this.icons.default
      },
      url: link
    };
    this.socialNetworks = [...this.socialNetworks, tempNetwork];
  }

  public removeSocialNetwork(id: number): void {
    this.socialNetworks = this.socialNetworks.filter((elem: SocialNetworkModel) => elem.id !== id);
  }

  private getData(): void {
    this.profileService.getUserInfo()
      .subscribe((data: EditProfileModel) => this.socialNetworks = data.socialNetworks);
  }
}
