import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/dashboard" className="navbar-brand">
          Equipment Lending Portal
        </Link>
        
        {user && (
          <ul className="navbar-nav">
            <li>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>
            <li>
              <Link to="/equipment" className="nav-link">Equipment</Link>
            </li>
            <li>
              <Link to="/requests" className="nav-link">My Requests</Link>
            </li>
            {user.role === 'ADMIN' && (
              <li>
                <Link to="/admin/equipment" className="nav-link">Manage Equipment</Link>
              </li>
            )}
            <li>
              <span className="nav-link" style={{ opacity: 0.8 }}>
                {user.fullName} ({user.role})
              </span>
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

