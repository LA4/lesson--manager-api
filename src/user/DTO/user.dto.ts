import { Student } from '../../student/schema/student.schema';

export class createUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  studentList?: Student;
}
export class updateUserDto {
  firstName: string;
  lastName: string;
}
