
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              GuardaMobile
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Segurança para seu dispositivo móvel
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-8">
            <div>
              <h3 className="font-medium text-sm text-gray-900">Links</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link to="/" className="text-sm text-gray-600 hover:text-brand-blue">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="text-sm text-gray-600 hover:text-brand-blue">
                    Perfil
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-sm text-gray-900">Legal</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link to="/terms" className="text-sm text-gray-600 hover:text-brand-blue">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm text-gray-600 hover:text-brand-blue">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-100 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} GuardaMobile. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
