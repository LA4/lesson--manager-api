import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import mongoose from 'mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DATABASE),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should post user', async () => {
    const newUser = {
      email: 'testController@test.com',
      firstName: 'testController',
      lastName: 'testController',
      password: 'testController',
    };
    const createUserController = await controller.createUser(newUser);
    expect(createUserController.email).toBe(newUser.email);
    expect(controller).toBeDefined();
  });

  it('should get user', async () => {
    const userId = '66b372fb3420c502620cc801';
    const getUserController = await controller.getUser(userId);
    expect(controller).toBeDefined();
    expect(getUserController.email).toBe('testController@test.com');
  });
  it('should update user', async () => {
    const userId = '66b372fb3420c502620cc801';
    const newUser = {
      firstName: 'test2Controller',
    };
    const updateUserControler = await controller.uptadeUser(userId, newUser);
    expect(controller).toBeDefined();
    expect(updateUserControler.email).toBe('testController@test.com');
  });
});
