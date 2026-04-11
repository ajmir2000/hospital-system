import Image from "next/image";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Categories from "./components/Categories";
// import TopDoctors from "./components/TopDoctors";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <Stats />
        <Categories />
        {/* <TopDoctors /> */}
      </main>
    </div>
  );
}
