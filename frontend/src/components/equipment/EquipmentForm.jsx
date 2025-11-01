import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import equipmentService from '../../services/equipmentService';

const EquipmentForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    quantity: 1,
    condition: 'GOOD',
    imageUrl: ''
  });

  const categories = ['Photography', 'Lab Equipment', 'Musical Instruments', 'Sports', 'Electronics', 'Project Materials'];
  const conditions = ['EXCELLENT', 'GOOD', 'FAIR'];

  useEffect(() => {
    if (isEdit && id) {
      fetchEquipment();
    }
  }, [id, isEdit]);

  const fetchEquipment = async () => {
    try {
      const data = await equipmentService.getEquipmentById(id);
      setFormData({
        name: data.name,
        category: data.category,
        description: data.description || '',
        quantity: data.quantity,
        condition: data.condition,
        imageUrl: data.imageUrl || ''
      });
    } catch (err) {
      setError('Failed to fetch equipment details');
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
      if (isEdit) {
        await equipmentService.updateEquipment(id, formData);
        alert('Equipment updated successfully');
      } else {
        await equipmentService.createEquipment(formData);
        alert('Equipment created successfully');
      }
      navigate('/admin/equipment');
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>{isEdit ? 'Edit Equipment' : 'Add New Equipment'}</h2>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name *</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Quantity *</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Condition *</label>
            <select
              name="condition"
              className="form-control"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              {conditions.map(cond => (
                <option key={cond} value={cond}>{cond}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              className="form-control"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/admin/equipment')} 
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

export default EquipmentForm;

