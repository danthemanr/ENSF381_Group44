import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CourseItem from './CourseItem';
import EnrollmentList from './EnrollmentList';
import { useAuth } from '../context/AuthContext'; //I have no idea what I'm doing with this
//import courses from '../data/courses';

const CoursesPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [prevEnrollments, setPrevEnrollments] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  //load courses
  useEffect(async () => {
    const backendEndpoint = 'http:127.0.0.1/5001/courses';
    try {
      const response = await fetch(backendEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCourses(data);
        if (data==[]) {
          console.log('response from backend contained no courses')
        }
      } else {
        console.err('response for courses was not ok')
      }
    } catch (err) {
      console.err('failed to load courses from server');
    }
  }, [])

  //load student courses
  useEffect(async () => {
    if (user) {
      const backendEndpoint = `http:127.0.0.1/5001/student_courses/${user.id}`;
      try {
        const response = await fetch(backendEndpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setEnrolledCourses(data);
          setPrevEnrollments(enrolledCourses);
          if (data==[]) {
            console.log('response from backend contained no student courses')
          }
        } else {
          console.err('response for courses was not ok')
        }
      } catch (err) {
        console.err('failed to load courses from server');
      }
    } else {
      console.log("user is not logged in");
    }
  }, []);
  
  //enroll of drop courses
  useEffect(async () => {
    if (user) {
      if (enrolledCourses.length-prevEnrollments.length==1 || prevEnrollments.length-enrolledCourses.length==1) {
        const add = enrolledCourses.length > prevEnrollments.length
        const backendEndpoint = add ? `http:127.0.0.1/5001/enroll/${user.id}` : `http:127.0.0.1/5001/drop/${user.id}`;
        const course = add ? enrolledCourses[enrolledCourses.length-1] : prevEnrollments.find((e) => !enrolledCourses.includes(e));
        try {
          const response = await fetch(backendEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...course }),
          });
          const data = await response.json();
          if (data.success) {
            console.log(data.info)
          } else {
            console.err(data.info);
          }
        } catch (err) {
          console.err('Failed to connect to the server. Please try again later.');
        }
      } else {
        console.log("enrolledCourses changed by more than one course")
      }
    } else {
      console.log("user is not logged in");
    }
    setPrevEnrollments(enrolledCourses);
  }, [enrolledCourses]);

  const handleEnroll = async (course) => {
    setEnrolledCourses(prev => [...prev, { 
      ...course,
      enrollmentId: Date.now() // Unique ID for each enrollment
    }]);
  };

  const handleRemove = (enrollmentId) => {
    setEnrolledCourses(prev => 
      prev.filter(course => course.enrollmentId !== enrollmentId)
    );
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Header />
      
      <div style={{ 
        flex: 1,
        display: 'flex',
        padding: '20px',
        gap: '30px'
      }}>
        <div style={{ flex: 3 }}>
          <h2 style={{ color: '#004080' }}>Available Courses</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {courses.map(course => (
              <CourseItem 
                key={course.id} 
                course={course} 
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        </div>
        
        <EnrollmentList 
          enrolledCourses={enrolledCourses}
          onRemove={handleRemove}
        />
      </div>

      <Footer />
    </div>
  );
};

export default CoursesPage;
