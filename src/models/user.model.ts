import mongoose, { Schema, Document } from 'mongoose';
import { IRecipe } from './recipe.model';
import passportLocalMongoose from 'passport-local-mongoose';

export interface IUser extends Document {
  commentId: string;
  username: string;
  email: string;
  role: string;
  phonenumber: number;
  recipes: IRecipe['id'];
}
const userSchema: Schema = new Schema({
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },

  phoneNumber: {
    type: Number,
  },
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  }],
}, {
  timestamps: true,
});


userSchema.plugin(passportLocalMongoose, {
  maxAttempts: 5,
  hashField: 'password',
  usernameField: 'email',
});

export default mongoose.model<IUser>('User', userSchema);
