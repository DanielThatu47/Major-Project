import { X } from 'lucide-react';

const CustomModal = ({ isOpen, onClose, title, message, type }) => {
  if (!isOpen) return null;

  // Determine modal styles based on the type
  const typeStyles = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`w-full max-w-md p-6 rounded-lg border ${typeStyles[type]}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm">{message}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded ${
              type === 'success'
                ? 'bg-green-500 text-white hover:bg-green-600'
                : type === 'error'
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
