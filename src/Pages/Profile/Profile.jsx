import React, { useState, useContext, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import { authContext } from "../../Contexts/AuthContext";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { userId } = useContext(authContext);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/users/${userId}`
        );
        setUserData(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  console.log(userData);

  // Validation Schema
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
    email: yup.string().email().required("Email is required"),
    phone: yup.string().required("Phone number is required"),
  });

  // Formik Setup
  const formik = useFormik({
    enableReinitialize: true, // Allows updating initial values dynamically
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setErrMsg("");
        setIsLoading(true);

        // Only send fields that have changed
        const updatedValues = Object.keys(values).reduce((acc, key) => {
          if (values[key] !== userData[key]) {
            acc[key] = values[key];
          }
          return acc;
        }, {});

        if (Object.keys(updatedValues).length === 0) {
          setErrMsg("No changes detected.");
          setIsLoading(false);
          return;
        }

        await axios.put(
          "https://ecommerce.routemisr.com/api/v1/users/updateMe",
          updatedValues,
          {
            headers:{
                token:localStorage.getItem('token')
            }
          }
        
        );

        navigate("/"); // Redirect after update
      } catch (error) {
        setErrMsg(error.response?.data?.message || "An error occurred.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="my-10">
      <form onSubmit={formik.handleSubmit}>
        <div className="w-2/3 mx-auto grid grid-cols-2 gap-4">
          <Input
            isInvalid={formik.errors.name && formik.touched.name}
            errorMessage={formik.errors.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
            variant="bordered"
            className="col-span-2"
            label="Name"
            type="text"
          />
          <Input
            isInvalid={formik.errors.email && formik.touched.email}
            errorMessage={formik.errors.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            variant="bordered"
            className="col-span-2"
            label="Email"
            type="email"
          />
          <Input
            isInvalid={formik.errors.phone && formik.touched.phone}
            errorMessage={formik.errors.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            name="phone"
            variant="bordered"
            className="col-span-2"
            label="Phone"
            type="tel"
          />
          <Button
            isLoading={isLoading}
            type="submit"
            className="col-span-2"
            color="primary"
          >
            Edit
          </Button>
          {errMsg && <p className="text-red-500">{errMsg}</p>}
        </div>
      </form>
    </div>
  );
}
