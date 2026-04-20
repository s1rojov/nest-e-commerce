import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CallbackWithoutResultAndOptionalError } from 'mongoose';

// 1. Interfeysni aniqlaymiz
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

// 2. 'this' tipini IUser deb ko'rsatamiz
UserSchema.pre<IUser>(
  'save',
  async function (next: CallbackWithoutResultAndOptionalError) {
    try {
      // Agar parol o'zgarmagan bo'lsa, keyingi bosqichga o'tamiz
      if (!this.isModified('password')) {
        next();
        return;
      }

      // Parol borligini tekshiramiz (TS2345 xatosini yo'qotish uchun)
      if (this.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPasword = await bcrypt.hash(this.password, salt);
        this.password = hashedPasword;
      }

      next();
    } catch (error) {
      next(error);
    }
  },
);
