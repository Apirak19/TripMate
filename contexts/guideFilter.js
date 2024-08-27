"use client";
import React, { createContext, useState, useEffect } from "react";
// import connectionPool from "@/utils/supabase/connectionPool"; // Ensure this is only used server-side

export const GuideFilterContext = createContext();

export default function GuideFilterProvider({ children }) {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOptions, setFilterOptions] = useState({});

  useEffect(() => {
    const getAllGuides = async () => {
      try {
        setLoading(true);
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

  const updateFilteredData = async (data) => {
    setFilteredData(data);
  };

  const getFilteredData = async (filterOptions) => {
    try {
      setLoading(true);
      const res = fetch("/api/guides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "filter",
          values: filterOptions,
        }),
      });
      const data = (await res).json();
      setFilteredData(data.data);
    } catch {
      (error) => {
        setError(error);
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuideFilterContext.Provider
      value={{
        filteredData,
        updateFilteredData,
        getFilteredData,
        loading,
        setLoading,
        error,
        filterOptions,
        setFilterOptions,
      }}
    >
      {children}
    </GuideFilterContext.Provider>
  );
}
