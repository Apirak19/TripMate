import Drawer from "@/components/navigation/Drawer";
import NavigationBar from "@/components/navigation/NavigationBar";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const Home = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: tags } = await supabase.from("tags").select();

  console.log(tags);
  return (
    <>
      {/* <NavigationBar /> */}
      {tags.map((item) => {
        return <p className="text-white">{item.name}</p>;
      })}
    </>
  );
};

export default Home;
