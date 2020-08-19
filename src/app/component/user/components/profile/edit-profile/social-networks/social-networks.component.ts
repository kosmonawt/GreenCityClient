import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ProfileModel} from '@user-models/profile.model';
import {ProfileService} from '@global-user/components/profile/profile-service/profile.service';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.scss']
})
export class SocialNetworksComponent implements OnInit {
  @Output() public linksChange = new EventEmitter<string[]>();
  @ViewChild('input', {static: true})
  public input: ElementRef;
  public icons = {
    edit: './assets/img/profile/icons/edit.svg',
    add: './assets/img/profile/icons/add.svg',
    delete: './assets/img/profile/icons/delete.svg'
  };
  public socialNetworks = [];

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
    console.log(link);
    if (link.indexOf('facebook.com/') >= 0 || link.indexOf('instagram.com/') >= 0) {
      this.linksChange.emit(this.socialNetworks);
      this.socialNetworks = [...this.socialNetworks, link];
    }
  }
}
