import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonInfo, LessonInfoSchema } from './schema/lessonInfo.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:LessonInfo.name, schema: LessonInfoSchema
  }])],
  providers: [LessonService],
  controllers: [LessonController]
})
export class LessonModule {}
