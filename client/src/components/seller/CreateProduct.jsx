import { Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  createProductStart,
  createProductSuccess,
  createProductFailure,
} from "../../redux/product/productSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CreateProduct() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { currentProduct } = useSelector((state) => state.product);
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createProductStart());
    try {
      const res = await fetch("/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        dispatch(createProductSuccess(data));
        navigate(
          `/sellercenter?tab=dashboard&page=create-product-images&id=${currentProduct._id}&role=seller`
        );
      } else {
        dispatch(createProductFailure(data.message));
      }
    } catch (error) {
      dispatch(createProductFailure(error.message));
    }
  };
  return (
    <div className="w-full my-5">
      <h1 className="text-4xl font-bold p-4">Create a product</h1>
      <form
        className="py-3 sm:px-10 px-4 flex flex-col gap-5 w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full">
          <span className="text-xs">Product Name*</span>
          <TextInput
            type="text"
            id="title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Title of Product"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <span className="text-xs">Description*</span>
          <ReactQuill
            theme="snow"
            placeholder="Describe your product detail here..."
            className="h-72 mb-12"
            required
            onChange={(value) => {
              setFormData({ ...formData, description: value });
            }}
          />
        </div>
        <div className="flex justify-between gap-2 w-full">
          <div className="flex flex-col flex-1">
            <span className="text-xs">Price*</span>
            <TextInput
              type="number"
              id="price"
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="Price of Product"
              className="sm:w-full w-44"
              required
            />
          </div>
          <div className="flex flex-col flex-1 w-full">
            <span className="text-xs">Quantity*</span>
            <TextInput
              type="number"
              id="quantity"
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              placeholder="Quantity of Product"
              className="sm:w-full w-44"
              required
            />
          </div>
        </div>
        <div className="flex justify-between gap-2 w-full">
          <div className="flex flex-col flex-1">
            <span className="text-xs">Category*</span>
            <div>
              <Select
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="uncategorized">Select a category</option>
                <option value="mobile">Mobile</option>
                <option value="laptop">Laptop</option>
                <option value="tv">TV</option>
              </Select>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-xs">Brand*</span>
            <div>
              <Select
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
              >
                <option value="No Brand">No Brand</option>
                <option value="apple">Apple</option>
                <option value="lenovo">Lenovo</option>
                <option value="acer">Acer</option>
              </Select>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-xs">Colour*</span>
            <div>
              <Select
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
              >
                <option value="unselected">Select a Colour name</option>
                <option value="red">Red</option>
                <option value="yellow">yellow</option>
                <option value="blue">blue</option>
                <option value="white">white</option>
                <option value="black">black</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Pink">Pink</option>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mx-auto w-full">
          <button className="button" type="reset">
            Cancel
          </button>
          <button type="submit" className="button">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
