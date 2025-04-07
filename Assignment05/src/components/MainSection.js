import { useEffect, useState } from 'react';
import courses from '../data/courses';
import testimonials from '../data/testimonials';

const MainSection = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [randomTestimonials, setRandomTestimonials] = useState([]);

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
      const courses = await response.json();
      if (response.ok) {
        setFeaturedCourses([...courses].sort(() => 0.5 - Math.random()).slice(0, 3));
        if (courses==[]) {
          console.log('response from backend contained no courses')
        }
      } else {
        console.err('response for courses was not ok')
      }
    } catch (err) {
      console.err('failed to load courses from server');
    }
  }, []);
  //load testimonials
  useEffect(async () => {
    const backendEndpoint = 'http:127.0.0.1/5001/testimonials';
    try {
      const response = await fetch(backendEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const testimonials = await response.json();
      if (response.ok) {
        setRandomTestimonials([...testimonials].sort(() => 0.5 - Math.random()).slice(0, 2));
        if (testimonials==[]) {
          console.log('response from backend contained no courses')
        }
      } else {
        console.err('response for courses was not ok')
      }
    } catch (err) {
      console.err('failed to load courses from server');
    }
  }, []);

  return (
    <main>
      <section className="about">
        <h2>About LMS</h2>
        <p>Manage courses and track progress efficiently.</p>
      </section>

      <section className="featured-courses">
        <h3>Featured Courses</h3>
        {featuredCourses.map(course => (
          <div key={course.id}>
            <img src={course.image} alt={course.name} />
            <h4>{course.name}</h4>
          </div>
        ))}
      </section>

      <section className="testimonials">
        <h3>Student Testimonials</h3>
        {randomTestimonials.map((testimonial, idx) => (
          <div key={idx}>
            <p>{testimonial.studentName}</p>
            <p>{'★'.repeat(testimonial.rating)}</p>
            <p>{testimonial.review}</p>
          </div>
        ))}
      </section>
    </main>
  );
};
