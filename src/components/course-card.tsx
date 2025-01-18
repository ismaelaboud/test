import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  progress?: number;
  instructor: string;
  category: string;
}

export function CourseCard({
  id,
  title,
  description,
  image,
  progress,
  instructor,
  category,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{category}</p>
          {progress !== undefined && (
            <Progress value={progress} className="w-20" />
          )}
        </div>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <p className="text-sm mt-2">Instructor: {instructor}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/courses/${id}`}>
            {progress !== undefined ? "Continue Learning" : "Start Learning"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}