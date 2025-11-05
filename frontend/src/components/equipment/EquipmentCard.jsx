import { Link } from 'react-router-dom';

function EquipmentCard({ equipment }) {
  return (
    <Link 
      to={`/equipment/${equipment.id}`}
      className="card overflow-hidden group transform hover:scale-105 transition-transform duration-300"
    >
      {/* Image Section */}
      <div className="aspect-video bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden">
        {equipment.imageUrl ? (
          <img 
            src={equipment.imageUrl} 
            alt={equipment.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <svg className="w-20 h-20 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        )}
        
        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          {equipment.availableQty > 0 ? (
            <span className="badge badge-success shadow-lg">
              ✓ Available
            </span>
          ) : (
            <span className="badge badge-danger shadow-lg">
              ✗ Unavailable
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors flex-1">
            {equipment.name}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {equipment.description || 'No description available'}
        </p>

        {/* Metadata */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 font-medium">Category:</span>
            <span className="badge badge-primary">{equipment.category}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 font-medium">Condition:</span>
            <span className="font-semibold text-gray-700">{equipment.condition}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 font-medium">Available:</span>
            <span className="font-bold text-blue-600">{equipment.availableQty} / {equipment.quantity}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full btn-primary text-sm">
          View Details →
        </button>
      </div>
    </Link>
  );
}

export default EquipmentCard;
