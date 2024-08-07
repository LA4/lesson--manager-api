import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { createUserDto } from './DTO/createUser.dto';

@Injectable()
export class UserService {
    
    constructor(
        @InjectModel(User.name) private UserModel : Model<UserDocument>
    ){}

// create User
async createUser(newUser : createUserDto){

    this.verifyUser(newUser.email)
    const createUser = new this.UserModel(newUser)
    return createUser.save() 
}
// Get User
async GetUser (userId : string) {
    await this.verifyUser(userId)
    let {password, ...userProtected} = await this.UserModel.findById(userId) 
    return userProtected

}
// Update User
async updateUser( userId :string, tokken : string ){

}
// Delete user


private async verifyUser (email? :string, userId?: string){
  if(userId){
      const user = await this.UserModel.findById(userId).exec()
      if(!user){
          throw new Error("this user doe's not  exist")
      }
      return
  }
    
    const user = await this.UserModel.find({email: email}).exec()
    if(user.length < 0){
        throw new Error("this user already exist")
    }
}
}
