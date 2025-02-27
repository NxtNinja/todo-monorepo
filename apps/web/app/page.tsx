"use client";

import { useEffect, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import LogoutBtn from "@/components/LogoutBtn";
import { useRouter } from "next/navigation";

export default function Page() {
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            router.push("/login");
            return;
          }
        }

        const data = await response.json();
        setMessage(data.message);
        console.log("Data from API:", data.message);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        if (error) {
          router.push("/login");
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">{message}</h1>
        <LogoutBtn />
      </div>
    </div>
  );
}
