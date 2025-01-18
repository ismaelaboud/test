import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { LogIn, Github } from "lucide-react"; // Import Lucide-React icons
import { signIn } from "next-auth/react";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-md bg-white">
        <CardHeader>
          <h1 className="text-center text-2xl font-semibold">Sign In</h1>
          <p className="text-center text-gray-600">Access your account</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Google Sign-In Button */}
            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-2"
              onClick={() => signIn("google")}
            >
              <LogIn className="w-5 h-5" />
              <span>Sign in with Google</span>
            </Button>

            {/* GitHub Sign-In Button */}
            <Button
              variant="default"
              className="w-full flex items-center justify-center space-x-2"
              onClick={() => signIn("github")}
            >
              <Github className="w-5 h-5" />
              <span>Sign in with GitHub</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
