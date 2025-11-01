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
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card">
      <div className="card-header flex-between">
        <h2>{equipment.name}</h2>
        <div className="flex gap-2">
          {isAdmin() && (
            <>
              <Link to={`/admin/equipment/edit/${equipment.id}`} className="btn btn-primary">
                Edit
              </Link>
              <button onClick={handleDelete} className="btn btn-danger">
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      <div className="card-body">
        {equipment.imageUrl && (
          <img 
            src={equipment.imageUrl} 
            alt={equipment.name}
            style={{ width: '100%', maxWidth: '500px', height: 'auto', marginBottom: '1.5rem', borderRadius: '8px' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x300?text=No+Image';
            }}
          />
        )}

        <div className="grid grid-2" style={{ marginBottom: '1.5rem' }}>
          <div>
            <p><strong>Category:</strong> {equipment.category}</p>
            <p><strong>Condition:</strong> {equipment.condition}</p>
          </div>
          <div>
            <p><strong>Total Quantity:</strong> {equipment.quantity}</p>
            <p><strong>Available:</strong> {equipment.availableQty}</p>
          </div>
        </div>

        {equipment.description && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h3>Description</h3>
            <p>{equipment.description}</p>
          </div>
        )}

        <div className="flex gap-2">
          {equipment.availableQty > 0 && (
            <Link to={`/requests/create/${equipment.id}`} className="btn btn-success">
              Request to Borrow
            </Link>
          )}
          {equipment.availableQty === 0 && (
            <span className="badge badge-rejected">Out of Stock</span>
          )}
          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;

