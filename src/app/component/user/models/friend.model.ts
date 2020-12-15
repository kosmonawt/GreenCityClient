export interface FriendModel {
  id: number;
  name: string;
  profilePicture?: string;
  added?: boolean;
}

export interface FriendRecommendedModel {
  totalElements: number;
  totalPages: number;
  currentPage: number;
  page: FriendModel[];
}
