import { Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-serif font-bold text-xl mb-4">Binmaley Catholic School Inc.</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Excellence in Catholic Education. Nurturing minds, hearts, and souls since our founding.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-accent transition-colors">
                  Academic Programs
                </Link>
              </li>
              <li>
                <Link to="/enrollment" className="hover:text-accent transition-colors">
                  Enrollment
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-bold text-xl mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Barangay Poblacion, Binmaley, Pangasinan, Philippines</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>(075) 540-0145</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>binmaleycs@yahoo.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Facebook className="h-5 w-5 flex-shrink-0" />
                <a href="#" className="hover:text-accent transition-colors">
                  Facebook Page
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm opacity-90">
          <p>&copy; {currentYear} Binmaley Catholic School, Inc. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Grade 12 STEM Counsel Research Group 2 – Research Website  |
           Developed by Mark Emman Lopez
          </p>
          <Link 
            to="/login" 
            className="inline-block mt-3 text-xs opacity-60 hover:opacity-100 transition-opacity"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
