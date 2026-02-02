import React, { useState } from "react";
import "./index.css";

function ProductValidation() {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: ""
  });
  
  const [errors, setErrors] = useState({
    productName: "",
    quantity: ""
  });
  
  const [touched, setTouched] = useState({
    productName: false,
    quantity: false
  });

  const validateProductName = (value) => {
    if (!value.trim()) {
      return "Product name is required.";
    }
    return "";
  };

  const validateQuantity = (value) => {
    if (!value.trim()) {
      return "Quantity is required.";
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate on change if field has been touched
    if (touched[name]) {
      let error = "";
      if (name === "productName") {
        error = validateProductName(value);
      } else if (name === "quantity") {
        error = validateQuantity(value);
      }
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate on blur
    let error = "";
    if (name === "productName") {
      error = validateProductName(value);
    } else if (name === "quantity") {
      error = validateQuantity(value);
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const productNameError = validateProductName(formData.productName);
    const quantityError = validateQuantity(formData.quantity);

    setErrors({
      productName: productNameError,
      quantity: quantityError
    });

    setTouched({
      productName: true,
      quantity: true
    });

    // Check if form is valid
    if (!productNameError && !quantityError) {
      // Form is valid - submit logic here
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");
    }
  };

  const isFormValid = !errors.productName && !errors.quantity && 
                      formData.productName.trim() && formData.quantity.trim();

  return (
    <div className="layout-column justify-content-center align-items-center">
      <section className="card pa-50">
        <form className="layout-column" noValidate onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="productName"
              onInput={handleInputChange}
              onBlur={handleBlur}
              data-testid="name-input"
              className={`white large outlined ${errors.productName && touched.productName ? 'error' : ''}`}
              placeholder="Product name"
              value={formData.productName}
            />
            <p className="error-text form-hint" data-testid="name-input-error">
              {touched.productName && errors.productName ? errors.productName : ""}
            </p>
          </label>

          <label>
            <input
              type="number"
              name="quantity"
              data-testid="quantity-input"
              onInput={handleInputChange}
              onBlur={handleBlur}
              className={`white large outlined ${errors.quantity && touched.quantity ? 'error' : ''}`}
              placeholder="Quantity"
              value={formData.quantity}
            />
            <p className="error-text form-hint" data-testid="quantity-input-error">
              {touched.quantity && errors.quantity ? errors.quantity : ""}
            </p>
          </label>

          <button 
            className="mt-50" 
            type="submit" 
            data-testid="submit-button"
            disabled={!isFormValid}
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}

export default ProductValidation;
