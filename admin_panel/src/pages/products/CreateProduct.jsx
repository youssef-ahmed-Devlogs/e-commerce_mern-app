import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaArrowLeft, FaPlusSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BeautifulInput from "../../components/BeautifulInput";
import BeautifulSelect from "../../components/BeautifulSelect";
import BeautifulUploader from "../../components/BeautifulUploader";
import FancyCheckbox from "../../components/FancyCheckbox";
import Validator from "../../helpers/Validator";
import {
  createCategory,
  fetchCategories,
} from "../../store/categories/actions";
import { createProduct } from "../../store/products/actions";
import { handleBackAuto } from "../../store/settings/actions";

function CreateProduct() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    categories: [],
    images: [],
  });

  const resetState = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      categories: [],
      images: [],
    });
  };

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);
  const { backAfterSubmit } = useSelector((state) => state.siteSettings);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCategoriesChange = (e) => {
    console.log("====================================");
    console.log(e.target.value);
    console.log("====================================");
    // setFormData({ ...formData, categories: e.target.value });
  };

  const handleUpload = (e) => {
    const images = e.target.files;
    setFormData({ ...formData, images });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    // Validation
    const validator = new Validator(formData);
    const validatorErrors = validator
      .setValidation({
        title: ["required", "min:2", "max:100"],
        price: ["required", "min:1", "max:5"],
        images: ["image:png,jpeg,jpg", "size:2048"],
      })
      .setMessages({
        title: {
          required: "title is required.",
          min: "title must be grater than 2 characters.",
          max: "title must be less than 100 characters.",
        },
        price: {
          required: "price is required.",
          min: "price must be grater than 1 character.",
          max: "price must be less than 5 characters.",
        },
        images: {
          image: "Please provide a valid image (jpg, jpeg, png).",
          size: "Max size is 2048KB.",
        },
      })
      .prepare()
      .getObjectErrors();

    setErrors(validatorErrors);

    if (Object.keys(validatorErrors).length === 0) {
      dispatch(createProduct(formData, { navigate, setUploadProgress }));
      resetState();
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  console.log(categories);

  return (
    <>
      <div className="main-content create-user-page">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="page-head">Create New Product</h1>

          <div className="d-flex align-items-center justify-content-between gap-3">
            <FancyCheckbox
              id="backAuto"
              title="Back After Submit"
              onChange={() => dispatch(handleBackAuto(!backAfterSubmit))}
              checked={backAfterSubmit}
            />

            <Link to="/categories" className="btn btn-primary">
              <FaArrowLeft className="me-1" />
              Back
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-xl-6">
              <BeautifulInput
                label={{ text: "Title", for: "title" }}
                type="text"
                id="title"
                placeholder="Title"
                onChange={handleChange}
                value={formData.title}
                errors={errors}
              />
            </div>

            <div className="col-xl-6">
              <BeautifulInput
                label={{ text: "Price", for: "price" }}
                type="text"
                id="price"
                placeholder="Price"
                onChange={handleChange}
                value={formData.price}
                errors={errors}
              />
            </div>

            <div className="col-xl-12">
              <BeautifulInput
                label={{ text: "Description", for: "description" }}
                type="textarea"
                id="description"
                placeholder="Description"
                onChange={handleChange}
                value={formData.description}
                errors={errors}
              />
            </div>

            <div className="col-xl-12">
              <BeautifulSelect
                label={{ text: "Categories", for: "categories" }}
                id="categories"
                onChange={handleCategoriesChange}
                multiple
                errors={errors}
              >
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </BeautifulSelect>
            </div>
          </div>

          <div className="col-xl-12">
            <BeautifulUploader
              label={{ text: "Images", for: "images" }}
              id="images"
              multiple
              onChange={handleUpload}
              uploadprogress={uploadProgress}
              errors={errors}
            />
          </div>

          <button className="btn btn-primary mt-2 d-flex align-items-center gap-2">
            <FaPlusSquare />
            Create
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateProduct;
