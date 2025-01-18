import FeaturedCourse from "@/components/homepage/featured-course";
import Hero from "@/components/homepage/hero";

export default function Home() {
  return (
   <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedCourse />
   </div>
  );
}
