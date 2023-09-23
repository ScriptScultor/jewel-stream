import { Alert } from "@mui/material";
import React, { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import "./AddReview.css";

const AddReview = () => {
  const [rating, setRating] = useState(1); // initial rating value
  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
    console.log(rating);
  };
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    //  if user data is valid then
    if (!data.Name) {
      return (
        <Spinner className="mx-auto" animation="border" variant="danger" />
      );
    } else {
      data.rating = rating;
    }
  };

  return (
    <Container className="w-100">
      <div className="order-form mx-auto">
        <p className="addReview-title mb-md-5 mb-3">
          Please Give Your Feedback
        </p>
        {success ? (
          <Alert severity="success">Feedback Added Successfully!</Alert>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Rating
              onClick={handleRating}
              ratingValue={rating}
              size={40}
              label
              transition
              fillColor="orange"
              emptyColor="gray"
              className="foo" // Will remove the inline style if applied
            />
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                // value={user.displayName}
                {...register("Name")}
                required
              />
              <label htmlFor="floatingInput">Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                // value={user.email}
                className="form-control"
                id="floatingInput"
                {...register("Email")}
                required
              />
              <label htmlFor="floatingInput">Email</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                {...register("message")}
                required
              />
              <label htmlFor="floatingInput">Message</label>
            </div>

            <input
              className="btn btn-success px-3"
              type="submit"
              value="Add Feedback"
            />
          </form>
        )}
      </div>
    </Container>
  );
};

export default AddReview;
