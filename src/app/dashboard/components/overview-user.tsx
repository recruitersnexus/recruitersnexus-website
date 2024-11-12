import { useState, useEffect } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import useUserData from "@/lib/db/userData";
import InterviewData from "@/lib/db/interviewData";
import { myInterview } from "@/data/page-data";

export function Overview() {
  const { interviews } = InterviewData();
  const { userData } = useUserData();
  const [filteredInterviews, setFilteredInterviews] = useState<myInterview[]>([]);

  // Filter interviews conducted in the last 7 days
  useEffect(() => {
    const filtered = interviews?.filter(
      (item) =>
        item.user_id === userData?.id &&
        item.is_conducted === "conducted" &&
        new Date(item.slot).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
    );
    setFilteredInterviews(filtered);
  }, [interviews, userData]);

  // Map the interviews to represent them by day of the week
  const weeklyData = Array.from({ length: 7 }, (_, index) => {
    const day = new Date();
    // Calculate the date of the day to display
    const dayOfMonth = day.getDate() - index;
    day.setDate(dayOfMonth);
    const dayOfWeek = day.toLocaleString("en-us", { weekday: "long" });

    // Filter interviews conducted on this day
    const conductedOnDay = filteredInterviews.filter(
      (item) => new Date(item.slot).toLocaleDateString() === day.toLocaleDateString()
    );

    return {
      name: dayOfWeek,
      total: conductedOnDay.length,
    };
  }).reverse(); // Reverse to display Monday to Sunday

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={weeklyData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#4765FF" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
