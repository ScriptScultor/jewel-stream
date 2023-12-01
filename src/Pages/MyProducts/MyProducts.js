import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { fetchProducts } from "../../store/MyProducts/MyProductsAction";
import { calculateMaxHeight, formatTimestamp } from "../../Utils/services";
import { CircularProgress } from "@mui/material";
import OutLineCircularButton from "../../components/Button/OutlineRadiusButton";
import ProductRow from "./ProductRow";
import { fetchCategories } from "../../store/Categories/CategoriesAction";
import { Container } from "react-bootstrap";

const columns = [
  { id: "id", label: "Id" },
  { id: "product_images", label: "Product Image" },
  { id: "product_name", label: "Product Name" },
  {
    id: "createdAt",
    label: "Created Date",
    align: "left",
    format: (value) => formatTimestamp(value),
  },
  {
    id: "product_category",
    label: "Category",
    align: "left",
  },
  {
    id: "product_base_price",
    label: "Price",
    align: "left",
  },
  {
    id: "product_discount",
    label: "Discount",
    align: "left",
  },
  {
    id: "options",
    label: "Options",
    align: "left",
  },
];

const productLimit = 30;

export default function MyProducts() {
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const { products, isLoading, error, count } = useSelector(
    (state) => state.myproduct
  );

  const [page, setPage] = useState(0);

  useEffect(
    () => dispatch(fetchProducts(page, productLimit)),
    [dispatch, page]
  );

  useEffect(() => {
    // After data loads, scroll a little lower
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollTo({
        top: container.scrollTop + 100, // Scroll down by 100 pixels
        behavior: "smooth", // Apply smooth scrolling
      });
    }
  }, [products]);

  useEffect(() => {
    // Dispatch the fetchCategories action to load categories
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleLoadMore = () => {
    const nextPage = page + productLimit;
    setPage(nextPage);
  };

  return (
    <Container>
      <Paper sx={{ width: "100%" }}>
        <TableContainer
          sx={{ maxHeight: calculateMaxHeight(), overflow: "auto" }}
          ref={containerRef}
        >
          <Table stickyHeader aria-label="sticky table" sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {error ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    {error}
                  </TableCell>
                </TableRow>
              ) : (
                (products ?? []).map((row) => (
                  <ProductRow columns={columns} rowData={row} key={row.id} />
                ))
              )}
              {isLoading && page === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : null}
              {count >= productLimit && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    align="center"
                    className="py-3"
                  >
                    <OutLineCircularButton
                      onClick={handleLoadMore}
                      title="Load More"
                      isLoading={isLoading}
                      sx={{
                        borderRadius: "25px",
                        margin: "10px",
                        backgroundColor: "transparent",
                      }}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
