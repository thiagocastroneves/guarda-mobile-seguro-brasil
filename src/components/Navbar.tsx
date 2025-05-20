
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShieldCheck, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <ShieldCheck className="h-8 w-8 text-brand-blue" />
              <span className="ml-2 text-xl font-bold text-gray-900">GuardaMobile</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium">
              Perfil
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium">
              Login
            </Link>
            <Button variant="outline" className="ml-2">
              <User className="mr-2 h-4 w-4" /> Registro
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-brand-blue focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50"
            >
              Home
            </Link>
            <Link 
              to="/profile" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50"
            >
              Perfil
            </Link>
            <Link 
              to="/login" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50"
            >
              Registro
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
