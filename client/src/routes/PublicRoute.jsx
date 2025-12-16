import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types';

const PublicRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  if (token) {
    return (
      <Navigate
        to={from}
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
