import courses from '../data/courses';
import course2 from '../images/course2.jpg';
import {useState} from 'react';
import './course.css';

function Description({body}) {
  var text;
  if (body != null) {
    text = "Course Description: "+body;
  }
  return (
    <p>{text}</p>
  );
}

function CourseItem({id}) {
  const [descr, setDescr] = useState(null);
  for (let course of courses) {
    if (course.id==id) {
      return (
        <div onMouseEnter={() => setDescr(course.description)}> 
          <img src={course2} alt="Course Image" />
          <p>Course Name: {course.name}</p>
          <p>Course Instructor: {course.instructor}</p>
          <Description body={descr}/>
          <button>Enroll Now</button>
        </div>
      );
    }
  }
}

export default CourseItem;