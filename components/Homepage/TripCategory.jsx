import React from "react";
import "../../app/globals.css"

const TripCategory = () => {
  const tripCategories = [
    {
      categoryId: 1,
      categoryName: "Beach",
      icon: "🏖️",
      color: "bg-light-blue-300",
    },
    {
      categoryId: 2,
      categoryName: "Mountain",
      icon: "⛰️",
      color: "bg-light-green-300",
    },
    {
      categoryId: 3,
      categoryName: "City",
      icon: "🏙️",
      color: "bg-purple-300",
    },
    {
      categoryId: 4,
      categoryName: "Adventure",
      icon: "🌄",
      color: "bg-yellow-300",
    },
    {
      categoryId: 5,
      categoryName: "Cultural",
      icon: "🏛️",
      color: "bg-yellow-200",
    },
    {
      categoryId: 6,
      categoryName: "Food",
      icon: "🍽️",
      color: "bg-red-200",
    },
    {
      categoryId: 7,
      categoryName: "Wildlife",
      icon: "🐾",
      color: "bg-pink-200",
    },
  ];

  return (
    <div className="trip-category w-full flex justify-center items-center h-28 bg-white whitespace-nowrap overflow-x-auto">
      {tripCategories.map((category) => (
        <div
          key={category.categoryId}
          className="flex flex-col flex-shrink-0 items-center w-28 text-slate-700"
        >
          <a
            href={`/${category.categoryName}`}
            className="flex flex-col items-center  gap-1"
          >
            <div
              className={`flex items-center justify-center w-12 h-12 bg-[#c7a7c6] rounded-2xl`}
            >
              {category.icon}
            </div>
            <p className="">{category.categoryName}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default TripCategory;
