import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

// Define the form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  aadhar: z
    .string()
    .length(12, { message: 'Aadhar number must be 12 digits' })
    .regex(/^\d+$/, { message: 'Aadhar must contain only numbers' }),
  pan: z
    .string()
    .length(10, { message: 'PAN number must be 10 characters' })
    .regex(/^[A-Z0-9]+$/, { message: 'PAN must be alphanumeric and uppercase' }),
  profession: z.string().min(2, { message: 'Please enter your profession' }),
});

type FormValues = z.infer<typeof formSchema>;

interface SignupFormProps {
  userType: 'borrower' | 'lender';
  onSubmit: (data: FormValues) => void;
  isSubmitting?: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({
  userType,
  onSubmit,
  isSubmitting = false,
}) => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      aadhar: '',
      pan: '',
      profession: '',
    },
  });

  // Handle photo upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);

      // Create a preview of the uploaded photo
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit handler
  const handleSubmit = async (data: FormValues) => {
    /*if (!photo) {
      alert('Please upload a photo');
      return;
    }*/

    try {
      //const photoUrl = await uploadUserPhoto(photo);

      const userData = {
        ...data,
        //photoUrl,
        userType,
        createdAt: new Date().toISOString(),
      };

      await createUserProfile(userData);
      onSubmit(data);

      alert(`Successfully registered as ${userType}!`);
      navigate(`/${userType}/dashboard`);
    } catch (error) {
      console.error('Registration failed:', error);
      alert(
        `Registration failed: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  };

  /*

  // Helper function to upload user photo
  const uploadUserPhoto = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          `https://storage.example.com/user-photos/${Date.now()}-${file.name}`
        );
      }, 1000);
    });
  };
*/
  // Helper function to create user profile in database
  const createUserProfile = async (userData: any): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('User profile created:', userData);
        resolve();
      }, 1000);
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">
          Sign Up as {userType === 'borrower' ? 'Borrower' : 'Lender'}
        </CardTitle>
        <CardDescription>
          Enter your basic information to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aadhar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aadhar Number</FormLabel>
                  <FormControl>
                    <Input placeholder="12-digit Aadhar number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PAN Number</FormLabel>
                  <FormControl>
                    <Input placeholder="10-character PAN number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your profession" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



            <Button type="submit" className="w-full">
              Continue to Google Authentication
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <a href="#" className="text-primary hover:underline">
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
