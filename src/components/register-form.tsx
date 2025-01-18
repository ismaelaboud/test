import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!email || !password) {
      setMessage("Email and Password are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 201) {
        setMessage("Registration successful! You can now log in.");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <p
              className={`mb-4 text-center text-sm ${
                message.startsWith("Registration successful")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
          <div className="flex flex-col items-center gap-4">
            <Button
              className="w-full bg-gray-800 text-white hover:bg-gray-900"
              onClick={() => window.location.href = "/api/auth/signin/github"}
            >
              <i className="fab fa-github mr-2"></i> GitHub
            </Button>
            <Button
              className="w-full bg-red-500 text-white hover:bg-red-600"
              onClick={() => window.location.href = "/api/auth/signin/google"}
            >
              <i className="fab fa-google mr-2"></i> Google
            </Button>
          </div>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">OR CONTINUE WITH</span>
            </div>
          </div>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@domain.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-2">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
