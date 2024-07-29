import React from "react";
// import { createClient } from "@/utils/supabase/server";
// import { cookies } from "next/headers";
import supabase from "@/utils/supabase/supabaseClient";
import GuideCard from "@/components/guide-page/GuideCard";

const GuidePage = async () => {
  const { data: guideData } = await supabase.from("guides").select("*");
  return (
    <div className="w-full max-w-[950px] flex justify-center mx-auto gap-4 border-2 border-green-500">
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
          <div className="flex">
            <input type="radio" id="excellent" value="excellent" />
            <label htmlFor="excellent">5 stars</label>
          </div>
          <div className="flex">
            <label htmlFor="great">4 stars</label>
          </div>
          <div className="flex">
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
          <div className="w-full flex flex-col gap-8 items-center bg-white rounded-t-none rounded-lg py-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-center text-5xl font-semibold">
                Your Potential Trip Mates
              </h2>
              <div className="flex justify-center gap-2 border-2 border-slate-400">
                <label htmlFor="sortby">Sort by</label>
                <div className="flex gap-1">
                  <p>Price</p>
                  <p>Most trips</p>
                </div>
                <select name="" id="">
                  <option value="price">Less to more</option>
                </select>
              </div>
            </div>
            {/* to add list of guides */}
            <GuideCard guideData={guideData} />
          </div>

          <aside className="border-2 border-purple-500 ">right</aside>
        </section>
      </main>
    </div>
  );
};

export default GuidePage;
