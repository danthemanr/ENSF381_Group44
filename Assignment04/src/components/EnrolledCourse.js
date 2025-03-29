import courses from '../data/courses';
import course1 from '../images/course1.jpg';
import { useEffect, useState } from 'react';
import './course.css';

function EnrolledCourse({course, creditHours}) {
  const [enrollmentCount, setEnrollmentCount] = useState(Math.floor(10 + Math.random() * (100-10)));
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    console.log("Enrollment Count:", enrollmentCount);
    if (enrollmentCount<=0) {
      setDisplay(false);
    }
  }, [enrollmentCount]);
  if (!display) {
    return <div></div>
  } else {
    return (
      <div>
        <h4>Course Name: {course.name}</h4>
        <p>Credit Hours: {creditHours}</p>
        <button onClick={() => setEnrollmentCount(enrollmentCount-1)}>Drop Course</button>
      </div>
    );
  }
}

export default EnrolledCourse;