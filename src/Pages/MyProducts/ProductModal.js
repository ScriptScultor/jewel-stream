import React, { useState } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import ValidatedSelect from "../../components/Input/Dropdown";
import ValidatedTextField from "../../components/Input/TextField";
import Modal from "../../components/Dialog/Dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  editProduct,
  fetchProducts,
} from "../../store/MyProducts/MyProductsAction";
import AuthButton from "../../components/Button/AuthButton";
import CustomImageUploader from "../../components/Input/FileSelector";

export default function ProductModal({ show, handleClose, product }) {
  const { control, handleSubmit, formState, clearErrors, setValue } = useForm();
  const { actionLoader } = useSelector((state) => state.myproduct);
  const { categories } = useSelector((state) => state.categories);
  const [subCategory, setSubCategory] = useState([]);
  const dispatch = useDispatch();

  const handleUpdate = async (data) => {
    // Perform the update action using formData
    try {
      let result;
      if (product?.product_name !== undefined) {
        result = await dispatch(editProduct(data));
      } else {
        result = await dispatch(addProduct(data));
      }
      if (result.success) {
        dispatch(fetchProducts(0, 30));
        //close the modal
        handleClose();
      }
    } catch (e) {}
  };

  React.useEffect(() => {
    if (product?.product_name !== undefined) {
      // Prefill the form data
      for (const key of Object.keys(product)) {
        setValue(key, !product[key] ? "" : product[key]);
      }
    }
  }, [product, setValue, show]);

  const modalClose = () => {
    if (actionLoader) {
      return;
    }

    handleClose();
  };

  const onCategoryChange = (category) => {
    const data = categories.filter((ele) => ele.main_category === category);
    setSubCategory(data[0].sub_categories);
  };

  const getImage = (index) => {
    if (product?.product_images === undefined) {
      return null;
    }

    const image = product.product_images.split("_KEY_1_")[index];
    return image ?? null;
  };

  const fileRules =
    product?.product_name === undefined
      ? { required: "Product image is required" }
      : {};

  const isNew = product?.product_name === undefined;
  return (
    <Modal show={show} handleClose={modalClose}>
      <DialogTitle>Update Product</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>Update product details:</DialogContentText>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <Controller
            name="product_name"
            control={control}
            rules={{
              required: "Product Name is required",
            }}
            render={({ field }) => (
              <ValidatedTextField
                label="Product Name"
                value={field.value}
                isError={Boolean(formState.errors.product_name)}
                errorText={formState.errors.product_name?.message}
                onChange={(value) => {
                  field.onChange(value);
                  clearErrors("product_name");
                }}
              />
            )}
          />
          <Controller
            name="product_category"
            control={control}
            rules={{
              required: "Product Category is required",
            }}
            render={({ field }) => (
              <ValidatedSelect
                label="Product Category"
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  clearErrors("product_category");
                  onCategoryChange(value);
                }}
                isError={Boolean(formState.errors.product_category)}
                errorText={formState.errors.product_category?.message}
                options={categories.map((categroy) => {
                  return {
                    value: categroy.main_category,
                    label: categroy.main_category,
                  };
                })}
              />
            )}
          />
          <Controller
            name="product_sub_category"
            control={control}
            rules={{
              required: "Product Sub Category is required",
            }}
            render={({ field }) => (
              <ValidatedSelect
                label="Product Sub Category"
                value={field.value}
                isError={Boolean(formState.errors.product_sub_category)}
                errorText={formState.errors.product_sub_category?.message}
                onChange={(value) => {
                  field.onChange(value);
                  clearErrors("product_sub_category");
                }}
                options={subCategory.map((ele) => ({ value: ele, label: ele }))}
                isDisabled={subCategory.length === 0}
              />
            )}
          />
          <Controller
            name="product_base_price"
            control={control}
            rules={{
              required: "Base Price is required",
            }}
            render={({ field }) => (
              <ValidatedTextField
                label="Base Price"
                type="number"
                value={field.value}
                isError={Boolean(formState.errors.product_base_price)}
                errorText={formState.errors.product_base_price?.message}
                onChange={(value) => {
                  field.onChange(value);
                  clearErrors("product_base_price");
                }}
              />
            )}
          />
          <Controller
            name="product_discount"
            control={control}
            rules={{
              required: "Product Discount is required",
            }}
            render={({ field }) => (
              <ValidatedTextField
                label="Product Discount"
                type="number"
                value={field.value}
                isError={Boolean(formState.errors.product_discount)}
                errorText={formState.errors.product_discount?.message}
                onChange={(value) => {
                  field.onChange(value);
                  clearErrors("product_discount");
                }}
              />
            )}
          />
          <Controller
            name="product_weight"
            control={control}
            rules={{
              required: "Product Weight is required",
            }}
            render={({ field }) => (
              <ValidatedTextField
                label="Product Weight"
                value={field.value}
                isError={Boolean(formState.errors.product_weight)}
                errorText={formState.errors.product_weight?.message}
                onChange={(value) => {
                  field.onChange(value);
                  clearErrors("product_weight");
                }}
              />
            )}
          />
          <Controller
            name="product_description"
            control={control}
            rules={{
              required: "Product Description is required",
            }}
            render={({ field }) => (
              <ValidatedTextField
                label="Product Description"
                value={field.value}
                isError={Boolean(formState.errors.product_description)}
                errorText={formState.errors.product_description?.message}
                onChange={(value) => {
                  field.onChange(value);
                  clearErrors("product_description");
                }}
              />
            )}
          />

          <Controller
            name="owner_shop_product_id"
            control={control}
            render={({ field }) => (
              <ValidatedTextField
                label="Owner Product ID"
                value={field.value}
                isError={false}
                onChange={(value) => {
                  field.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name={isNew ? "main_image" : "main_image_file"}
            control={control}
            rules={fileRules}
            render={({ field }) => (
              <CustomImageUploader
                identifier="main_image_file"
                onChange={(file) => field.onChange(file)}
                isError={Boolean(formState.errors.main_image_file)}
                errorText={formState.errors.main_image_file?.message}
                value={getImage(0)}
              />
            )}
          />
          <Controller
            name={isNew ? "sub_image_one" : "sub_image_file1"}
            control={control}
            rules={fileRules}
            render={({ field }) => (
              <CustomImageUploader
                identifier="sub_image_file1"
                onChange={(file) => field.onChange(file)}
                isError={Boolean(formState.errors.sub_image_file1)}
                errorText={formState.errors.sub_image_file1?.message}
                value={getImage(1)}
              />
            )}
          />
          <Controller
            name={isNew ? "sub_image_two" : "sub_image_file2"}
            control={control}
            rules={{}}
            render={({ field }) => (
              <CustomImageUploader
                identifier="sub_image_file2"
                onChange={(file) => field.onChange(file)}
                value={getImage(2)}
              />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={modalClose} color="primary" disabled={actionLoader}>
          Cancel
        </Button>
        <AuthButton
          title="Update"
          onClick={handleSubmit(handleUpdate)}
          isLoading={actionLoader}
        />
      </DialogActions>
    </Modal>
  );
}
