import React from "react";

const GuidePage = () => {
  const guideData = [
    {
      profilePicture: "https://placehold.co/600x400",
      firstName: "John",
      lastName: "Doe",
      age: 30,
      gender: "male",
      language: ["English", "Spanish"],
      regions: ["Northern", "Eastern"],
      rating: 4.9,
      pricePerDay: 70,
    },
    {
      profilePicture: "https://placehold.co/600x400",
      firstName: "Emma",
      lastName: "Smith",
      age: 26,
      gender: "female",
      language: ["English", "French"],
      regions: ["Central", "Southern"],
      rating: 4.7,
      pricePerDay: 60,
    },
    {
      profilePicture: "https://placehold.co/600x400",
      firstName: "David",
      lastName: "Johnson",
      age: 29,
      gender: "male",
      language: ["English", "German"],
      regions: ["Northern", "Western"],
      rating: 4.8,
      pricePerDay: 55,
    },
    {
      profilePicture: "https://placehold.co/600x400",
      firstName: "Olivia",
      lastName: "Brown",
      age: 32,
      gender: "female",
      language: ["English", "Italian"],
      regions: ["Central", "Eastern"],
      rating: 4.6,
      pricePerDay: 65,
    },
    {
      profilePicture: "https://placehold.co/600x400",
      firstName: "James",
      lastName: "Wilson",
      age: 27,
      gender: "male",
      language: ["English", "Spanish"],
      regions: ["Northern", "Eastern"],
      rating: 4.4,
      pricePerDay: 50,
    },
    {
      profilePicture: "https://placehold.co/600x400",
      firstName: "Sophie",
      lastName: "Lee",
      age: 29,
      gender: "female",
      language: ["English", "French"],
      regions: ["Central", "Southern"],
      rating: 4.7,
      pricePerDay: 60,
    },
    {
      profilePicture: "https://placehold.co/600x400",
      firstName: "Daniel",
      lastName: "Taylor",
      age: 32,
      gender: "male",
      language: ["English", "Chinese"],
      regions: ["Southern", "Western"],
      rating: 4.3,
      pricePerDay: 55,
    },
    {
      profilePicture: "https://placehold.co/600x400",
      firstName: "Mia",
      lastName: "Johnson",
      age: 28,
      gender: "female",
      language: ["English", "German"],
      regions: ["Northern", "Eastern"],
      rating: 4.8,
      pricePerDay: 55,
    },
    {
      profilePicture: "https://placehold.co/600x400",
      firstName: "Noah",
      lastName: "Brown",
      age: 31,
      gender: "male",
      language: ["English", "Italian"],
      regions: ["Central", "Southern"],
      rating: 4.6,
      pricePerDay: 65,
    },
    {
      profilePicture: "https://placehold.co/600x400",
      firstName: "Ava",
      lastName: "Wilson",
      age: 27,
      gender: "female",
      language: ["English", "Spanish"],
      regions: ["Northern", "Western"],
      rating: 4.4,
      pricePerDay: 50,
    },
  ];
  return (
    <div className="w-full max-w-[950px] md:py-4 py-32 flex justify-center mx-auto gap-4 border-2 border-green-500">
      {/* guides: age, sex, geological, rating, language, price */}
      <aside className="border-2 border-red-300">
        <div>
          <h4>Region</h4>
          <div className="flex">
            <input type="radio" id="northern" name="region" value="Northern" />
            <label htmlFor="northern">Northern</label>
          </div>
          <div className="flex">
            <input type="radio" id="southern" name="region" value="Southern" />
            <label htmlFor="southern">Southern</label>
          </div>
          <div className="flex">
            <input type="radio" id="central" name="region" value="Central" />
            <label htmlFor="central">Central</label>
          </div>
          <div className="flex">
            <input type="radio" id="western" name="region" value="Western" />
            <label htmlFor="western">Western</label>
          </div>
          <div className="flex">
            <input type="radio" id="eastern" name="region" value="Eastern" />
            <label htmlFor="eastern">Eastern</label>
          </div>
        </div>

        <div>
          <h4>Age</h4>
          <div className="flex">
            <input type="radio" id="young" name="age" value="Young" />
            <label htmlFor="young">18 - 24</label>
          </div>
          <div className="flex">
            <input type="radio" id="middle" name="age" value="middle" />
            <label htmlFor="middle">25-40</label>
          </div>
          <div className="flex">
            <input type="radio" id="senior" name="age" value="senior" />
            <label htmlFor="senior">41+</label>
          </div>
        </div>

        <div>
          <h4>Gender</h4>
          <div className="flex">
            <input type="radio" id="male" name="gender" value="male" />
            <label htmlFor="male">male</label>
          </div>
          <div className="flex">
            <input type="radio" id="female" name="gender" value="female" />
            <label htmlFor="female">female</label>
          </div>
          <div className="flex">
            <input type="radio" id="any" name="gender" value="any" />
            <label htmlFor="any">any</label>
          </div>
        </div>

        <div>
          <h4>Rating</h4>
          <div className="flex">
            <input
              type="radio"
              id="excellent"
              name="rating"
              value="excellent"
            />
            <label htmlFor="excellent">5 stars</label>
          </div>
          <div className="flex">
            <input type="radio" id="great" name="rating" value="great" />
            <label htmlFor="great">4 stars</label>
          </div>
          <div className="flex">
            <input type="radio" id="good" name="rating" value="good" />
            <label htmlFor="good">3 stars</label>
          </div>
        </div>

        <div>
          <h4>Language</h4>
          <div className="flex">
            <input type="radio" id="english" name="language" value="english" />
            <label htmlFor="english">English</label>
          </div>
          <div className="flex">
            <input type="radio" id="french" name="language" value="french" />
            <label htmlFor="french">French</label>
          </div>
          <div className="flex">
            <input type="radio" id="spanish" name="language" value="spanish" />
            <label htmlFor="spanish">Spanish</label>
          </div>
          <div className="flex">
            <input type="radio" id="chinese" name="language" value="chinese" />
            <label htmlFor="chinese">Chinese</label>
          </div>
          <div className="flex">
            <input
              type="radio"
              id="japanese"
              name="language"
              value="japanese"
            />
            <label htmlFor="japanese">Japanese</label>
          </div>
          <div className="flex">
            <input type="radio" id="korean" name="language" value="korean" />
            <label htmlFor="korean">Korean</label>
          </div>
        </div>
      </aside>

      <main className="w-full flex flex-col gap-4 border-2 border-blue-400">
        <div
          className="w-full h-24"
          style={{
            backgroundImage: `url("https://placehold.co/600x400?text=Hello+World")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <section className="flex gap-4">
          <div className="w-full flex flex-col gap-8 justify-between bg-white">
            <div>
              <h2 className="text-center">List of Guides</h2>
              <div className="flex justify-center gap-2 border-2 border-slate-400">
                <label htmlFor="sortby">Sort by</label>
                <div className="flex gap-1">
                  <p>Rating</p>
                  <p>Price</p>
                  <p>Most trips</p>
                </div>
                <select name="" id="">
                  <option value="rating">More to less</option>
                  <option value="price">Less to more</option>
                </select>
              </div>
            </div>
            {/* to add list of guides */}
            {guideData.map((guide, index) => (
              <article key={index} className="flex gap-4">
                <img
                  src={guide.profilePicture}
                  alt="Profile"
                  className="w-24 h-24"
                />
                <div>
                  <h3>
                    {guide.firstName} {guide.lastName}
                  </h3>
                  <p>Age: {guide.age}</p>
                  <p>Gender: {guide.gender}</p>
                  <p>Rating: {guide.rating}</p>
                  <p>Price per day: ${guide.pricePerDay}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className="border-2 border-purple-500 ">right</aside>
        </section>
      </main>
    </div>
  );
};

export default GuidePage;
