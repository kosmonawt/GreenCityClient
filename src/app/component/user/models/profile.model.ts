import { SocialNetworkModel } from '@user-models/social-network.model';

export interface ProfileModel {
  profilePicturePath: string;
  firstName: string;
  city: string;
  userCredo: string;
  socialNetworks: SocialNetworkModel[];
  showLocation: boolean;
  showEcoPlace: boolean;
  showShoppingList: boolean;
  rating: number;
}
