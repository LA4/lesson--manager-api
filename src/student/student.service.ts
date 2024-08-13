import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './schema/student.schema';
import { Model } from 'mongoose';
import { createStudentDto } from './DTO/createStudent.dto';
import { User, UserDocument } from '../user/schema/user.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly StudentModel: Model<StudentDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  // create a student
  async createStudent(newStudent: createStudentDto, userId: string) {
    const Student = new this.StudentModel(newStudent);
    const studentSaved = await Student.save();
    const updateUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { studentList: studentSaved } },
      { new: true },
    );
    return studentSaved;
  }
  // get a student
  async getStudent(studentId: string) {
    return this.StudentModel.findById(studentId);
  }
  // update a student
  async updateStudent(updateStudent: createStudentDto) {
    const updatedStudent = await this.StudentModel.findByIdAndUpdate(
      { lastName: updateStudent.lastName },
      updateStudent,
      { new: true },
    );
    return updatedStudent;
  }
}
