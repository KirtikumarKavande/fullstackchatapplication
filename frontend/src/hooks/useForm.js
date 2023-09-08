import React, { useState } from "react";

const useForm = () => {
  const [form, setForm] = useState();

  const onchangeFunction = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return { form, onchangeFunction };
};

export default useForm;
