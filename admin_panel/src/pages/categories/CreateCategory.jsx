import React from "react";
import { useState } from "react";
import { FaArrowLeft, FaPlusSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BeautifulInput from "../../components/BeautifulInput";
import BeautifulUploader from "../../components/BeautifulUploader";
import FancyCheckbox from "../../components/FancyCheckbox";
import Validator from "../../helpers/Validator";
import { createCategory } from "../../store/categories/actions";
import { handleBackAuto } from "../../store/settings/actions";

function CreateCategory() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cover: "",
  });

  const resetState = () => {
    setFormData({
      title: "",
      description: "",
      cover: "",
    });
  };

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { backAfterSubmit } = useSelector((state) => state.siteSettings);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpload = (e) => {
    const cover = e.target.files[0];
    setFormData({ ...formData, cover });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const validator = new Validator(formData);
    const validatorErrors = validator
      .setValidation({
        title: ["required", "min:2", "max:100"],
        cover: ["image:png,jpeg,jpg", "size:2048"],
      })
      .setMessages({
        title: {
          required: "title is required.",
          min: "title must be grater than 2 characters.",
          max: "title must be less than 100 characters.",
        },
        cover: {
          image: "Please provide a valid image (jpg, jpeg, png).",
          size: "Max size is 2048KB.",
        },
      })
      .prepare()
      .getObjectErrors();

    setErrors(validatorErrors);

    if (Object.keys(validatorErrors).length === 0) {
      dispatch(createCategory(formData, { navigate, setUploadProgress }));
      resetState();
    }
  };

  return (
    <>
      <div className="main-content create-user-page">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="page-head">Create New Category</h1>

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
          </div>

          <div className="col-xl-12">
            <BeautifulUploader
              label={{ text: "Cover", for: "cover" }}
              id="cover"
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

export default CreateCategory;
