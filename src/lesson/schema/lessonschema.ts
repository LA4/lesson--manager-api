import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { LessonInfo } from "./lessonInfo.schema";
import { HydratedDocument } from "mongoose";

export type LessonDocument = HydratedDocument<Lesson>

@Schema()
export class Lesson{

@Prop()
title :string
@Prop()
created_at :Date
@Prop()
update_at :Date

@Prop()
picture_uri : string

@Prop()
lessonInfo : LessonInfo


}
export const LessonSchema = SchemaFactory.createForClass(Lesson)