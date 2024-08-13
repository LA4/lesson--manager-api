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
    const existingStudent = await this.verifyStudent(
      newStudent.firstName,
      newStudent.lastName,
    );
    console.log('exiwtig student ?', existingStudent);
    if (existingStudent) {
      const Student = new this.StudentModel(newStudent);
      const studentSaved = await Student.save();
      const updateUser = await this.userModel.findByIdAndUpdate(
        userId,
        { $push: { studentList: studentSaved } },
        { new: true },
      );
      return studentSaved;
    }
  }
  // get a student
  async getStudent(studentId: string) {
    return this.StudentModel.findById(studentId);
  }
  // update a student
  async updateStudent(updateStudent: createStudentDto) {
    const existingStudent = await this.verifyStudent(
      updateStudent.firstName,
      updateStudent.lastName,
    );
    if (!existingStudent) {
      throw new NotFoundException('Student not found');
    }
    const updatedStudent = await this.StudentModel.findByIdAndUpdate(
      { lastName: updateStudent.lastName },
      updateStudent,
      { new: true },
    );
    return updatedStudent;
  }

  async verifyStudent(firstName: string, lastName: string) {
    const student = await this.StudentModel.find({
      firstName,
      lastName,
    }).exec();

    if (student.length < 0) {
      throw new NotFoundException('Student already exist');
    }
    return true;
  }
}
