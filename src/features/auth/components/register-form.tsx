"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Github } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerFormSchema,
  RegisterFormSchema,
} from "@/features/auth/schema/register.schema";
import Link from "next/link";
import { useState } from "react";
import { authClient, getErrorMessage } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterForm = ({ className }: { className?: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = async (payload: RegisterFormSchema) => {
    try {
      setIsLoading(true);
      const { error } = await authClient.signUp.email({
        name: payload.name,
        email: payload.email,
        password: payload.password,
      });

      if (error?.code) {
        toast.error(getErrorMessage(error.code, "en"));
        return;
      }

      toast.success("Register successfully");
      router.push("/dashboard");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-3">
              <Field className="mb-5">
                <Button variant="outline" type="button">
                  <Github />
                  Sign Up with Github
                </Button>
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Sign Up with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card mb-5">
                Or continue with
              </FieldSeparator>
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="John doe"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="name@example.com"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="*******"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="*******"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Field>
                <Button type="submit" disabled={isLoading}>
                  Register
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/sign-in">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  );
};

export default RegisterForm;
