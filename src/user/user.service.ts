import { Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
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
  async getUser(email: string) {
    let user = await this.UserModel.find({
      email: email,
    })
      .lean()
      .exec();
    console.log(user);
    let { password, ...userProtected } = user[0];
    return userProtected;
  }

  // Update User
  async updateUser(userId: string, updateUser: updateUserDto) {
    await this.verifyUser(userId);
    const updatedUser = await this.UserModel.findByIdAndUpdate(
      userId,
      updateUser,
      { new: true },
    );
    return updatedUser;
  }

  // Delete user
  async deleteUser(userId: string) {
    this.verifyUser(userId);
    return this.UserModel.findByIdAndDelete(userId);
  }
  // append student to user
  async appendUserStudent(userId: string, studentId: string) {
    await this.verifyUser(userId);
    return await this.UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { studentList: studentId } },
      { new: true },
    );
  }
  // get User Student
  async getUserStudent(userId: string) {
    await this.verifyUser(userId);
    const userStudent = await this.UserModel.findById(userId);
    return userStudent;
  }

  private async verifyUser(email?: string, userId?: string) {
    if (userId) {
      const user = await this.UserModel.findById(userId).exec();
      if (!user) {
        throw new NotFoundException("this user doe's not  exist");
      }
      return;
    }

    const user = await this.UserModel.find({ email: email }).exec();
    if (user.length < 0) {
      throw new NotFoundException('this user already exist');
    }
  }
}
