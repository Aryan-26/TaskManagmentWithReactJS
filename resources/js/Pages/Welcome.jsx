import React from 'react';
import { Link } from '@inertiajs/react';
import 'aos/dist/aos.css'; 
import AOS from 'aos';


const WelcomePage = () => {
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  
  const handleGetStartedClick = () => {
    if (user) {
        
        window.location.href = `/${user.role}/dashboard`; 
    }
};
return (
  <div className="font-sans antialiased text-gray-800">
    
      <nav className="fixed w-full bg-white shadow-lg z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">TMS</div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-blue-600">Features</a>
            <a href="#benefits" className="hover:text-blue-600">Benefits</a>
            <a href="#testimonials" className="hover:text-blue-600">Testimonials</a>
          </div>
          <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Get Started</Link>
        </div>
      </nav>
    
    

     
      <section className="pt-24 pb-12 bg-gradient-to-r from-blue-600 to-blue-800 text-center text-white">
        <div className="container mx-auto px-4" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Streamline Your Task Management</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Boost productivity with our intuitive task management solution</p>
          <Link href="/register" className="inline-block bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition duration-300">Start Free Trial</Link>
        </div>
      </section>


      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300" data-aos="fade-up">
              <i className="fas fa-tasks text-2xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Task Management</h3>
              <p className="text-gray-600">Create, assign, and track tasks efficiently</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300" data-aos="fade-up">
              <i className="fas fa-chart-line text-2xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">Monitor project progress with real-time updates and analytics</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300" data-aos="fade-up">
              <i className="fas fa-calendar-alt text-2xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Deadline Management</h3>
              <p className="text-gray-600">Set and track deadlines with automated reminders</p>
            </div>
          </div>
        </div>
      </section>

   
      <section id="testimonials" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
            {[
              { name: 'John Smith', role: 'Project Manager at TechCorp', img: 'https://randomuser.me/api/portraits/men/32.jpg', text: 'This platform has transformed how our team collaborates. Task management has never been this efficient!' },
              { name: 'Sarah Johnson', role: 'Team Lead at InnovateCo', img: 'https://randomuser.me/api/portraits/women/44.jpg', text: 'The intuitive interface and powerful features have made project tracking a breeze. Highly recommended!' },
              { name: 'Michael Chen', role: 'Product Owner at StartupX', img: 'https://randomuser.me/api/portraits/men/67.jpg', text: 'The reporting features and analytics have given us invaluable insights into our team\'s performance.' },
              { name: 'Emily Davis', role: 'Operations Manager at GlobalTech', img: 'https://randomuser.me/api/portraits/women/28.jpg', text: 'We\'ve seen a 40% increase in productivity since implementing this task management system.' },
              { name: 'David Wilson', role: 'Scrum Master at AgileFlow', img: 'https://randomuser.me/api/portraits/men/92.jpg', text: 'The collaboration features have made remote work feel seamless and efficient.' },
              { name: 'Lisa Thompson', role: 'CEO at SmartSolutions', img: 'https://randomuser.me/api/portraits/women/56.jpg', text: 'This system has become an essential part of our daily operations. It\'s simply outstanding!' }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300" data-aos="fade-up">
                <div className="flex items-center mb-4">
                  <img src={testimonial.img} alt={testimonial.name} className="w-12 h-12 rounded-full mr-3 object-cover" />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center text-white" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="mb-8 max-w-2xl mx-auto">Join thousands of teams already using our platform</p>
          <Link href="/register" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300">Start Free Trial</Link>
        </div>
      </section>

    
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">TMS</h3>
              <p className="text-gray-400">Simplifying task management for teams worldwide</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Task Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* <Footer /> */}
    </div>
  );
};

export default WelcomePage;
