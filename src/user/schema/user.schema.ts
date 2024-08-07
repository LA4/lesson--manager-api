import { Type } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Student } from "./student.schema";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User{
    @Prop()
    firstName : string 
    @Prop()
    lastName : string 
    @Prop({unique: true})
    email: string
    @Prop()
    tokken: string
    @Prop()
    password: string
    @Prop()
    studentList : Types.Array<Student>
}
export const UserSchema = SchemaFactory.createForClass(User)