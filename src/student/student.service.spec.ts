import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schema/student.schema';
import mongoose from 'mongoose';
import { User, UserSchema } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DATABASE),
        MongooseModule.forFeature([
          { name: Student.name, schema: StudentSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      providers: [StudentService, UserService],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should verify if student exist', async () => {
    const student = {
      fisrtName: 'lud3ovic',
      lastName: 'andreotti',
    };
    const verifyStudent = await service.verifyStudent(
      student.fisrtName,
      student.lastName,
    );
    expect(verifyStudent).toBeTruthy();
    expect(service).toBeDefined();
  });
  it('should create a student', async () => {
    const userId = '66ba0f106fb7fcbd5a7279c2';
    const newStudent = {
      firstName: 'ludo3vic',
      lastName: 'andr3eotti',
      created_at: new Date(),
    };
    const student = await service.createStudent(newStudent, userId);
    console.log(student);
    expect(student.firstName).toBe(newStudent.firstName);
    expect(service).toBeDefined();
  });
});
