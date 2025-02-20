 
import { useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

export default function Payment() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null);

  const initialValues = {
    details: "",
    city: "",
    phone: "",
  };

  const validationSchema = yup.object({
    details: yup.string().optional(),
    city: yup.string().required(),
    phone: yup.string().required(),
  });

  const cashPayment = async (values) => {
    setErrMsg("");
    setIsLoading(true);
    try {
      await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
        { shippingAddress: values },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Order placed successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/orders");
    } catch (err) {
      console.log(err);
      setErrMsg(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const onlinePayment = async (values) => {
    setErrMsg("");
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:5173`,
        { shippingAddress: values },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("onSubmit2", data);
      if (data.status == "success") {
        window.open(data.session.url);
      }
    } catch (err) {
      console.log(err);
      setErrMsg(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (paymentMethod === "cash") {
        cashPayment(values);
      } else if (paymentMethod === "online") {
        onlinePayment(values);
      }
    },
  });

  return (
    <div className="my-10">
      <form onSubmit={formik.handleSubmit}>
        <div className="w-2/3 mx-auto grid grid-cols-2 gap-4">
          <Input
            isInvalid={formik.errors.details && formik.touched.details}
            errorMessage={formik.errors.details}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.details}
            name="details"
            variant="bordered"
            className="col-span-2"
            label="Details"
            type="text"
          />
          <Input
            isInvalid={formik.errors.city && formik.touched.city}
            errorMessage={formik.errors.city}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.city}
            name="city"
            variant="bordered"
            className="col-span-2"
            label="City"
            type="text"
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

          <div className="flex gap-4 justify-between">
            <Button
              isLoading={isLoading}
              type="submit"
              color="primary"
              onClick={() => setPaymentMethod("cash")}
            >
              Cash Payment
            </Button>
            <Button
              isLoading={isLoading}
              type="submit"
              color="primary"
              onClick={() => setPaymentMethod("online")}
            >
              Online Payment
            </Button>
          </div>

          {errMsg && <p className="text-red-500">{errMsg}</p>}
        </div>
      </form>
    </div>
  );
}
