import { Lesson } from 'src/lesson/schema/lessonschema';

export class createStudentDto {
  firstName: string;
  lastName: string;
  created_at: Date;
  lessons?: Lesson;
}
