import React from "react";
import { Controller, useForm } from "react-hook-form";
import { validationFunctions } from "../../Utils/validations";
import ValidatedTextField from "../../components/Input/TextField"; // Import your ValidatedTextField component
import AuthButton from "../../components/Button/AuthButton"; // Import your ValidatedTextField component
import { useDispatch, useSelector } from "react-redux";
import { saveShopData } from "../../store/Shop/CreateShopAction";
import ImageUploader from "../../components/Input/FileSelector";

const fields = [
  {
    name: "shop_name",
    label: "Shop Name",
    validation: { required: "Shop Name is required" },
  },
  {
    name: "shop_address",
    label: "Shop Address",
    validation: { required: "Shop Address is required" },
  },
  {
    name: "shop_city",
    label: "City",
    validation: { required: "City is required" },
  },
  {
    name: "shop_pincode",
    label: "Pincode",
    validation: {
      required: "Pincode is required",
      validate: (value) => validationFunctions.validatePincode(value) || true,
    },
  },
  {
    name: "shop_description",
    label: "Shop Description",
    validation: { required: "Shop Description is required" },
  },
  {
    name: "shop_logo_image",
    label: "Shop Logo",
    validation: { required: "Please select a shop logo" },
    render: ({ errors, field }) => (
      <ImageUploader
        isError={Boolean(errors[field.name])}
        errorText={errors[field.name] ? errors[field.name].message : ""}
        onChange={(base64) => field.onChange(base64)}
        value={field.value}
      />
    ),
  },
];

export default function ShopForm() {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      shop_name: "MyShop",
      shop_address: "123 Main Street",
      shop_city: "Sample City",
      shop_pincode: "12345",
      shop_description: "This is a sample shop description.",
    },
  });
  const { errors } = formState;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.shop);

  const handleUpdate = async (data) => {
    try {
      const result = await dispatch(saveShopData(data));
      if (result.success) {
        console.log("success");
      }
    } catch {}
  };

  return (
    <center>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-9 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Update Business Details
                </h5>
                <img
                  src="https://img.freepik.com/free-vector/shop-with-sign-we-are-open_23-2148547718.jpg?w=1060&t=st=1697730923~exp=1697731523~hmac=5a155bb3c14886a7e0e618cad7f32a936aae5f572bad713bd11ebbf3a77938b6"
                  className="img-fluid"
                  alt=""
                />
                <div className="container">
                  <form onSubmit={handleSubmit(handleUpdate)}>
                    {fields.map((fieldData, index) => {
                      return (
                        <Controller
                          key={index}
                          name={fieldData.name}
                          control={control}
                          rules={fieldData.validation}
                          render={({ field }) =>
                            fieldData.render !== undefined ? (
                              fieldData.render({ errors, field })
                            ) : (
                              <ValidatedTextField
                                label={fieldData.label}
                                value={field.value}
                                onChange={field.onChange}
                                isError={Boolean(errors[field.name])}
                                errorText={
                                  errors[field.name]
                                    ? errors[field.name].message
                                    : ""
                                }
                              />
                            )
                          }
                        />
                      );
                    })}
                    <AuthButton
                      title={"Save"}
                      isLoading={isLoading}
                      onClick={() => handleSubmit(handleUpdate)()}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </center>
  );
}
