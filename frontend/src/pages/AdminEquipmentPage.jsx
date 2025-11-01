import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import equipmentService from '../services/equipmentService';

const AdminEquipmentPage = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const data = await equipmentService.getAllEquipment();
      setEquipment(data);
    } catch (err) {
      setError('Failed to fetch equipment');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this equipment?')) {
      return;
    }

    try {
      await equipmentService.deleteEquipment(id);
      alert('Equipment deleted successfully');
      fetchEquipment();
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

  return (
    <div className="container">
      <div className="flex-between mb-3">
        <h1>Manage Equipment</h1>
        <Link to="/admin/equipment/new" className="btn btn-success">
          Add New Equipment
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {equipment.length === 0 ? (
        <div className="card text-center">
          <p>No equipment found</p>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Condition</th>
                <th>Total</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipment.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.condition}</td>
                  <td>{item.quantity}</td>
                  <td>{item.availableQty}</td>
                  <td>
                    <div className="flex gap-1">
                      <Link 
                        to={`/equipment/${item.id}`} 
                        className="btn btn-primary"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}
                      >
                        View
                      </Link>
                      <Link 
                        to={`/admin/equipment/edit/${item.id}`} 
                        className="btn btn-secondary"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="btn btn-danger"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminEquipmentPage;

