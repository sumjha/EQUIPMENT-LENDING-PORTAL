import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import NotificationBanner from '../components/notifications/NotificationBanner';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>Welcome, {user.fullName}!</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Role: {user.role}
      </p>

      <NotificationBanner />

      <div className="grid grid-3">
        <div className="card">
          <div className="card-header">
            <h3>Browse Equipment</h3>
          </div>
          <div className="card-body">
            <p>View all available equipment and their details.</p>
            <Link to="/equipment" className="btn btn-primary mt-2">
              View Equipment
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>My Requests</h3>
          </div>
          <div className="card-body">
            <p>View and manage your borrowing requests.</p>
            <Link to="/requests" className="btn btn-primary mt-2">
              View Requests
            </Link>
          </div>
        </div>

        {user.role === 'ADMIN' && (
          <div className="card">
            <div className="card-header">
              <h3>Manage Equipment</h3>
            </div>
            <div className="card-body">
              <p>Add, edit, or delete equipment items.</p>
              <Link to="/admin/equipment" className="btn btn-primary mt-2">
                Manage Equipment
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="card mt-3">
        <div className="card-header">
          <h3>Quick Actions</h3>
        </div>
        <div className="card-body">
          <div className="flex gap-2">
            <Link to="/equipment" className="btn btn-primary">
              Browse Equipment
            </Link>
            {user.role === 'ADMIN' && (
              <Link to="/admin/equipment/new" className="btn btn-success">
                Add New Equipment
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

