import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Lesson } from "src/lesson/schema/lessonschema";

export type StudentDocument = HydratedDocument<Student>

@Schema()
export class Student{
@Prop()
fisrtName : string
@Prop()
lastName : string
@Prop()
created_at : Date
@Prop()
lessons : Types.Array<Lesson>
}
export const StudentSchema = SchemaFactory.createForClass(Student)