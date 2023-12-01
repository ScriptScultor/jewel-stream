import React from "react";
import Modal from "../../components/Dialog/Dialog";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AuthButton from "../../components/Button/AuthButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../store/MyProducts/MyProductsAction";

const DeleteProduct = ({ show, handleClose, product }) => {
  const { actionLoader } = useSelector((state) => state.myproduct);
  const dispatch = useDispatch();

  const onDeleteProduct = async () => {
    try {
      const result = await dispatch(deleteProduct(product));

      if (result.success) {
        handleClose();
      }
    } catch (e) {}
  };

  const modalClose = () => {
    if (actionLoader) {
      return;
    }

    handleClose();
  };
  return (
    <div>
      <Modal show={show} handleClose={modalClose}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-start">
            Are you sure you want to delete {product.product_name} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={modalClose} disabled={actionLoader}>
            No
          </Button>
          <AuthButton
            title={"Yes"}
            onClick={onDeleteProduct}
            isLoading={actionLoader}
          />
        </DialogActions>
      </Modal>
    </div>
  );
};

export default DeleteProduct;
