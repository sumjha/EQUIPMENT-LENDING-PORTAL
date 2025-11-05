import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import equipmentService from '../services/equipmentService';
import requestService from '../services/requestService';

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalEquipment: 0,
    availableEquipment: 0,
    myRequests: 0,
    pendingRequests: 0
  });
  const [recentEquipment, setRecentEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [equipment, requests] = await Promise.all([
        equipmentService.getAllEquipment(),
        requestService.getAllRequests()
      ]);

      setStats({
        totalEquipment: equipment.length,
        availableEquipment: equipment.filter(e => e.availableQty > 0).length,
        myRequests: requests.length,
        pendingRequests: requests.filter(r => r.status === 'PENDING').length
      });

      setRecentEquipment(equipment.slice(0, 6));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-gradient mb-2">
          Welcome back, {user.fullName}!
        </h1>
        <p className="text-gray-600 text-lg">Here's an overview of your equipment portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="card-gradient p-6 transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Equipment</p>
              <p className="text-4xl font-bold text-gradient mt-2">{stats.totalEquipment}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card-gradient p-6 transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Available</p>
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 mt-2">{stats.availableEquipment}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card-gradient p-6 transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">My Requests</p>
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-600 mt-2">{stats.myRequests}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card-gradient p-6 transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Pending</p>
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">{stats.pendingRequests}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/equipment" 
            className="card p-6 hover:border-2 hover:border-blue-500 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Browse Equipment</h3>
                <p className="text-sm text-gray-600">View all available items</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/requests" 
            className="card p-6 hover:border-2 hover:border-purple-500 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors">My Requests</h3>
                <p className="text-sm text-gray-600">View your borrow requests</p>
              </div>
            </div>
          </Link>

          {user.role === 'ADMIN' && (
            <Link 
              to="/admin/equipment" 
              className="card p-6 hover:border-2 hover:border-pink-500 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-colors">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors">Admin Panel</h3>
                  <p className="text-sm text-gray-600">Manage equipment</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Recent Equipment */}
      {recentEquipment.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Equipment</h2>
            <Link to="/equipment" className="text-blue-600 hover:text-purple-600 font-semibold transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentEquipment.map(equipment => (
              <Link 
                key={equipment.id} 
                to={`/equipment/${equipment.id}`}
                className="card overflow-hidden group"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  {equipment.imageUrl ? (
                    <img 
                      src={equipment.imageUrl} 
                      alt={equipment.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <svg className="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{equipment.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{equipment.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="badge badge-primary">{equipment.category}</span>
                    <span className={`badge ${equipment.availableQty > 0 ? 'badge-success' : 'badge-danger'}`}>
                      {equipment.availableQty} Available
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
