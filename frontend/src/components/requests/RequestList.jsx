import { useState, useEffect } from 'react';
import requestService from '../../services/requestService';
import RequestCard from './RequestCard';
import { useAuth } from '../../contexts/AuthContext';

const RequestList = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await requestService.getAllRequests();
      setRequests(data);
    } catch (err) {
      setError('Failed to fetch requests');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = requests.filter(request => {
    if (!statusFilter) return true;
    return request.status === statusFilter;
  });

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex-between mb-3">
        <h2>
          {user.role === 'STUDENT' ? 'My Requests' : 'All Requests'}
        </h2>
        <select
          className="form-control"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ width: '200px' }}
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="RETURNED">Returned</option>
        </select>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {filteredRequests.length === 0 ? (
        <div className="card text-center">
          <p>No requests found</p>
        </div>
      ) : (
        <div className="grid">
          {filteredRequests.map((request) => (
            <RequestCard 
              key={request.id} 
              request={request} 
              onUpdate={fetchRequests}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestList;

