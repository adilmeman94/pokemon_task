import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types';

const PublicRoute = ({ children }) => {
  const { token } = useAuth();

  if (token) {
    return (
      <Navigate
        to='/'
        replace
      />
    );
  }

  return children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
