import Link from "next/link";
import { Button } from '@/components/ui/button';
import { GraduationCap } from "lucide-react";
import UserProfile from "@/components/user-profile";

const Hero = () => {
    return (
        <div>
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-primary/5">
            <UserProfile />
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
                            Transform Your Future with Online Learning
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Access world-class education from anywhere. Learn at your own pace
                            with our comprehensive course library.
                        </p>
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                            <Button asChild size="lg" className="rounded-full">
                                <Link href="/courses" className="flex items-center space-x-2">
                                    <GraduationCap className="h-5 w-5" />
                                    <span>Start Learning</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Hero;