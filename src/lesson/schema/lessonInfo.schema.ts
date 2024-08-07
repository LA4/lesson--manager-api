import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LessonInfoDodument = HydratedDocument<LessonInfo>

@Schema()
export class LessonInfo {
@Prop()
description: string
@Prop()
update_at: Date
}
export const LessonInfoSchema = SchemaFactory.createForClass(LessonInfo)