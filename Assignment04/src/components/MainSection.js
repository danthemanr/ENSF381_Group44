import courses from '../data/courses';
import testimonials from '../data/testimonials';
import React, { useEffect, useState } from 'react';
import CourseItem from './CourseItem';
import {createRoot} from 'react-dom/client';
import './MainSection.css';

function RandTestimonial({index}) {
  const t = testimonials[index];
  var stars = '';
  for (let i=0; i<5; i++) {
    if (i<t.rating) {
      stars += '★';
    } else {
      stars += '☆';
    }
  }
  return (
    <div>
      <h4>Course: {t.courseName}</h4>
      <p>{stars}</p>
      <p>"{t.review}"</p>
      <p> - {t.studentName}</p>
    </div>
  );
}

function Courses() {
  var num1 = randint(1,courses.length+1);
  var num2 = randint(1,courses.length+1);
  var num3 = randint(1,courses.length+1);
  while (num2 == num1) {
    num2 = randint(1,courses.length+1);
  }
  while (num3 == num2 || num3 == num1) {
    num3 = randint(1,courses.length+1);
  }
  return (
    <div>
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
  const [indexes, setIndexes] = useState([0,1]);
  useEffect(() => {
    var num1 = randint(0,testimonials.length);
    var num2 = randint(0,testimonials.length);
    while (num2 == num1) {
      num2 = randint(0,testimonials.length);
    }
    setIndexes([num1, num2]);
  }, []);
  return (
    <main>
      <div>
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
        <div>
          <RandTestimonial index={indexes[0]}/>
          <RandTestimonial index={indexes[1]}/>
        </div>
      </div>
    </main>
  );
}

export default MainSection;