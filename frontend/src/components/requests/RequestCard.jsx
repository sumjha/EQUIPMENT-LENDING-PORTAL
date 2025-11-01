import RequestActions from './RequestActions';
import { useAuth } from '../../contexts/AuthContext';

const RequestCard = ({ request, onUpdate }) => {
  const { isStaff } = useAuth();

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status) => {
    const badgeClass = {
      PENDING: 'badge-pending',
      APPROVED: 'badge-approved',
      REJECTED: 'badge-rejected',
      RETURNED: 'badge-returned'
    }[status];

    return <span className={`badge ${badgeClass}`}>{status}</span>;
  };

  return (
    <div className="card">
      <div className="card-header flex-between">
        <h3>{request.equipment.name}</h3>
        {getStatusBadge(request.status)}
      </div>
      <div className="card-body">
        <div className="grid grid-2" style={{ marginBottom: '1rem' }}>
          <div>
            <p><strong>Requested By:</strong> {request.user.fullName}</p>
            <p><strong>Quantity:</strong> {request.quantity}</p>
            <p><strong>Request Date:</strong> {formatDate(request.requestDate)}</p>
          </div>
          <div>
            <p><strong>Due Date:</strong> {formatDate(request.dueDate)}</p>
            {request.approvedBy && (
              <p><strong>Approved By:</strong> {request.approvedBy.fullName}</p>
            )}
            {request.approvedDate && (
              <p><strong>Approved Date:</strong> {formatDate(request.approvedDate)}</p>
            )}
            {request.returnedDate && (
              <p><strong>Returned Date:</strong> {formatDate(request.returnedDate)}</p>
            )}
          </div>
        </div>

        {request.notes && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>Notes:</strong>
            <p style={{ color: '#666', marginTop: '0.25rem' }}>{request.notes}</p>
          </div>
        )}

        {isStaff() && <RequestActions request={request} onUpdate={onUpdate} />}
      </div>
    </div>
  );
};

export default RequestCard;

