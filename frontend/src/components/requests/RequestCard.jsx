import RequestActions from './RequestActions';
import { useAuth } from '../../contexts/AuthContext';

const RequestCard = ({ request, onUpdate }) => {
  const { isStaff } = useAuth();

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const isOverdue = () => {
    if (request.status !== 'APPROVED' || !request.dueDate) return false;
    const today = new Date();
    const dueDate = new Date(request.dueDate);
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  const getDaysOverdue = () => {
    if (!isOverdue()) return 0;
    const today = new Date();
    const dueDate = new Date(request.dueDate);
    const diffTime = today - dueDate;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
    <div className={`card ${isOverdue() ? 'card-overdue' : ''}`}>
      <div className="card-header flex-between">
        <h3>{request.equipment.name}</h3>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {isOverdue() && (
            <span className="badge badge-overdue">
              OVERDUE ({getDaysOverdue()} day{getDaysOverdue() > 1 ? 's' : ''})
            </span>
          )}
          {getStatusBadge(request.status)}
        </div>
      </div>
      <div className="card-body">
        <div className="grid grid-2" style={{ marginBottom: '1rem' }}>
          <div>
            <p><strong>Requested By:</strong> {request.user.fullName}</p>
            <p><strong>Quantity:</strong> {request.quantity}</p>
            <p><strong>Request Date:</strong> {formatDate(request.requestDate)}</p>
          </div>
          <div>
            <p>
              <strong>Due Date:</strong>{' '}
              <span className={isOverdue() ? 'text-overdue' : ''}>
                {formatDate(request.dueDate)}
                {isOverdue() && ' ⚠️'}
              </span>
            </p>
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

