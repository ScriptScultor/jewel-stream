import { TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import OptionPopover from "../../components/Popover/Popover";
import ProductModal from "./ProductModal";
import DeleteProduct from "./DeleteProduct";

const ProductRow = ({ columns, rowData }) => {
  const [product, setProduct] = useState(null);

  // When the rowData changes, update the product state
  useEffect(() => {
    setProduct(rowData);
  }, [rowData]);

  if (product === null) {
    return null; // Return null when product is not available
  }

  // Create a table row for the product data
  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={product.code}>
        {columns.map((column) => {
          return (
            <ProductCell column={column} product={product} key={column.id} />
          );
        })}
      </TableRow>
    </>
  );
};

export default ProductRow;

const ProductCell = ({ column, product }) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const history = useHistory();

  const toggleFormModal = () => {
    setShowFormModal(!showFormModal);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const value = product[column.id];
  return (
    <TableCell key={column.id} align={column.align}>
      {column.id === "options" ? (
        <>
          <OptionPopover
            popoverOptions={[
              {
                title: "View Product",
                onClick: () => {
                  history.push(
                    `/products/${product.product_category}/${product.product_name}/${product.product_draft_id}`
                  );
                },
              },
              {
                title: "Edit",
                onClick: () => {
                  toggleFormModal();
                },
              },
              {
                title: "Delete",
                onClick: () => {
                  toggleDeleteModal();
                },
                classes: "text-danger",
              },
            ]}
          />
        </>
      ) : column.id === "product_images" ? (
        <img
          alt={product.product_name}
          src={value.split("_KEY_1_")[0]}
          width="50"
          height="50"
        />
      ) : column.format ? (
        column.format(value)
      ) : (
        value
      )}
      <ProductModal
        show={showFormModal}
        handleClose={toggleFormModal}
        product={product}
      />
      <DeleteProduct
        show={showDeleteModal}
        handleClose={toggleDeleteModal}
        product={product}
      />
    </TableCell>
  );
};
