import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { createUserDto, updateUserDto } from './DTO/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  // create User
  async createUser(newUser: createUserDto) {
    this.verifyUser(newUser.email);
    const createUser = new this.UserModel(newUser);
    return createUser.save();
  }
  // Get User
  async getUser(userId: string) {
    await this.verifyUser(userId);
    let { password, ...userProtected } = await this.UserModel.findById(userId)
      .lean()
      .exec();
    return userProtected;
  }
  // Update User
  async updateUser(userId: string, updateUser: updateUserDto) {
    await this.verifyUser(userId);
    const updatedUser = await this.UserModel.findByIdAndUpdate(
      userId,
      updateUser,
    );
    return updatedUser;
  }
  // Delete user
  async deleteUser(userId: string) {
    this.verifyUser(userId);
    return this.UserModel.findByIdAndDelete(userId);
  }

  private async verifyUser(email?: string, userId?: string) {
    if (userId) {
      const user = await this.UserModel.findById(userId).exec();
      if (!user) {
        throw new Error("this user doe's not  exist");
      }
      return;
    }

    const user = await this.UserModel.find({ email: email }).exec();
    if (user.length < 0) {
      throw new Error('this user already exist');
    }
  }
}
