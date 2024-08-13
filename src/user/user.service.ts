import {
  Injectable,
  NotFoundException,
  NotImplementedException,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { createUserDto, updateUserDto } from './DTO/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  // create User
  async createUser(newUser: createUserDto) {
    const user = await this.UserModel.find({ email: newUser.email });

    if (!user || user.length > 0) {
      throw new NotFoundException('this User aleardy exist ');
    }
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

    if (!user || user.length === 0) {
      throw new NotFoundException("this user doe's not  exist");
    }
    let { password, ...userProtected } = user[0];
    return userProtected;
  }

  // Update User
  async updateUser(userId: string, updateUser: updateUserDto) {
    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new NotFoundException("Don't find user");
    }
    const updatedUser = await this.UserModel.findByIdAndUpdate(
      userId,
      updateUser,
      { new: true },
    );
    return updatedUser;
  }

  // Delete user
  async deleteUser(userId: string) {
    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new NotFoundException("Don't find user");
    }
    return this.UserModel.findByIdAndDelete(userId);
  }
  // append student to user
  async appendUserStudent(userId: string, studentId: string) {
    return await this.UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { studentList: studentId } },
      { new: true },
    );
  }
  // get User Student
  async getUserStudent(userId: string) {
    const userStudent = await this.UserModel.findById(userId);
    return userStudent;
  }
}
