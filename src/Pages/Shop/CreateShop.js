import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { validationFunctions } from "../../Utils/validations";
import ValidatedTextField from "../../components/Input/TextField";
import AuthButton from "../../components/Button/AuthButton";
import { useDispatch, useSelector } from "react-redux";
import {
  saveShopData,
  fetchStoreData,
  updateShopData,
} from "../../store/Shop/CreateShopAction";
import ImageUploader from "../../components/Input/FileSelector";
import { Button } from "@mui/material";
import "./Shop.css";

// Define form fields
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
    name: "file",
    label: "Shop Logo",
    validation: { required: "Please select a shop logo" },
    customValidation: (isRequired) => {
      return isRequired ? { required: "Please select a shop logo" } : {};
    },
    render: ({ errors, field }) => (
      <ImageUploader
        isError={Boolean(errors[field.name])}
        errorText={errors[field.name] ? errors[field.name].message : ""}
        onChange={(base64) => field.onChange(base64)}
      />
    ),
  },
];

const ShopForm = () => {
  const { control, handleSubmit, formState, setValue, reset } = useForm();
  const { errors } = formState;
  const dispatch = useDispatch();
  const { isLoading, data: shopData } = useSelector((state) => state.shop);
  const [isEditMode, setEditMode] = useState(false);

  const setFormData = useCallback(
    (formData) => {
      reset();
      Object.keys(formData).forEach((fieldName) => {
        setValue(fieldName, formData[fieldName]);
      });
    },
    [setValue, reset]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!shopData) {
          await dispatch(fetchStoreData());
        }

        if (shopData) {
          setFormData(shopData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, setValue, shopData, reset, setFormData]);

  const handleUpdate = async (data) => {
    try {
      if (shopData) {
        handleEditShop(data);
        return;
      }

      const result = await dispatch(saveShopData(data));
      if (result.success) {
        console.log("success");
      }
    } catch {}
  };

  const handleEditShop = async (data) => {
    try {
      const payload = {
        ...data,
        shop_logo_image: shopData.shop_logo_image,
      };

      delete payload.shop_draft_id;

      const result = await dispatch(updateShopData(payload));
      if (result.success) {
        setEditMode(false);
      }
    } catch {}
  };

  return shopData && !isEditMode ? (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <section className="panel">
            <div className="panel-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="pro-img-details">
                    <img
                      src={shopData.shop_logo_image}
                      alt="Product_Image"
                      className="shop_image"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <h1 className="text-start ps-0">{shopData.shop_name}</h1>
                  <p className="text-start">{shopData.shop_description}</p>
                  <div className="product-meta mt-3">
                    <span className="posted-in">
                      <h6 className="shop-title">Address:</h6>
                      <p className="shop-short-description">
                        {shopData.shop_address}
                      </p>
                    </span>
                    <span className="posted-in">
                      <h6 className="shop-title">City:</h6>{" "}
                      <p className="shop-short-description">
                        {shopData.shop_city}
                      </p>
                    </span>
                    <span className="posted-in">
                      <h6 className="shop-title">Pincode:</h6>{" "}
                      <p className="shop-short-description">
                        {shopData.shop_pincode}
                      </p>
                    </span>
                  </div>
                  <Button
                    className="btn bg-primary text-white"
                    onClick={() => {
                      setFormData(shopData);
                      setEditMode(true);
                    }}
                  >
                    Edit Shop Detail
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  ) : (
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
                  src={
                    shopData != null
                      ? shopData.shop_logo_image
                      : "https://img.freepik.com/free-vector/shop-with-sign-we-are-open_23-2148547718.jpg?w=1060&t=st=1697730923~exp=1697731523~hmac=5a155bb3c14886a7e0e618cad7f32a936aae5f572bad713bd11ebbf3a77938b6"
                  }
                  className="img-fluid"
                  alt="shop_image"
                  loading="lazy"
                />
                <div className="container mt-3">
                  <form onSubmit={handleSubmit(handleUpdate)}>
                    {fields.map((fieldData, index) => (
                      <Controller
                        key={index}
                        name={fieldData.name}
                        control={control}
                        rules={
                          fieldData.customValidation !== undefined
                            ? fieldData.customValidation(shopData === undefined)
                            : fieldData.validation
                        }
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
                    ))}
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
};

export default ShopForm;
