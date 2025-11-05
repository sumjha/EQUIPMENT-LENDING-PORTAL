import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import requestService from '../../services/requestService';
import equipmentService from '../../services/equipmentService';

const RequestForm = () => {
  const { equipmentId } = useParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    equipmentId: equipmentId || '',
    quantity: 1,
    dueDate: '',
    notes: ''
  });

  useEffect(() => {
    if (equipmentId) {
      fetchEquipment();
    } else {
      setLoading(false);
    }
  }, [equipmentId]);

  const fetchEquipment = async () => {
    try {
      const data = await equipmentService.getEquipmentById(equipmentId);
      setEquipment(data);
      setFormData(prev => ({ ...prev, equipmentId: data.id }));
    } catch (err) {
      setError('Failed to fetch equipment details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await requestService.createRequest(formData);
      alert('Borrow request submitted successfully');
      navigate('/requests');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  // Get tomorrow's date as minimum due date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Create Borrow Request</h2>
      </div>
      <div className="card-body">
        {equipment && (
          <div className="alert alert-info mb-3">
            <strong>Equipment:</strong> {equipment.name}<br />
            <strong>Available:</strong> {equipment.availableQty} / {equipment.quantity}
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Quantity *</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              max={equipment?.availableQty || 1}
              required
            />
            {equipment && (
              <small className="form-error">
                Maximum available: {equipment.availableQty}
              </small>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Expected Return Date *</label>
            <input
              type="date"
              name="dueDate"
              className="form-control"
              value={formData.dueDate}
              onChange={handleChange}
              min={getTomorrowDate()}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              name="notes"
              className="form-control"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Any additional information or special requirements..."
            />
          </div>

          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate(-1)} 
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;

