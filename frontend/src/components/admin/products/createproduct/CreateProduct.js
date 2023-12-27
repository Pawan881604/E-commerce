import React, { useEffect, useRef, useState } from "react";
import { Aside } from "../../aside/Aside";
import {
  ClearError,
  createNewProduct,
} from "../../../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { NEW_PRODUCT_RESET } from "../../../../constants/ProductConstants";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Loader from "../../../layout/loader/Loader";
import { Helmet } from "react-helmet";
import { CharCount } from "../../../layout/CharCount/CharCount";
import MyEditor from "../../../layout/classiceditor/MyEditor";
import ImgUploader from "../../ImageGellery/uploadimage/ImgUploader";
import { ProductSidebar } from "./ProductSidebar";
import { UPDATE_ORDER_RESET } from "../../../../constants/OrderConstants";
import {
  SET_SELECTED_IMAGE_RESET,
  UPDATE_IMAGE_RESET,
} from "../../../../constants/imageGelleryCartConstants";
import MetaData from "../../../layout/metaData/MetaData";
import SelectCategore from "../../category/allCategory/assets/SelectCategore";

export const CreateProduct = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loding, error, success } = useSelector((state) => state.newProduct);
  const { loading, selectedImage } = useSelector((state) => state.selectImage);
  const { images } = useSelector((state) => state.uploadImage);

  //------------------Singup Function--------------------
  const [inputValue, setinputValue] = useState({
    name: "",
    price: "",
    maxprice: "",
    stock: "",
    //  description: "",
    parent: "",
    metatitle: "",
    keywords: [],
    metalink: "",
    metadec: "",
  });
  const [tags, setTags] = useState([]);
  const [open, setOpen] = useState(false);
  const editor = useRef(null);
  const [article, setArticle] = useState("");
  const [content, setContent] = useState("");
  const [avatarPreview, setAvatarPreview] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [imgLength, setimgLength] = useState(0);
  const [btndisable, setBtndisable] = useState(false);
  const categories = [
    "beauty item",
    "packing material",
    "pet products",
  ];
  const subCat = ['essential-oil',
  'oil shampoo',
  '3 ply box',
  '3-ply white box',
  'corrugated kraft paper roll',
  'flap box',
  'paper bubble wrap packing material',
  'polybag',
  'tape',
  'thermal label paper',
  'white flap box',
  'brush',
  'feeding bowl',
  'paw butter cream',
  'pet powder',
  'pet shampoo',
  'pet spray',
  'thermal label paper',
  'waste picker'
];
  //----------editor event

  const contentHeandle = (e) => {
    setContent(e);
  };

  //----------article editor event--
  const articleContentHeandle = (e) => {
    setArticle(e);
  };
  //--------------handleImageClickOpen
  const handleImageClickOpen = () => {
    setOpen(true);
  };
  //----------------handleImageClickClose

  const handleImageClickClose = () => {
    setOpen(false);
  };

  const createProductInputHandle = (e) => {
    // if (e.target.name === "avatar") {
    //   const files = Array.from(e.target.files);
    //   setAvatar(files); // Store the array of files
    //   setAvatarPreview([]); // Clear existing image previews
    //   files.forEach((item, i) => {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       if (reader.readyState === 2) {
    //         setAvatarPreview((old) => [...old, reader.result]);
    //         // const originalFileName = e.target.files[0].name;
    //       }
    //     };
    //     //   setAvatar((old) => [...old, item]);
    //     reader.readAsDataURL(item);
    //   });
    // } else {
    const { name, value } = e.target;
    setinputValue({
      ...inputValue,
      [name]: value,
    });
    // }
  };

  const createProduct = (e) => {
    e.preventDefault();

    const {
      name,
      price,
      maxprice,
      parent,
      stock,
      metatitle,
      keywords,
      metalink,
      metadec,
    } = inputValue;
    let metaUrl = metalink.split(" ").join("-").toLowerCase();
    // let cat = category.split(" ").join("-").toLowerCase();
    // let subcat = category.split(" ").join("-").toLowerCase();
    const imageIds = selectedImage && selectedImage.map((item) => item._id);

    if (
      name.trim() === "" ||
      price.trim() === "" ||
      maxprice.trim() === "" ||
      parent.trim() === "" ||
      stock.trim() === "" ||
      metatitle.trim() === "" ||
      keywords.trim() === "" ||
      metalink.trim() === "" ||
      metadec.trim() === "" ||
      metaUrl.trim() === "" ||
      (imageIds ?? []).length === 0
    ) {
      return alert.error(
        "Please fill out all required fields and upload at least one image. "
      );
    }

    dispatch(
      createNewProduct(
        name,
        price,
        maxprice,
        content,
        article,
        parent,
   
        selectedImage,
        stock,
        metatitle,
        keywords,
        metaUrl,
        metadec,
        imageIds
      )
    );
    dispatch({ type: UPDATE_IMAGE_RESET });
    dispatch({ type: SET_SELECTED_IMAGE_RESET });
  };
  const handleInputKeyDown = (e) => {
    // // e.target.value
    //  console.log(e.target.value)
  };

  useEffect(() => {
    // if (avatarPreview.length > 4) {
    //   alert.error("max 4 image is valid");
    //   setBtndisable(true);
    // } else {
    //   setBtndisable(false);
    // }
    // setimgLength(avatarPreview.length);
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (success) {
      alert.success("product created");
      Navigate("/admin/all-products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [alert, error, dispatch, success, Navigate, avatarPreview]);
console.log(inputValue.parent)
  return (
    <>
      <MetaData
        title={"Admin create product list"}
        content={"Admin create product list"}
        keywords={"Admin create product list"}
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
                      <h1>Create List</h1>
                    </div>
                    {loding ? (
                      <Loader />
                    ) : (
                      <>
                        <div className="create-page-contaionr">
                          <div className="from-contaionr">
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
                                  id="maxpricee"
                                  value={inputValue.maxpricee}
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
                                <SelectCategore parent={inputValue.parent}  handelInputValue={createProductInputHandle}/>
                                
                              </div>
                             
                              <div className="input-field-area">
                                <label htmlFor="description">description</label>

                                <div>
                                  <MyEditor event={contentHeandle} />
                                </div>
                              </div>
                              <div className="input-field-area">
                                <label htmlFor="article ">Article </label>

                                <div>
                                  <MyEditor event={articleContentHeandle} />
                                </div>
                              </div>
                              <h2>SEO</h2>
                              <div className="input-field-area">
                                <label htmlFor="keyword">Keyword</label>
                                <input
                                  type="text"
                                  name="keywords"
                                  autoComplete="off"
                                  id="keywords"
                                  value={inputValue.keywords}
                                  // onKeyDown={handleInputKeyDown}
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
                                  disabled={loding || btndisable ? true : false}
                                  type="submit"
                                  value="Singup"
                                >
                                  Create list
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
                            <ProductSidebar selectedImage={selectedImage} />
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
