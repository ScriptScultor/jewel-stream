import React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import ValidatedSelect from "../../components/Input/Dropdown";
import ValidatedTextField from "../../components/Input/TextField";
import Checkbox from "@mui/material/Checkbox";
import Modal from "../../components/Dialog/Dialog";
import { FormControlLabel } from "@mui/material";
import { validationFunctions } from "../../Utils/validations";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../../store/MyProducts/MyProductsAction";
import AuthButton from "../../components/Button/AuthButton";

export default function ProductModal({ show, handleClose, product }) {
  const { control, handleSubmit, formState, clearErrors, setValue } = useForm();
  const { actionLoader } = useSelector((state) => state.myproduct);
  const dispatch = useDispatch();

  const handleUpdate = async (data) => {
    // Perform the update action using formData
    console.log("This check");
    try {
      const result = await dispatch(editProduct(data));

      if (result.success) {
        //close the modal
        handleClose();
      }
    } catch (e) {}
  };

  React.useEffect(() => {
    // Prefill the form data
    for (const key of Object.keys(product)) {
      setValue(key, product[key]);
    }
  }, [product, setValue, show]);

  const modalClose = () => {
    if (actionLoader) {
      return;
    }

    handleClose();
  };

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
                }}
                isError={Boolean(formState.errors.product_category)}
                errorText={formState.errors.product_category?.message}
                options={[
                  { value: "Gold", label: "Gold" },
                  { value: "Diamond", label: "Diamond" },
                  { value: "Silver", label: "Silver" },
                ]}
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
              <ValidatedTextField
                label="Product Sub Category"
                value={field.value}
                isError={Boolean(formState.errors.product_sub_category)}
                errorText={formState.errors.product_sub_category?.message}
                onChange={(value) => {
                  field.onChange(value);
                  clearErrors("product_sub_category");
                }}
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
            name="product_in_stock"
            control={control}
            rules={{
              required: "Product In Stock is required",
            }}
            render={({ field }) => (
              <ValidatedSelect
                label="Product In Stock"
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  clearErrors("product_in_stock");
                }}
                isError={Boolean(formState.errors.product_in_stock)}
                errorText={formState.errors.product_in_stock?.message}
                options={[
                  { value: true, label: "Yes" },
                  { value: false, label: "No" },
                ]}
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
            name="product_owner_mobile_number"
            control={control}
            rules={{
              required: "Owner Mobile Number is required",
              validate: (value) =>
                validationFunctions.validatePhoneNumber(value) || true,
            }}
            render={({ field }) => (
              <ValidatedTextField
                label="Owner Mobile Number"
                type="tel"
                value={field.value}
                isError={Boolean(formState.errors.product_owner_mobile_number)}
                errorText={
                  formState.errors.product_owner_mobile_number?.message
                }
                onChange={(value) => {
                  field.onChange(value);
                  clearErrors("product_owner_mobile_number");
                }}
              />
            )}
          />
          <Controller
            name="owner_product_id"
            control={control}
            rules={{
              required: "Owner Product ID is required",
            }}
            render={({ field }) => (
              <ValidatedTextField
                label="Owner Product ID"
                value={field.value}
                isError={Boolean(formState.errors.owner_product_id)}
                errorText={formState.errors.owner_product_id?.message}
                onChange={(value) => {
                  field.onChange(value);
                  clearErrors("owner_product_id");
                }}
              />
            )}
          />
          <Controller
            name="sheet_row_number"
            control={control}
            rules={{
              required: "Sheet Row Number is required",
            }}
            render={({ field }) => (
              <ValidatedTextField
                label="Sheet Row Number"
                value={field.value}
                isError={Boolean(formState.errors.sheet_row_number)}
                errorText={formState.errors.sheet_row_number?.message}
                onChange={(value) => {
                  field.onChange(value);
                  clearErrors("sheet_row_number");
                }}
              />
            )}
          />
          <Controller
            name="is_active"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    color="primary"
                  />
                }
                label="Is Active"
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
