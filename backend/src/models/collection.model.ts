import mongoose, { model, Schema } from "mongoose";

export interface ICollectionItem {
  alt: string;
  created_at: string;
  image_url: string;
  id: string;
  download_link: string;
  user_name: string;
  user_profile_link: string;
  _id: mongoose.Types.ObjectId;
}

export interface ICollection {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  collection_name: string;
  collection: ICollectionItem[];
}

const collectionItemSchema = new Schema<ICollectionItem>({
  alt: { type: String, required: true },
  created_at: { type: String, required: true },
  image_url: { type: String, required: true },
  id: { type: String, required: true },
  download_link: { type: String, required: true },
  user_name: { type: String, required: true },
  user_profile_link: { type: String, required: true },
});

const collectionSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  collection_name: { type: String, reqiurd: true },
  collection: { type: [collectionItemSchema], default: [] },
});

const Collection = model<ICollection>("Collection", collectionSchema);

export default Collection;
