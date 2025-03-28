import CourseItem from './CourseItem';
import courses from '../data/courses';
import testimonials from '../data/testimonials';
import './MainSection.css';

function RandTestimonial({}) {
  const t = testimonials[randint(0,testimonials.length)];
  var stars = '';
  for (let i=0; i<5; i++) {
    if (i<t.rating) {
      stars += '★';
    } else {
      stars += '☆';
    }
  }
  return (
    <div className="testimonial">
      <h4>Course: {t.courseName}</h4>
      <p className='stars'>{stars}</p>
      <p>"{t.review}"</p>
      <p className="testifier"> - {t.studentName}</p>
    </div>
  );
}

function Courses() {
  var num1 = randint(1,courses.length+1);
  var num2 = randint(1,courses.length+1);
  var num3 = randint(1,courses.length+1);
  while (num2 == num1) {
    num2 = randint(1,courses.length);
  }
  while (num3 == num2 || num3 == num1) {
    num3 = randint(1,courses.length);
  }
  return (
    <div className="flexbox">
      <CourseItem id={num1}/>
      <CourseItem id={num2}/>
      <CourseItem id={num3}/>
    </div>
  );
}

function randint(low, high) {
  return Math.floor(low + Math.random() * (high-low));
}

function MainSection() {
  return (
    <main className="MainSection">
      <div id="about">
        <h2>About LMS</h2>
        <span>
          The Learning Management System (LMS) helps students and instructors manage 
          courses, quizzes, and track performance efficiently.
        </span>
        <h4>Key Featrues:</h4>
        <span>
          -Enroll in courses<br /><br />
          -Attempt quizes<br /><br />
          -View leaderboards
        </span>
      </div>
      <div>
        <h2>Featured Courses</h2>
        <Courses />
      </div>
      <div>
        <h2>Testimonials</h2>
        <div className="flexbox">
          <RandTestimonial />
          <RandTestimonial />
        </div>
      </div>
    </main>
  );
}

export default MainSection;