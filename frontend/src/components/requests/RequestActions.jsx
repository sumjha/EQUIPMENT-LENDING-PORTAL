import { useState } from 'react';
import requestService from '../../services/requestService';

const RequestActions = ({ request, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    if (!window.confirm('Are you sure you want to approve this request?')) {
      return;
    }

    setLoading(true);
    try {
      await requestService.approveRequest(request.id);
      alert('Request approved successfully');
      onUpdate();
    } catch (err) {
      alert('Failed to approve request: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!window.confirm('Are you sure you want to reject this request?')) {
      return;
    }

    setLoading(true);
    try {
      await requestService.rejectRequest(request.id);
      alert('Request rejected');
      onUpdate();
    } catch (err) {
      alert('Failed to reject request: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async () => {
    if (!window.confirm('Mark this equipment as returned?')) {
      return;
    }

    setLoading(true);
    try {
      await requestService.returnRequest(request.id);
      alert('Equipment marked as returned');
      onUpdate();
    } catch (err) {
      alert('Failed to mark as returned: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mt-2">
      {request.status === 'PENDING' && (
        <>
          <button 
            onClick={handleApprove} 
            className="btn btn-success"
            disabled={loading}
          >
            Approve
          </button>
          <button 
            onClick={handleReject} 
            className="btn btn-danger"
            disabled={loading}
          >
            Reject
          </button>
        </>
      )}

      {request.status === 'APPROVED' && (
        <button 
          onClick={handleReturn} 
          className="btn btn-primary"
          disabled={loading}
        >
          Mark as Returned
        </button>
      )}
    </div>
  );
};

export default RequestActions;

