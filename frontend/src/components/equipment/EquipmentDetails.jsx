import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import equipmentService from '../../services/equipmentService';
import { useAuth } from '../../contexts/AuthContext';

const EquipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEquipment();
  }, [id]);

  const fetchEquipment = async () => {
    try {
      const data = await equipmentService.getEquipmentById(id);
      setEquipment(data);
    } catch (err) {
      setError('Failed to fetch equipment details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this equipment?')) {
      return;
    }

    try {
      await equipmentService.deleteEquipment(id);
      alert('Equipment deleted successfully');
      navigate('/admin/equipment');
    } catch (err) {
      alert('Failed to delete equipment: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading equipment details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="card p-8 max-w-md">
          <div className="text-red-500 text-center">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl font-semibold">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header with Actions */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        
        {isAdmin() && (
          <div className="flex space-x-3">
            <Link to={`/admin/equipment/edit/${equipment.id}`} className="btn-primary">
              Edit Equipment
            </Link>
            <button onClick={handleDelete} className="btn-danger">
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="card overflow-hidden">
        {/* Image Section */}
        <div className="aspect-video bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
          {equipment.imageUrl ? (
            <img 
              src={equipment.imageUrl} 
              alt={equipment.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x450?text=No+Image';
              }}
            />
          ) : (
            <svg className="w-32 h-32 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          )}
        </div>

        {/* Content Section */}
        <div className="p-8">
          {/* Title and Status */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gradient mb-3">{equipment.name}</h1>
              <div className="flex items-center space-x-3">
                <span className="badge badge-primary text-lg">{equipment.category}</span>
                {equipment.availableQty > 0 ? (
                  <span className="badge badge-success text-lg">
                    ✓ {equipment.availableQty} Available
                  </span>
                ) : (
                  <span className="badge badge-danger text-lg">
                    ✗ Out of Stock
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">Total Quantity</p>
              <p className="text-3xl font-bold text-blue-800">{equipment.quantity}</p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6 border border-green-100">
              <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-2">Available</p>
              <p className="text-3xl font-bold text-green-800">{equipment.availableQty}</p>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2">Condition</p>
              <p className="text-3xl font-bold text-purple-800">{equipment.condition}</p>
            </div>
          </div>

          {/* Description */}
          {equipment.description && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{equipment.description}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            {equipment.availableQty > 0 ? (
              <Link 
                to={`/requests/create/${equipment.id}`} 
                className="btn-success flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Request to Borrow
              </Link>
            ) : (
              <button disabled className="bg-gray-300 text-gray-500 font-semibold py-2 px-6 rounded-lg cursor-not-allowed">
                Out of Stock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;
