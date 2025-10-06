import React, { useContext, useState } from "react";
import useForm from "../hooks/useForm";
import { SIGNIN_BACKGROUND_IMAGE, BASE_URL } from "../utilites/constant";
import FetchData from "../utilites/functions/FetchData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import User from "../store/user";

const Form = () => {
  const user = useContext(User);
  console.log("ctx", user);
  const navigate = useNavigate();

  const { form, onchangeFunction } = useForm();
  const [isSignupForm, setIsSignupForm] = useState(true);

  const formSubmit = async (e) => {
    e.preventDefault();

    const data = await FetchData(
      `${BASE_URL}/${isSignupForm ? "signup" : "signin"} `,
      form,
      "POST"
    );
    if (data.statusCode === 200) {
      console.log("sign in user ", data);
      if (data?.data?.length && "name" in data.data[0]) {
        localStorage.setItem("name", data.data[0].name);
        localStorage.setItem("userId", data.data[0].id);

      }
      toast.success(
        `${isSignupForm ? "signup successful plz signIn " : "signin successful"
        } `
      );
      localStorage.setItem("token", data.token);
      if (!isSignupForm) {
        navigate("/chat");
      }
      localStorage.setItem("email", form.email);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div>
        <img
          className="h-screen w-screen"
          src={SIGNIN_BACKGROUND_IMAGE}
          alt="bg"
        />
      </div>
      <div className="absolute top-0  my-6">
        <div>
          <section className="bg-gray-50 dark:bg-gray-900">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                <form className="space-y-4 md:space-y-6">
                  {isSignupForm && (
                    <div>
                      <label
                        for="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Kirtikumar"
                        onChange={onchangeFunction}
                      />
                    </div>
                  )}
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      onChange={onchangeFunction}
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={onchangeFunction}
                    />
                  </div>

                  <button
                    onClick={formSubmit}
                    className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-24 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {isSignupForm
                      ? "  Create an account"
                      : "Sign in to account"}
                  </button>
                </form>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setIsSignupForm(!isSignupForm);
                    }}
                  >
                    {!isSignupForm ? "signup" : "signin"}
                  </button>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Form;
