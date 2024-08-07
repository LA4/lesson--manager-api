import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { ConfigModule } from '@nestjs/config';
import * as mongoose from 'mongoose';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DATABASE),
        MongooseModule.forFeature([{name:User.name,schema:UserSchema}])
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    
  });

 afterAll( async()=>{    
  try {
  const UserModel = mongoose.model(User.name, UserSchema);
  await UserModel.deleteMany({});
} catch (error) {
  console.error('Error deleting documents:', error);
}
  await mongoose.disconnect()
})
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create user', async () => {
    const newUser = {
      email : 'test@test.com',
      password: "test",
      firstName : "ludo",
      lastName : " andreotti"
    }
    const createdUser = await service.createUser(newUser)
    expect(createdUser).toBeDefined();
    expect(createdUser.firstName).toBe(newUser.firstName);
    expect(createdUser.lastName).toBe(newUser.lastName);
 
  });

});
