import React from "react";

const TransactionModal = ({ requestBody, responseBody, onClose }: { requestBody: any; responseBody: any; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-2/3 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Transaction Details</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-md font-semibold mb-2">Request Body</h3>
            <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(requestBody, null, 2)}</pre>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-md font-semibold mb-2">Response Body</h3>
            <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(responseBody, null, 2)}</pre>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
