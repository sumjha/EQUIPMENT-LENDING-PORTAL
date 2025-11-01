import { useState, useEffect } from 'react';
import equipmentService from '../../services/equipmentService';
import EquipmentCard from './EquipmentCard';

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availableFilter, setAvailableFilter] = useState('');

  const categories = ['Photography', 'Lab Equipment', 'Musical Instruments', 'Sports', 'Electronics', 'Project Materials'];

  useEffect(() => {
    fetchEquipment();
  }, [categoryFilter, availableFilter]);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const availableBool = availableFilter === 'true' ? true : availableFilter === 'false' ? false : null;
      const data = await equipmentService.getAllEquipment(
        categoryFilter || null,
        availableBool
      );
      setEquipment(data);
    } catch (err) {
      setError('Failed to fetch equipment');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchKeyword.trim()) {
      fetchEquipment();
      return;
    }

    try {
      setLoading(true);
      const data = await equipmentService.searchEquipment(searchKeyword);
      setEquipment(data);
    } catch (err) {
      setError('Search failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchKeyword('');
    setCategoryFilter('');
    setAvailableFilter('');
    fetchEquipment();
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSearch}>
            <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search equipment..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                style={{ flex: 1, minWidth: '200px' }}
              />
              <select
                className="form-control"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{ width: '200px' }}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                className="form-control"
                value={availableFilter}
                onChange={(e) => setAvailableFilter(e.target.value)}
                style={{ width: '150px' }}
              >
                <option value="">All Items</option>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
              <button type="submit" className="btn btn-primary">Search</button>
              <button type="button" onClick={handleReset} className="btn btn-secondary">Reset</button>
            </div>
          </form>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {equipment.length === 0 ? (
        <div className="card text-center">
          <p>No equipment found</p>
        </div>
      ) : (
        <div className="grid grid-3">
          {equipment.map((item) => (
            <EquipmentCard key={item.id} equipment={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EquipmentList;

