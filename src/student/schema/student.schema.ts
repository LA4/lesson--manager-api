import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Lesson } from 'src/lesson/schema/lessonschema';
import { User } from '../../user/schema/user.schema';
export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop({ type: Date })
  created_at: Date;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }] })
  lessons: [Lesson];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}
export const StudentSchema = SchemaFactory.createForClass(Student);
