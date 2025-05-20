
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './Home';

// This index page will redirect to the home page
const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return <Home />; // Render Home component directly
};

export default Index;
