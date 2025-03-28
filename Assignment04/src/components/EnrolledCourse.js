import courses from '../data/courses';
import course1 from '../images/course1.jpg';
import './course.css';

function decrementEnrollment() {} //TODO

function EnrolledCourse({id}) {
  for (let course of courses) {
    if (course.id==id) {
      return (
        <div className="course">
          <h4>Course Name: {course.name}</h4>
          <p>Credit Hours: {/*TODO*/}</p>
          <button className="drop" onClick={decrementEnrollment()}>Drop Course</button>
        </div>
      );
    }
  }
}

export default EnrolledCourse;