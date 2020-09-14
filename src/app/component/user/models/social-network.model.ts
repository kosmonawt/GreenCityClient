interface SocialNetworkImage {
  hostPath: string;
  id: 0;
  imagePath: string;
}

export interface SocialNetworkModel {
  id: number;
  socialNetworkImage: SocialNetworkImage;
  url: string;
}
