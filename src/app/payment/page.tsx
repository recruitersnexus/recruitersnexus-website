"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PaymentButton from "../comps/PaymentButton";
import { getExchangeRate } from "@/lib/utils";
import useUserData from "@/lib/db/userData";

export default function PaymentPage({ params }: { params: { plan: string; priceUSD: string } }) {
  const router = useRouter();
  const { userData, status } = useUserData();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "Basic"; // Default fallback
  const priceUSD = parseFloat(searchParams.get("priceUSD") || "0"); // Ensure it's a number

  const [error, setError] = useState("");
  const [pricePKR, setPricePKR] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Check if userData is available before proceeding
    // console.log("userData : ", userData);
    if (!userData) return;

    // Handle user not found scenario
    if (status === "404") {
      setLoading(false);
      setError("No user found! Please log in.");
      router.push("/login");
      return;
    }

    // Restrict Admins & HR from purchasing
    if (userData?.role === "admin" || userData?.role === "hr") {
      setLoading(false);
      setError("Only regular users can make a purchase. Admins and HR are not allowed to buy this.");
      return;
    }

    async function fetchExchangeRate() {
      try {
        const rate = await getExchangeRate();
        setPricePKR(parseFloat((priceUSD * rate).toFixed(2)));
      } catch (err) {
        setError("Failed to fetch exchange rate.");
      } finally {
        setLoading(false);
      }
    }

    if (priceUSD >= 0) {
      fetchExchangeRate();
    } else {
      setLoading(false);
      setError("Invalid price.");
    }
  }, [priceUSD, userData, status]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Checkout
        </h2>
        <div className="border-b border-gray-300 pb-4 mb-4">
          <p className="text-gray-600">
            <span className="font-semibold">Plan:</span> {plan}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Price:</span> ${priceUSD.toFixed(2)} USD
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Converted Price:</span>{" "}
            {loading ? "Loading..." : `${pricePKR.toFixed(2)} PKR`}
          </p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {userData && userData?.role === "user" && (
          <PaymentButton amount={pricePKR} plan={plan} />
        )}
      </div>
    </div>
  );
}
