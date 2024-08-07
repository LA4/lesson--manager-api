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
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DATABASE),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create user', async () => {
    const newUser = {
      email: 'tes2@test.com',
      password: 'tes3t',
      firstName: 'ludo',
      lastName: 'andreotti',
    };
    const createdUser = await service.createUser(newUser);
    expect(createdUser).toBeDefined();
    expect(createdUser.firstName).toBe(newUser.firstName);
    expect(createdUser.lastName).toBe(newUser.lastName);
  });
  it('should get user', async () => {
    const userId = '66b33546107cc3cbdf683d69';
    const getUser = await service.getUser(userId);
    expect(getUser).toBeDefined();
    expect(getUser.firstName).toBe('ludo');
    expect(getUser.lastName).toBe('andreotti');
  });
  it('should update user', async () => {
    const userId = '66b33546107cc3cbdf683d69';
    const newUser = {
      firstName: 'ludoUpdated',
      lastName: 'andreottiUpdated',
    };
    const updateUser = await service.updateUser(userId, newUser);
    expect(updateUser).toBeDefined();
    expect(updateUser.firstName).toBe('ludoUpdated');
    expect(updateUser.lastName).toBe('andreottiUpdated');
  });
  it('should delete user', async () => {
    const userId = '66b335093aac8b7e8e5820c6';

    const deleteUser = await service.deleteUser(userId);
    expect(deleteUser).toBeDefined();
    expect(deleteUser.firstName).toBe('andreottiUpdated');
  });
});
