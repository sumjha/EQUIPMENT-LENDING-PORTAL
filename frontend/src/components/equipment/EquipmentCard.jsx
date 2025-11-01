import { Link } from 'react-router-dom';

const EquipmentCard = ({ equipment }) => {
  return (
    <div className="card">
      {equipment.imageUrl && (
        <img 
          src={equipment.imageUrl} 
          alt={equipment.name}
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      )}
      <div className="card-body">
        <h3>{equipment.name}</h3>
        <p style={{ color: '#666', marginBottom: '0.5rem' }}>
          <strong>Category:</strong> {equipment.category}
        </p>
        <p style={{ color: '#666', marginBottom: '0.5rem' }}>
          <strong>Condition:</strong> {equipment.condition}
        </p>
        <p style={{ marginBottom: '0.5rem' }}>
          <strong>Available:</strong> {equipment.availableQty} / {equipment.quantity}
        </p>
        {equipment.description && (
          <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            {equipment.description.substring(0, 100)}
            {equipment.description.length > 100 && '...'}
          </p>
        )}
        <div className="mt-2">
          <Link 
            to={`/equipment/${equipment.id}`} 
            className="btn btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCard;

