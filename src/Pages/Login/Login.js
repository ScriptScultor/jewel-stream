import { Alert, Button, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import ValidatedTextField from "../../components/Input/TextField";
import { validationFunctions } from "../../Utils/validations";

import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../store/auth/LoginAction";
import AuthButton from "../../components/Button/AuthButton";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const loginData = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(
        loginUser({
          phone: data.phoneNumber,
          password: data.password,
        })
      );

      if (result.success === true) {
        return history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Sign In With Your Account
                </h5>

                <img
                  src="https://i.ibb.co/k2W6gGS/3647093.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="mb-2">
                  {loginData.error != null ? (
                    <Alert severity="error">{loginData.error}</Alert>
                  ) : null}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{
                      required: "Phone number is required",
                      validate: (value) =>
                        validationFunctions.validatePhoneNumber(value) || true,
                    }}
                    render={({ field }) => (
                      <ValidatedTextField
                        label="Phone Number"
                        value={field.value}
                        isError={!!errors.phoneNumber}
                        errorText={errors.phoneNumber?.message}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is required",
                      validate: (value) =>
                        validationFunctions.validatePassword(value) || true,
                    }}
                    render={({ field }) => (
                      <ValidatedTextField
                        label="Password"
                        type="password"
                        value={field.value}
                        isError={!!errors.password}
                        errorText={errors.password?.message}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                      />
                    )}
                  />

                  <div className="d-grid my-2">
                    <AuthButton
                      title="Login"
                      isLoading={loginData.isLoading}
                      onClick={handleSubmit(onSubmit)}
                    />
                    <br className="my-3" />
                    <NavLink
                      style={{ textDecoration: "none" }}
                      to="/registration"
                    >
                      <Button variant="text">
                        Haven't Account? Please Registration
                      </Button>
                    </NavLink>
                    <NavLink style={{ textDecoration: "none" }} to="/">
                      <Button variant="text">Skip to home</Button>
                    </NavLink>

                    <hr className="my-4" />
                    {/* <Button
                      onClick={handleClick}
                      variant="contained"
                      color="warning"
                    >
                      Google Login
                    </Button> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom", // Change this to "top" to make it float down from the top
          horizontal: "center",
        }}
      >
        <Alert onClose={handleClose} severity="error">
          Coming soon!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
