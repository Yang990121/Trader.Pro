import { useState } from "react";
import Joi from "@hapi/joi";
  import isEmpty from "../utils/isEmpty";

  function useForm({ initialValues, validationSchema, doSubmit }) {
    const [values, setValues] = useState(initialValues || {});
    const [errors, setErrors] = useState({});

    // Validate all fields
    const validate = () => {
      const schema = Joi.object(validationSchema);
    const options = { abortEarly: false, stripUnknown: true };
    const { error } = schema.validate(values, options);
    const errors = {};

    if (!error) return null;

    for (let item of error.details) {
      if (!errors[item.path[0]]) errors[item.path[0]] = item.message;
    }
    return errors;
  };

  // Validate specific field
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: validationSchema[name] });
    const { error } = schema.validate(obj, { stripUnknown: true });
    console.log(error && error.details[0].message);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validationSchema) {
      const errors = validate();
      setErrors(errors || {});
      if (!isEmpty(errors)) return;
    }

    doSubmit();
  };

  const handleChange = ({ currentTarget: input }) => {
    setValues({
      ...values,
      [input.name]: input.value,
    });
  };

  const handleBlur = ({ currentTarget: input }) => {
    const validationErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) validationErrors[input.name] = errorMessage;
    else delete validationErrors[input.name];

    setValues({ ...values, [input.name]: input.value });
    setErrors(validationErrors);
  };

  const handleFocus = ({ currentTarget: input }) => {
    const validationErrors = { ...errors };
    delete validationErrors[input.name];
    setErrors(validationErrors);
  };

  return {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    handleFocus,
  };
}

export default useForm;
