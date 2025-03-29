import courses from '../data/courses';
import CourseItem from './CourseItem';
import {useEffect} from 'react';

function CourseCatalog() {
  return (
    <div>
      <div>{courses.map((c) => <CourseItem id={c.id} />)}</div>
    </div>
  );
}

export default CourseCatalog;