import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast"; // Import toast for notifications

// Define the type for form data
type LoginForm = {
  aadhar: string;
  name: string;
};

const BorrowerLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({ aadhar: "", name: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/borrowers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Invalid Aadhar or Name");
      }

      const responseData = await response.json();

      // Show success toast notification
      toast({
        title: "Login Successful!",
        description: "Redirecting to dashboard...",
        variant: "default",
      });

      // Store user details in localStorage
      localStorage.setItem("user", JSON.stringify({ ...responseData.data, userType: "borrower" }));

      // Redirect to dashboard after a short delay
      setTimeout(() => navigate("/borrower/dashboard"), 1500);
    } catch (error) {
      console.error("Login failed:", error);

      // Show error toast notification
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Something went wrong!",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Borrower Login</h2>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          {/* Aadhar Number Input */}
          <div>
            <label htmlFor="aadhar" className="block text-sm font-medium text-gray-700">Aadhar Number</label>
            <input
              type="text"
              id="aadhar"
              name="aadhar"
              value={formData.aadhar}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter your Aadhar number"
            />
          </div>

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter your full name"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BorrowerLogin;
