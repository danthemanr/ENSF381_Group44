import courses from '../data/courses';
import EnrolledCourse from './EnrolledCourse';

function EnrollmentList() {
  var total = 0;
  var hourCredits = [];
  for (let course of courses) {
    var temp = Math.floor(1 + Math.random() * (200-1));
    total = total + temp;
    hourCredits.push(temp);
  }
  var i = 0
  return (
    <div>
      <p>Total Credit Hours: {total}</p>
      <div>{courses.map((c) => <EnrolledCourse course={c} creditHours={hourCredits[i++]} />)}</div>
    </div>
  );
}
export default EnrollmentList;