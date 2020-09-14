import { SocialNetworkModel } from '@user-models/social-network.model';

export class EditProfileModel {
  city: string;
  firstName: string;
  userCredo: string;
  socialNetworks: SocialNetworkModel[];
  profilePicturePath: string;
  rating: number | null;
  showEcoPlace: boolean;
  showLocation: boolean;
  showShoppingList: boolean;
}

export class EditProfileDto {
  city: string;
  firstName: string;
  userCredo: string;
  socialNetworks: string[];
  showEcoPlace: boolean;
  showLocation: boolean;
  showShoppingList: boolean;
}

