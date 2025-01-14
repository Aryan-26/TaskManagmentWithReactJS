import React from 'react';

function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-10 mt-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">Company Name</h3>
            <p className="text-sm mt-2">Your Company Description Here. Focused on quality, customer satisfaction, and innovation.</p>
          </div>

       
          <div className="mb-4 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Useful Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-blue-300">About Us</a></li>
              <li><a href="/contact" className="hover:text-blue-300">Contact</a></li>
              <li><a href="/terms" className="hover:text-blue-300">Terms & Conditions</a></li>
              <li><a href="/privacy" className="hover:text-blue-300">Privacy Policy</a></li>
            </ul>
          </div>

        
          <div>
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-blue-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" className="hover:text-blue-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" className="hover:text-blue-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://instagram.com" className="hover:text-blue-300">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        
        <div className="mt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
