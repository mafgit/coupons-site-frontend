"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useStore from "@/hooks/useStore";
import AuthWrapper from "@/utils/AuthWrapper";
import Link from "next/link";

type IErrors = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  global: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<IErrors>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    global: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const setUser = useStore((state) => state.setUser);
  // const loading = useStore((state) => state.loading);
  // const authenticated = useStore((state) => state.authenticated);
  // const fetchUser = useStore((state) => state.fetchUser);

  // useEffect(() => {
  //   fetchUser().then(() => {

  //     if (!loading && authenticated) {
  //       // router.replace("/");
  //     }
  //   });
  // }, [loading, authenticated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isError = false;

    if (isSignup && !name) {
      isError = true;
      setErrors((errors: IErrors) => ({
        ...errors,
        name: "Name is required",
      }));
    }

    if (!email) {
      isError = true;
      setErrors((errors: IErrors) => ({
        ...errors,
        email: "Email is required",
      }));
    }

    if (!password) {
      isError = true;
      setErrors((errors: IErrors) => ({
        ...errors,
        password: "Password is required",
      }));
    }

    if (isSignup && password !== confirmPassword) {
      isError = true;
      setErrors((errors: IErrors) => ({
        ...errors,
        confirmPassword: "Passwords do not match",
      }));
    }

    if (password.length < 6) {
      isError = true;
      setErrors((errors: IErrors) => ({
        ...errors,
        password: "Password must be at least 6 characters long",
      }));
    }

    if (!email.includes("@") || !email.includes(".") || email.length < 5) {
      isError = true;
      setErrors((errors: IErrors) => ({
        ...errors,
        email: "Invalid email",
      }));
    }

    if ((isSignup && name.length < 3) || name.trim() !== name) {
      isError = true;
      setErrors((errors: IErrors) => ({
        ...errors,
        name: "Name must be at least 3 characters long",
      }));
    }

    if (!isError)
      fetch(`http://localhost:5000/api/auth/${isSignup ? "signup" : "login"}`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      })
        .then(async (res) => {
          const data = await res.json();
          console.log(data);

          if (!res.ok) {
            throw data;
          }

          setUser({
            userId: data.userId,
            role: data.role,
            loading: false,
            authenticated: true,
            hasFetched: true,
          });
          router.replace("/");
        })
        .catch((err: any) => {
          console.log("AAAAAAAAAAAa", err);

          setErrors((errors: IErrors) => ({
            ...errors,
            global: err.error ?? err.message ?? "Something went wrong",
          }));
        });
  };

  useEffect(() => {
    setErrors({
      ...errors,
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      global: "",
    });
  }, [email, password, confirmPassword, name, isSignup]);

  // if (loading) return <div>Loading...</div>;
  return (
    <AuthWrapper requiredRole="unauthorized">
      "
      <div className="flex flex-col items-center justify-center">
        <form
          className="flex flex-col my-8 gap-4 max-w-[300px] w-[95%] bg-gray-200 p-8 rounded-xl mx-auto"
          onSubmit={handleSubmit}
        >
          <h1 className="text-xl text-center">
            {isSignup ? "Signup" : "Login"}
          </h1>

          {isSignup && (
            <div className="flex flex-col gap-2 items-start justify-center">
              <label className="text-sm">Fullname</label>
              <input
                className="px-2 py-2 bg-gray-50 text-gray-900 rounded-lg border-none outline-primary text-sm w-full"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Lorem ipsum"
              />
              {errors.name && (
                <p className="text-xs text-red-600">{errors.name}</p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2 items-start justify-center">
            <label className="text-sm">Email</label>
            <input
              className="px-2 py-2 bg-gray-50 text-gray-900 rounded-lg border-none outline-primary text-sm w-full"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Lorem ipsum"
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 items-start justify-center">
            <label className="text-sm">Password</label>
            <input
              className="px-2 py-2 bg-gray-50 text-gray-900 rounded-lg border-none outline-primary text-sm w-full"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Lorem ipsum"
            />
            {errors.password && (
              <p className="text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          {isSignup && (
            <div className="flex flex-col gap-2 items-start justify-center">
              <label className="text-sm">Confirm Password</label>
              <input
                className="px-2 py-2 bg-gray-50 text-gray-900 rounded-lg border-none outline-primary text-sm w-full"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Lorem ipsum"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {errors.global && (
            <p className="text-xs text-red-600">{errors.global}</p>
          )}

          <button
            type="submit"
            className="mt-2 p-2 bg-primary rounded-lg w-full text-white text-sm"
          >
            {isSignup ? "Signup" : "Login"}
          </button>

          {isSignup ? (
            <p className="text-center text-sm">
              Already signed up?{" "}
              <button
                type="button"
                onClick={() => setIsSignup(false)}
                className="text-blue-700"
              >
                Login
              </button>
            </p>
          ) : (
            <p className="text-center text-sm">
              Wanna sign up?{" "}
              <button
                type="button"
                onClick={() => setIsSignup(true)}
                className="text-blue-700"
              >
                Signup
              </button>
            </p>
          )}
        </form>
      </div>{" "}
    </AuthWrapper>
  );
};

export default LoginPage;
