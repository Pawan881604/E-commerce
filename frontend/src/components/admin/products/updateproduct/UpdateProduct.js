import React, { useEffect, useMemo, useState } from "react";
import { Aside } from "../../aside/Aside";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import {
  ClearError,
  getProductDetails,
  updateAdminProduct,
} from "../../../../actions/ProductAction";
import { UPDATE_PRODUCT_RESET } from "../../../../constants/ProductConstants";

import Loader from "../../../layout/loader/Loader";
import "./updateproduct.css";
import { Helmet } from "react-helmet";
import { CharCount } from "../../../layout/CharCount/CharCount";
import MyEditor from "../../../layout/classiceditor/MyEditor";
import ImgUploader from "../../ImageGellery/uploadimage/ImgUploader";
import { ProductSidebar } from "../createproduct/ProductSidebar";
import {
  SET_SELECTED_IMAGE_RESET,
  UPDATE_IMAGE_RESET,
} from "../../../../constants/imageGelleryCartConstants";
import MetaData from "../../../layout/metaData/MetaData";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  //-----------urlParams

  const { id } = useParams();

  //-----------------useSelector from redux
  const { selectedImage } = useSelector((state) => state.selectImage);

  const { error: updateError, isUpdate } = useSelector(
    (state) => state.adminProduct
  );
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  //-------------usestate
  const [inputValue, setinputValue] = useState({
    name: "",
    price: "",
    maxprice: "",
    description: "",
    article: "",
    category: "",
    stock: "",
    metatitle: "",
    keyword: "",
    metalink: "",
    metadec: "",
  });
  const [open, setOpen] = useState(false);
  const [articledes, setArticle] = useState("");
  const [content, setContent] = useState("");
  const [avatarPreview, setAvatarPreview] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [oldImage, setOldImage] = useState([]);
  const [imgLength, setimgLength] = useState(0);
  const [btndisable, setBtndisable] = useState(false);

  const categories = [
    "essential-oil",
    "oil shampoo",
    "school bags",
    "kids essential",
    "teddies",
    "our creations",
  ];

  const createProductInputHandle = (e) => {
    if (e.target.name === "avatar") {
      const files = Array.from(e.target.files);
      setAvatar(files); // Store the array of files
      setAvatarPreview([]); // Clear existing image previews
      setOldImage([]);
      files.forEach((item, i) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview((old) => [...old, reader.result]);
            // const originalFileName = e.target.files[0].name;
          }
        };
        //   setAvatar((old) => [...old, item]);
        reader.readAsDataURL(item);
      });
    } else {
      const { name, value } = e.target;

      setinputValue({ ...inputValue, [name]: value });
    }
  };

  const createProduct = (e) => {
    e.preventDefault();

    const {
      name,
      price,
      maxprice,
      description,
      article,
      category,
      stock,
      metatitle,
      keyword,
      metalink,
      metadec,
    } = inputValue;

    let metaUrl = metalink.split(" ").join("-").toLowerCase();
    const imageIds = selectedImage && selectedImage.map((item) => item._id);
    const productData = {
      name,
      price,
      maxprice,
      content,
      description,
      articledes,
      article,
      category,
      stock,
      metatitle,
      keyword,
      metalink,
      metadec,
      imageIds,
    };

    if (oldImage && oldImage.length > 0) {
      // Check if oldImage is defined and has elements
      const firstOldImage = oldImage[0];
      if (firstOldImage && firstOldImage.url && firstOldImage.url.length > 1) {
        // If there are more than 1 old images, use the oldImage data for the avatar
        productData.avatar = oldImage.map((image) => image.url); // Extract URLs
      } else {
        // If there is 1 or no old image, use the new avatar data
        productData.avatar = avatar;
      }
    } else {
      // If oldImage is undefined or empty, use the new avatar data
      productData.avatar = avatar;
    }

    dispatch(updateAdminProduct(id, productData));
    dispatch({ type: UPDATE_IMAGE_RESET });
    dispatch({ type: SET_SELECTED_IMAGE_RESET });
  };

  //----------editor event

  const contentHeandle = (e) => {
    setContent(e);
  };

  //----------article editor event--
  const articleContentHeandle = (e) => {
    console.log(e);
    setArticle(e);
  };

  useMemo(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id), []);
    }
  }, []);

  //----------------------------------------------------
  //--------------handleImageClickOpen
  const handleImageClickOpen = () => {
    setOpen(true);
  };
  //----------------handleImageClickClose

  const handleImageClickClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (product) {
      setinputValue({
        name: product && product.name,
        price: product && product.price,
        maxprice: product && product.maxprice,
        stock: product && product.stock,
        description: product && product.description,
        article: product && product.article,
        category: product && product.category,
        metatitle: product.seo && product.seo[0].metatitle,
        keyword: product.seo && product.seo[0].keyword,
        metalink: product.seo && product.seo[0].metalink,
        metadec: product.seo && product.seo[0].metadec,
      });
      setOldImage(product && product.imageId);
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(ClearError());
    }
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }

    if (isUpdate) {
      alert.success("product updated");
      Navigate("/admin/all-products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    alert,
    updateError,
    product,
    isUpdate,
    Navigate,
    id,
    error,
    avatarPreview,
  ]);

  return (
    <>
      <MetaData
        title={"Admin updat product list"}
        content={"Admin updat product list"}
        keywords={"Admin updat product list"}
      />
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="ad-section">
                <div className="all-products-cont">
                  <div className="all-products-content-area">
                    <div className="all-products-title">
                      <h1>Update Listing</h1>
                    </div>
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        <div className="create-page-contaionr">
                          <div>
                            <form
                              className="product-form"
                              onSubmit={createProduct}
                              encType="multipart/from-data"
                            >
                              <div className="input-field-area">
                                <label htmlFor="name">Name</label>
                                <input
                                  type="text"
                                  name="name"
                                  autoComplete="on"
                                  id="name-input"
                                  value={inputValue.name}
                                  onChange={createProductInputHandle}
                                />
                              </div>
                              <div className="input-field-area input-field-width-cont">
                                <label htmlFor="price">price</label>
                                <input
                                  type="number"
                                  name="price"
                                  autoComplete="on"
                                  id="price"
                                  value={inputValue.price}
                                  onChange={createProductInputHandle}
                                />
                              </div>
                              <div className="input-field-area input-field-width-cont">
                                <label htmlFor="maxprice">Max price</label>
                                <input
                                  type="number"
                                  name="maxprice"
                                  id="maxprice"
                                  value={inputValue.maxprice}
                                  onChange={createProductInputHandle}
                                />
                              </div>
                              <div className="input-field-area input-field-width-cont">
                                <label htmlFor="stock">Stock</label>
                                <input
                                  type="number"
                                  name="stock"
                                  autoComplete="on"
                                  id="stock"
                                  value={inputValue.stock}
                                  onChange={createProductInputHandle}
                                />
                              </div>
                              <div className="input-field-area input-field-width-cont">
                                <label htmlFor="category">category</label>
                                <select
                                  name="category"
                                  value={inputValue.category}
                                  onChange={createProductInputHandle}
                                >
                                  {categories.map((item, i) => (
                                    <option key={i} value={item}>
                                      {item}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="input-field-area">
                                <label htmlFor="description">description</label>

                                <div>
                                  <MyEditor
                                    value={inputValue.description}
                                    event={contentHeandle}
                                  />
                                </div>
                              </div>
                              <div className="input-field-area">
                                <label htmlFor="article ">Article </label>

                                <div>
                                  <MyEditor
                                    value={inputValue.article}
                                    event={articleContentHeandle}
                                  />
                                </div>
                              </div>
                              <h2>SEO</h2>
                              <div className="input-field-area">
                                <label htmlFor="keyword">Keyword</label>
                                <input
                                  type="keyword"
                                  name="keyword"
                                  autoComplete="off"
                                  id="keyword"
                                  value={inputValue.keyword}
                                  onChange={createProductInputHandle}
                                />
                              </div>
                              <div className="input-field-area">
                                <label htmlFor="metatitle">Meta Title</label>
                                <input
                                  type="metatitle"
                                  name="metatitle"
                                  autoComplete="off"
                                  id="metatitle"
                                  value={inputValue.metatitle}
                                  onChange={createProductInputHandle}
                                />
                                <CharCount
                                  char={inputValue.metatitle}
                                  limit={60}
                                />
                              </div>
                              <div className="input-field-area">
                                <label htmlFor="metalink">Meta link</label>
                                <input
                                  type="metalink"
                                  name="metalink"
                                  autoComplete="off"
                                  id="metalink"
                                  value={inputValue.metalink}
                                  onChange={createProductInputHandle}
                                />
                                <CharCount
                                  char={inputValue.metalink}
                                  limit={60}
                                />
                              </div>
                              <div className="input-field-area">
                                <label htmlFor="metadec">
                                  Meta description
                                </label>
                                <textarea
                                  type="metadec"
                                  name="metadec"
                                  autoComplete="off"
                                  id="metadec"
                                  value={inputValue.metadec}
                                  onChange={createProductInputHandle}
                                ></textarea>
                                <CharCount
                                  char={inputValue.metadec}
                                  limit={160}
                                />
                              </div>
                              <div>
                                <Button
                                  disabled={
                                    btndisable || loading ? true : false
                                  }
                                  type="submit"
                                  value="Singup"
                                >
                                  Update list
                                </Button>
                              </div>
                            </form>
                          </div>
                          <div className="product-sidebar-containor">
                            <Button
                              variant="outlined"
                              onClick={handleImageClickOpen}
                            >
                              Image upload
                            </Button>
                            <ImgUploader
                              open={open}
                              close={handleImageClickClose}
                            />
                            <ProductSidebar
                              selectedImage={
                                selectedImage
                                  ? selectedImage
                                  : oldImage && oldImage
                              }
                            />
                            {console.log(oldImage)}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
