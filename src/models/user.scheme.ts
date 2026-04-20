import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
export interface IUser extends mongoose.Document {
  username?: string;
  password?: string;
  region?: string;
  district?: string;
}

export const UserSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String },
    password: { type: String },
    region: { type: String },
    district: { type: String },
  },
  { timestamps: true },
);
UserSchema.pre<IUser>('save', async function () {
  try {
    if (!this.isModified('password')) {
      return;
    }
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPasword = await bcrypt.hash(this.password, salt);
      this.password = hashedPasword;
    }
  } catch (error) {
    // next(error);
    console.log(error);
  }
});
