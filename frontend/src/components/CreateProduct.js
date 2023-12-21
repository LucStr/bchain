import React from "react";

export function CreateProduct({ mintProduct }) {
  return (
    <div>
      <h4>Create a new Product!</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const brand = formData.get("brand");
          const serial = formData.get("serial");

          if (brand && serial) {
            mintProduct(brand, serial);
          }
        }}
      >
        <div className="form-group">
          <label>Brand</label>
          <input className="form-control" type="text" name="brand" required />
        </div>
        <div className="form-group">
          <label>Serial Number</label>
          <input className="form-control" type="text" name="serial" required />
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Create" />
        </div>
      </form>
    </div>
  );
}
