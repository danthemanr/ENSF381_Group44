import courses from '../data/courses';
import course2 from '../images/course2.jpg';
import './course.css';

function CourseItem({id}) {
  for (let course of courses) {
    if (course.id==id) {
      return (
        <div className="course">
          <img src={course2} alt="Course Image" />
          <p>Course Name: {course.name}</p>
          <p>Course Instructor: {course.instructor}</p>
          <button className="enroll">Enroll Now</button>
        </div>
      );
    }
  }
}

export default CourseItem;