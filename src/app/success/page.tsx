"use client"; // Ensure it's a client component

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const SuccessPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState("pending");

    useEffect(() => {
        const fetchTransactionStatus = async () => {
            const txnRefNo = searchParams.get("pp_TxnRefNo");
            if (!txnRefNo) {
                toast.error("Transaction reference missing.");
                return;
            }

            try {
                const response = await fetch(`/api/jazzcash/get-transaction?txnRefNo=${txnRefNo}`);
                const data = await response.json();

                if (data.success) {
                    setStatus(data.status);
                    toast.success(`Payment Status: ${data.status}`);
                } else {
                    toast.error(data.error || "Failed to fetch transaction.");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                toast.error("Error fetching transaction.");
            }
        };

        fetchTransactionStatus();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-xl font-semibold">
                Payment Status: {status}
            </h1>
        </div>
    );
};

export default SuccessPage;
