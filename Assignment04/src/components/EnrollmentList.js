import courses from '../data/courses';
import EnrolledCourse from './EnrolledCourse';
import {useEffect} from 'react'; //TODO

function EnrollmentList() {
  //TODO: maybe only display enrolled courses
  return (
    <div>
      <h3>Enrolled Courses</h3>
      <p>Total Credit Hours: {/*TODO*/}</p>
      <div className="flexbox">{courses.map((c) => <EnrolledCourse id={c.id} />)}</div>
    </div>
  );
}
export default EnrollmentList;