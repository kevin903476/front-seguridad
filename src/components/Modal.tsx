import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, message }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px] text-center">
        <p className="mb-4 text-lg">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;