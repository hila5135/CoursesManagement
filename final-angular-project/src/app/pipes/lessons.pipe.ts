import { Pipe, PipeTransform } from '@angular/core';
import { Lessons } from '../models/Lessons';

@Pipe({
  name: 'lessons',
  standalone: true
})
export class LessonsPipe implements PipeTransform {

  transform(lessons: Lessons[], courseId: number): number {
    if (!lessons || !courseId) return 0;
    return lessons.filter(lesson => lesson.courseId === courseId).length;
  }
}
