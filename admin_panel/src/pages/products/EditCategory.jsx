import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaArrowLeft, FaUserEdit, FaUserLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import BeautifulInput from "../../components/BeautifulInput";
import BeautifulUploader from "../../components/BeautifulUploader";
import FancyCheckbox from "../../components/FancyCheckbox";
import Validator from "../../helpers/Validator";
import { updateCategory } from "../../store/categories/actions";
import { handleBackAuto } from "../../store/settings/actions";

function EditCategory() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cover: "",
  });

  const [categoryCover, setCategoryCover] = useState("");

  const { categoryId } = useParams();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { backAfterSubmit } = useSelector((state) => state.siteSettings);

  const fetchCategory = async (categoryId) => {
    const loggedInUser = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};

    const token = loggedInUser && loggedInUser.token && loggedInUser.token;

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/categories/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const category = data.data;

    setFormData({
      ...formData,
      title: category.title,
      description: category.description,
    });

    setCategoryCover(category.cover);
  };

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
      dispatch(
        updateCategory(categoryId, {
          formData,
          navigate,
          setUploadProgress,
          update: () => {
            fetchCategory(categoryId);
          },
        })
      );
    }
  };

  useEffect(() => {
    fetchCategory(categoryId);
  }, []);

  return (
    <>
      <div className="main-content create-category-page">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="page-head">Edit Category</h1>

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
            {categoryCover && (
              <div className="col-xl-3 my-3">
                <img
                  src={`${process.env.REACT_APP_STORAGE_URL}/categories/${categoryCover}`}
                  alt=""
                  className="w-100 rounded"
                />
              </div>
            )}
          </div>
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

          <button className="btn btn-success mt-2 d-flex align-items-center gap-2">
            <FaUserEdit />
            Update
          </button>
        </form>
      </div>
    </>
  );
}

export default EditCategory;
