import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { validationFunctions } from "../../Utils/validations";
import ValidatedSelect from "../../components/Input/Dropdown";
import ValidatedTextField from "../../components/Input/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/auth/LoginAction";
import AuthButton from "../../components/Button/AuthButton";
import { fetchUserCategories } from "../../store/auth/UserCategory";
import { Alert, CircularProgress } from "@mui/material";

const Registration = () => {
  const { control, handleSubmit, formState, clearErrors, getValues } =
    useForm();

  const authData = useSelector((state) => state.auth);
  const categoryData = useSelector((state) => state.userCategory);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(registerUser(data));

      if (res.success) {
        history.replace("/");
      }
    } catch (error) {}
  };

  useEffect(() => dispatch(fetchUserCategories()), [dispatch]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Create a new Account
                </h5>
                <img
                  src="https://i.ibb.co/k2W6gGS/3647093.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="mb-2">
                  {authData.error != null ? (
                    <Alert severity="error">{authData.error}</Alert>
                  ) : null}
                </div>
                {categoryData.isLoading === true ? (
                  <CircularProgress />
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                      name="fullName"
                      control={control}
                      rules={{
                        required: "Full name is required",
                        validate: (value) => {
                          return (
                            validationFunctions.validateFullName(value) || true
                          );
                        },
                      }}
                      render={({ field }) => (
                        <ValidatedTextField
                          label="Full Name"
                          value={field.value}
                          isError={Boolean(formState.errors.fullName)}
                          errorText={formState.errors.fullName?.message}
                          onChange={(value) => {
                            field.onChange(value);
                            clearErrors("fullName");
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required",
                        validate: (value) => {
                          return (
                            validationFunctions.validateEmail(value) || true
                          );
                        },
                      }}
                      render={({ field }) => (
                        <ValidatedTextField
                          label="Email"
                          value={field.value}
                          isError={Boolean(formState.errors.email)}
                          errorText={formState.errors.email?.message}
                          onChange={(value) => {
                            field.onChange(value);
                            clearErrors("email");
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="phoneNumber"
                      control={control}
                      rules={{
                        required: "Phone number is required",
                        validate: (value) => {
                          return (
                            validationFunctions.validatePhoneNumber(value) ||
                            true
                          );
                        },
                      }}
                      render={({ field }) => (
                        <ValidatedTextField
                          label="Phone Number"
                          value={field.value}
                          isError={Boolean(formState.errors.phoneNumber)}
                          errorText={formState.errors.phoneNumber?.message}
                          onChange={(value) => {
                            field.onChange(value);
                            clearErrors("phoneNumber");
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: "Password is required",
                        validate: (value) => {
                          return (
                            validationFunctions.validatePassword(value) || true
                          );
                        },
                      }}
                      render={({ field }) => (
                        <ValidatedTextField
                          label="Password"
                          type="password"
                          value={field.value}
                          isError={Boolean(formState.errors.password)}
                          errorText={formState.errors.password?.message}
                          onChange={(value) => {
                            field.onChange(value);
                            clearErrors("password");
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="category"
                      control={control}
                      rules={{
                        required: "Category is required",
                      }}
                      render={({ field }) => (
                        <ValidatedSelect
                          label="Category"
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                            clearErrors("category");
                          }}
                          isError={Boolean(formState.errors.category)}
                          errorText={formState.errors.category?.message}
                          options={categoryData.data.map((category) => ({
                            value: category.id,
                            label: category.user_category,
                          }))}
                        />
                      )}
                    />
                    {[1, 2].some((item) => getValues().category === item) ? (
                      <Controller
                        name="gstNumber"
                        control={control}
                        rules={{
                          required: "GST number is required",
                          validate: (value) => {
                            return (
                              validationFunctions.validateGstNumber(value) ||
                              true
                            );
                          },
                        }}
                        render={({ field }) => (
                          <ValidatedTextField
                            label="GST Number"
                            value={field.value}
                            isError={Boolean(formState.errors.gstNumber)}
                            errorText={formState.errors.gstNumber?.message}
                            onChange={(value) => {
                              field.onChange(value);
                              clearErrors("gstNumber");
                            }}
                          />
                        )}
                      />
                    ) : null}

                    <div className="d-grid mt-4">
                      <AuthButton
                        title="REGISTRATION"
                        isLoading={authData.isLoading}
                        onClick={handleSubmit(onSubmit)}
                      />
                      <hr className="my-4" />
                      <NavLink style={{ textDecoration: "none" }} to="/login">
                        <Button variant="text">
                          Already Registered? Please Login
                        </Button>
                      </NavLink>
                      <NavLink style={{ textDecoration: "none" }} to="/">
                        <Button variant="text">Skip to home</Button>
                      </NavLink>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
