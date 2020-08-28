import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProfileModel} from '@user-models/profile.model';
import {ProfileService} from '@global-user/components/profile/profile-service/profile.service';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.scss']
})
export class SocialNetworksComponent implements OnInit {
  @Input() public socialNetworks = [];
  @ViewChild('input', {static: true})
  public input: ElementRef;
  public icons = {
    edit: './assets/img/profile/icons/edit.svg',
    add: './assets/img/profile/icons/add.svg',
    delete: './assets/img/profile/icons/delete.svg',
    instagram: './assets/img/profile/icons/ic-instag.svg',
    facebook: './assets/img/profile/icons/ic-faceb.svg'
  };

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.getData();
  }

  private getData(): void {
    this.profileService.getUserInfo()
      .subscribe((data: ProfileModel) => this.socialNetworks = data.socialNetworks);
  }

  public sendData(): void {
    const link = this.input.nativeElement.value;
    if (link.indexOf('facebook.com/') >= 0 || link.indexOf('instagram.com/') >= 0) {
      this.socialNetworks = [...this.socialNetworks, link];
    }
  }

  public getImagePath(socialNetwork: string): string {
      return socialNetwork.includes('instagram.com/') ? this.icons.instagram : this.icons.facebook;
  }
}
