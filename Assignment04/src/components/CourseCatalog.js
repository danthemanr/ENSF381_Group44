import courses from '../data/courses';
import CourseItem from './CourseItem';
import {useEffect} from 'react';

function CourseCatalog() {
  return (
    <div>
      <h3>Course Catalogue</h3>
      <div className="flexbox">{courses.map((c) => <CourseItem id={c.id} />)}</div>
    </div>
  );
}

export default CourseCatalog;