"use client";
import React, { createContext, useState, useEffect } from "react";
// import connectionPool from "@/utils/supabase/connectionPool"; // Ensure this is only used server-side

export const GuideFilterContext = createContext();

export default function GuideFilterProvider({ children }) {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllGuides = async () => {
      try {
        const res = await fetch("/api/guides", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "getAll" }),
        });
        const data = await res.json();
        console.log("data", data.data);
        setFilteredData(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getAllGuides();
  }, []);

  const updateFilteredData = (data) => {
    setFilteredData(data);
  };

  return (
    <GuideFilterContext.Provider
      value={{ filteredData, updateFilteredData, loading, error }}
    >
      {children}
    </GuideFilterContext.Provider>
  );
}
