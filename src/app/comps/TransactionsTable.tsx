"use client";
import { useEffect, useState } from "react";

const TransactionsTable = ({ userId, role }: { userId: string; role: "admin" | "user" }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch(`/api/transactions?userId=${userId}&role=${role}`);
      const data = await response.json();
      if (data.success) setTransactions(data.transactions);
    };
    fetchTransactions();
  }, []);

  const handleRefund = async (transactionId: number, action?: "approve" | "reject") => {
    const response = await fetch("/api/transactions/refund", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionId, role, action }),
    });

    const data = await response.json();
    alert(data.message);
    location.reload(); // Refresh table
  };

  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2">Txn ID</th>
          <th className="px-4 py-2">Amount</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((txn) => (
          <tr key={txn.id} className="border-b">
            <td className="px-4 py-2">{txn.txnRefNo}</td>
            <td className="px-4 py-2">Rs {txn.amount}</td>
            <td className="px-4 py-2">{txn.status}</td>
            <td className="px-4 py-2">
              {role === "user" && txn.status === "success" && (
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleRefund(txn.id)}
                >
                  Request Refund
                </button>
              )}
              {role === "admin" && txn.status === "refund_requested" && (
                <>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleRefund(txn.id, "approve")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleRefund(txn.id, "reject")}
                  >
                    Reject
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
