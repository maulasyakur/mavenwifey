"use client";

import { BatteryFull, Signal, Wifi } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [time, setTime] = useState<string>();

  useEffect(() => {
    setInterval(() => {
      const dateObject = new Date();

      const hour = dateObject.getHours();
      const minute = dateObject.getMinutes();
      const currentTime =
        hour.toString().padStart(2, "0") +
        " : " +
        minute.toString().padStart(2, "0");

      setTime(currentTime);
    }, 1000);
  }, []);

  return (
    <div className="flex justify-between px-5 py-2">
      <div className="text-sm font-medium">{time}</div>
      <div className="flex gap-2">
        <Signal />
        <Wifi />
        <BatteryFull />
      </div>
    </div>
  );
}
