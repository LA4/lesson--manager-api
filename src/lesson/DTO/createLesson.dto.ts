import { LessonInfo } from "../schema/lessonInfo.schema"

export class createLessonDto{
    
title :string
created_at :Date
update_at :Date
picture_uri : string
lessonInfo : LessonInfo

}