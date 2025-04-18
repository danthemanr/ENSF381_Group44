import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CourseItem from './CourseItem';
import EnrollmentList from './EnrollmentList';
import { useAuth } from '../context/AuthContext';


const CoursesPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [prevEnrollments, setPrevEnrollments] = useState(() => []);
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem('enrollments');
    return (saved && saved !== "undefined") ? JSON.parse(saved) : [];
  });

  const loadCourses = async () => {
    const backendEndpoint = 'http://127.0.0.1:5001/courses';
    try {
      const response = await fetch(backendEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok && Array.isArray(data) && data.length > 0) {
        setCourses(data);
      } else if (Array.isArray(data) && data.length === 0) {
        console.log('response from backend contained no courses')
      } else {
        console.log('response for courses was not ok')
      }
    } catch (err) {
      console.log('failed to load courses from server');
    }
  }
  useEffect(() => {loadCourses();}, []);

  const loadStudentCourses = async () => {
    if (user) {
      const backendEndpoint = `http://127.0.0.1:5001/student_courses/${user.id}`;
      try {
        const response = await fetch(backendEndpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok && Array.isArray(data) && data.length > 0) {
          var i = 0;
          setEnrolledCourses(data.map(item => ({ ...item, enrollmentId: Date.now()+(i++)})));
          setPrevEnrollments(enrolledCourses);
        } else if (Array.isArray(data) && data.length === 0) {
          console.log('response from backend contained no student courses')
        } else {
          console.log('response for student courses was not ok')
        }
      } catch (err) {
        console.log('failed to load student courses from server');
      }
    } else {
      console.log("user is not logged in");
    }
  }
  useEffect(() => {loadStudentCourses();}, [user]);
  
  //enroll of drop courses
  const changeCourses = async () => {
    if (user) {
      if (enrolledCourses.length-prevEnrollments.length==1 || prevEnrollments.length-enrolledCourses.length==1) {
        const add = enrolledCourses.length > prevEnrollments.length
        const backendEndpoint = add ? `http://127.0.0.1:5001/enroll/${user.id}` : `http://127.0.0.1:5001/drop/${user.id}`;
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
          if (response.ok && data.success) {
            console.log(data.info)
          } else {
            console.log(data.info);
          }
        } catch (err) {
          console.log('Failed to connect to the server.', err);
        }
      } else {
        console.log("enrolledCourses changed by more than one course");
      }
    } else {
      console.log("user is not logged in");
    }
    setPrevEnrollments(enrolledCourses);
  }
  useEffect(() => {
    localStorage.setItem('enrollments', JSON.stringify(enrolledCourses));
    changeCourses();
  }, [enrolledCourses]);

  const handleEnroll = (course) => {
    setEnrolledCourses(prev => [...prev, { 
      ...course,
      enrollmentId: Date.now() // Unique ID for each enrollment
    }]);
  };

  const handleRemove = (enrollmentId) => {
    setEnrolledCourses(prev => {
      return prev.filter(course => course.enrollmentId !== enrollmentId);
    });
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
