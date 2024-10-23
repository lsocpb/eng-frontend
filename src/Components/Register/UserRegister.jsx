import React from "react";
import { useForm } from "react-hook-form";
import {
  MDBBtn,
  MDBContainer,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import {
  showSuccessToast,
  showErrorToast,
} from "../ToastNotifications/ToastNotifications";
import { BASE_API_URL } from "../../api/config";
import axios from "axios";
import withAuthRedirect from "../AuthRedirect/withAuthRedirect";

/**
 * Functional component for user registration
 * @returns {JSX.Element} User registration form
 */
function UserRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /**
   * Function to handle form submission
   * @param {Object} data - Form data
   */
  const onSubmit = async (data) => {
    const payload = {
      account_details: {
        username: data.username,
        password: data.password,
        email: data.email,
      },
      billing_details: {
        first_name: data.firstName,
        last_name: data.lastName,
        address: data.address,
        postal_code: data.zip,
        city: data.city,
        state: data.state,
        country: data.country,
        phone_number: data.phone,
      },
    };

    try {
      const response = await axios.post(
        `${BASE_API_URL}/auth/register/personal`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      showSuccessToast(response.data.message);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      const message = error.response.detail?.msg;
      showErrorToast(message);
    }
  };

  return (
    <MDBContainer className="overflow-hidden my-5">
      <MDBCol>
        <MDBCardBody className="d-flex flex-column text-center">
          <h2 className="fw-bold text-danger mb-5">
            Personal Account Registration
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <MDBRow className="mb-4">
              <MDBCol md="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Username"
                  id="username"
                  type="text"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <p className="text-danger">{errors.username.message}</p>
                )}

                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </MDBCol>
              <MDBCol md="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="First Name"
                  id="firstName"
                  type="text"
                  {...register("firstName", {
                    required: "firstName is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-danger">{errors.firstName.message}</p>
                )}

                <MDBInput
                  wrapperClass="mb-4"
                  label="Last Name"
                  id="lastName"
                  type="text"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-danger">{errors.lastName.message}</p>
                )}

                <MDBInput
                  wrapperClass="mb-4"
                  label="Phone"
                  id="phone"
                  type="text"
                  {...register("phone", { required: "Phone is required" })}
                />
                {errors.phone && (
                  <p className="text-danger">{errors.phone.message}</p>
                )}
              </MDBCol>
            </MDBRow>

            <MDBRow className="mb-4">
              <p className="text-muted font-weight-bold">
                Note: this will be your billing details
              </p>
              <MDBCol md="4">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Address"
                  id="address"
                  type="text"
                  {...register("address", { required: "Address is required" })}
                />
                {errors.address && (
                  <p className="text-danger">{errors.address.message}</p>
                )}
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Postal Code"
                  id="postalCode"
                  type="text"
                  {...register("postalCode", {
                    required: "Postal Code is required",
                  })}
                />
                {errors.postalCode && (
                  <p className="text-danger">{errors.postalCode.message}</p>
                )}
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  wrapperClass="mb-4"
                  label="City"
                  id="city"
                  type="text"
                  {...register("city", { required: "City is required" })}
                />
                {errors.city && (
                  <p className="text-danger">{errors.city.message}</p>
                )}
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  wrapperClass="mb-4"
                  label="State"
                  id="state"
                  type="text"
                  {...register("state", { required: "State is required" })}
                />
                {errors.state && (
                  <p className="text-danger">{errors.state.message}</p>
                )}
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Country"
                  id="country"
                  type="text"
                  {...register("country", { required: "Country is required" })}
                />
                {errors.country && (
                  <p className="text-danger">{errors.country.message}</p>
                )}
              </MDBCol>
            </MDBRow>

            <div className="d-flex justify-content-center">
              <MDBBtn className="w-50 mt-3 btn-danger" size="md" type="submit">
                Register Account
              </MDBBtn>
            </div>
          </form>
          <div className="text-center mt-3">
            <p>or sign up with:</p>
            <MDBBtn tag="a" color="none" className="mx-3">
              <MDBIcon fab icon="facebook-f" size="sm" />
            </MDBBtn>
            <MDBBtn tag="a" color="none" className="mx-3">
              <MDBIcon fab icon="google" size="sm" />
            </MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCol>
    </MDBContainer>
  );
}

export default withAuthRedirect(UserRegister);
