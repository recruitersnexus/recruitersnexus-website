"use client"; // Ensure it's a client component

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("checking");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        setLoading(true);
        // Get all search params
        const params = Object.fromEntries(searchParams.entries());
        console.log("Payment Status Params:", params);

        const txnRefNo = params.pp_TxnRefNo;
        const responseCode = params.pp_ResponseCode;

        if (!txnRefNo) {
          console.error("Transaction reference missing");
          toast.error("Transaction reference missing.");
          setStatus("error");
          setLoading(false);
          return;
        }

        // First, verify the payment with JazzCash
        const verifyResponse = await fetch("/api/jazzcash/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pp_TxnRefNo: txnRefNo,
            pp_ResponseCode: responseCode,
            pp_SecureHash: params.pp_SecureHash,
            ...params // Include all other params
          })
        });

        if (!verifyResponse.ok) {
          throw new Error(`Verification failed: ${verifyResponse.statusText}`);
        }

        const verifyData = await verifyResponse.json();
        console.log("Verification Response:", verifyData);

        if (verifyData.success) {
          // Get the updated transaction status
          const statusResponse = await fetch(
            `/api/jazzcash/get-transaction?txnRefNo=${txnRefNo}`
          );

          if (!statusResponse.ok) {
            throw new Error(
              `Status check failed: ${statusResponse.statusText}`
            );
          }

          const statusData = await statusResponse.json();
          console.log("Status Response:", statusData);

          if (statusData.success) {
            setStatus(statusData.status);

            if (statusData.status === "success") {
              toast.success("Payment successful!");
              // Redirect to dashboard after 3 seconds
              setTimeout(() => {
                router.push("/transactions");
              }, 3000);
            } else if (statusData.status === "failed") {
              toast.error("Payment failed. Please try again.");
              // Redirect to transactions page after 3 seconds
              setTimeout(() => {
                router.push("/transactions");
              }, 3000);
            }
          } else {
            console.error("Status check failed:", statusData.error);
            toast.error(
              statusData.error || "Failed to fetch transaction status."
            );
            setStatus("error");
          }
        } else {
          console.error("Verification failed:", verifyData.error);
          toast.error(verifyData.error || "Payment verification failed.");
          setStatus("error");
        }
      } catch (error) {
        console.error("Payment Status Check Error:", error);
        toast.error("Error checking payment status. Please try again.");
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Processing payment status...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Status</h1>

        {status === "success" && (
          <div className="text-green-600">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <p className="text-xl font-semibold">Payment Successful!</p>
            <p className="text-sm mt-2">Redirecting to transaction page...</p>
          </div>
        )}

        {status === "failed" && (
          <div className="text-red-600">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            <p className="text-xl font-semibold">Payment Failed</p>
            <p className="text-sm mt-2">Redirecting to transactions page...</p>
          </div>
        )}

        {status === "error" && (
          <div className="text-red-600">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
            <p className="text-xl font-semibold">Error</p>
            <p className="text-sm mt-2">
              Something went wrong. Please try again.
            </p>
            <button
              onClick={() => router.push("/transactions")}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Go to Transactions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
// Added loader
