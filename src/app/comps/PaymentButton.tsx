import { useState } from "react";
import toast from "react-hot-toast";
import useUserData from "@/lib/db/userData";
import { useRouter } from "next/navigation";

export default function PaymentButton({
  amount,
  plan
}: {
  amount: any;
  plan: any;
}) {
  const [loading, setLoading] = useState(false);
  const { userData, status } = useUserData();
  const router = useRouter();

  const handlePayment = async () => {
    try {
      if (status === "404") {
        toast.error("No User Found! Please log in.");
        router.push("/login");
        return;
      }
      setLoading(true);
      const response = await fetch("/api/jazzcash/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, userId: userData?.id, plan })
      });

      const data = await response.json();

      if (data.success && data.paymentUrl) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = data.paymentUrl;

        Object.keys(data.params).forEach((key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = data.params[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        toast.error(data.error || "Payment initiation failed!");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Error processing payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`mt-4 ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[#FFC107] hover:bg-[#D32F2F] hover:text-white"
      } text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md flex items-center justify-center`}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
          Processing...
        </>
      ) : (
        "Pay with JazzCash"
      )}
    </button>
  );
}
