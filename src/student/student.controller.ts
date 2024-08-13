import { Controller, Post } from '@nestjs/common';
import { createLessonDto } from 'src/lesson/DTO/createLesson.dto';
import { createStudentDto } from './DTO/createStudent.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent(newStudent: createStudentDto, userId: string) {
    return await this.studentService.createStudent(newStudent, userId);
  }
}
