export interface ICollection {
  _id: string;
  userId: string;
  collection_name: string;
  collection: ICollectionItem[] | [];
}

export interface ICollectionItem {
  _id: string;
  alt: string;
  created_at: string;
  image_url: string;
  id: string;
  download_link: string;
  user_name: string;
  user_profile_link: string;
}
