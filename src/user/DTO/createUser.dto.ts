import { Student } from "../schema/student.schema"

export class createUserDto{
    firstName : string
    lastName : string
    email : string
    password :string
    studentList? : Student
}