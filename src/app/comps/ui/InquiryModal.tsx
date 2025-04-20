import React from "react";

interface InquiryModalProps {
  inquiryData: any;
  onClose: () => void;
}

const InquiryModal: React.FC<InquiryModalProps> = ({ inquiryData, onClose }) => {
  if (!inquiryData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-lg font-bold mb-4">Transaction Inquiry Details</h2>
        
        <pre className="bg-gray-100 p-4 rounded-lg text-sm">
          {JSON.stringify(inquiryData, null, 2)}
        </pre>

        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default InquiryModal;
