import TextField from "@/components/form-field/TextField";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 h-[calc(100vh-250px)]">
      <Link href="/" className="flex items-center mb-6 ">
        <img className="w-72 h-20 mr-2" src="/logo_full.svg" alt="logo" />
      </Link>
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-lg xl:p-00">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">
            Login to your account
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <TextField
              type="email"
              label="Your Email"
              placeholder="Enter Your Email"
            />
            <TextField type="password" label="Password" placeholder="*******" />
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500">
                  Remember me
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary hover:bg-muted-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-500">
              Not have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary-600 hover:underline"
              >
                Create new account here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
