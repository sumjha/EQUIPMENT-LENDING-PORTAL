import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import requestService from '../../services/requestService';
import './NotificationBanner.css';

const NotificationBanner = () => {
  const [overdueRequests, setOverdueRequests] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const { user, isStaff } = useAuth();

  useEffect(() => {
    fetchOverdueRequests();
  }, []);

  const fetchOverdueRequests = async () => {
    try {
      const data = await requestService.getOverdueRequests();
      setOverdueRequests(data);
    } catch (error) {
      console.error('Error fetching overdue requests:', error);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible || overdueRequests.length === 0) {
    return null;
  }

  const getMessage = () => {
    if (isStaff()) {
      return `⚠️ ${overdueRequests.length} equipment${overdueRequests.length > 1 ? 's are' : ' is'} overdue and need${overdueRequests.length === 1 ? 's' : ''} to be returned.`;
    } else {
      return `⚠️ You have ${overdueRequests.length} overdue equipment request${overdueRequests.length > 1 ? 's' : ''}. Please return the equipment as soon as possible.`;
    }
  };

  return (
    <div className="notification-banner">
      <div className="notification-content">
        <span className="notification-message">{getMessage()}</span>
        <div className="notification-details">
          {overdueRequests.map((request) => (
            <div key={request.id} className="overdue-item">
              <strong>{request.equipment.name}</strong> - Due: {new Date(request.dueDate).toLocaleDateString()}
              {isStaff() && <span className="borrower-info"> (Borrowed by: {request.user.fullName})</span>}
            </div>
          ))}
        </div>
      </div>
      <button className="notification-dismiss" onClick={handleDismiss}>
        ✕
      </button>
    </div>
  );
};

export default NotificationBanner;

