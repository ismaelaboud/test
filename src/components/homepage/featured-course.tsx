import { CourseCard } from "../course-card";
import { Button } from "../ui/button";
import Link from "next/link";


const FeaturedCourse = () => {
    const featuredCourses = [
        {
          id: "1",
          title: "Web Development Fundamentals",
          description: "Learn the basics of web development with HTML, CSS, and JavaScript",
          image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60",
          instructor: "John Doe",
          category: "Programming"
        },
        {
          id: "2",
          title: "Data Science Essentials",
          description: "Master the fundamentals of data science and analytics",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
          instructor: "Jane Smith",
          category: "Data Science"
        },
        {
          id: "3",
          title: "Digital Marketing Masterclass",
          description: "Complete guide to modern digital marketing strategies",
          image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&auto=format&fit=crop&q=60",
          instructor: "Mike Johnson",
          category: "Marketing"
        }
      ];
    return ( 
        <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Featured Courses
            </h2>
            <p className="mt-3 text-xl text-muted-foreground">
              Explore our most popular courses and start learning today.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section>
     );
}
 
export default FeaturedCourse;