import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "../allImages/LazyLoadImage";
import Loader from "../../../layout/loader/Loader";
import { uploadImage } from "../../../../actions/imageGelleryAction";
import { Button } from "@material-ui/core";

export const ImageUploaderForm = () => {
  const [filterImage, setFilterImage] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [tabValue, setTabValue] = useState(true);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading: allImgLoading } = useSelector((state) => state.images);
  const { loading, images } = useSelector((state) => state.uploadImage);

  const { user } = useSelector((state) => state.user);

  const imgHandler = async (e) => {
    if (e.target.name === "avatar") {
      const files = Array.from(e.target.files);

      setAvatar(files); // Store the array of files

      setAvatarPreview([]); // Clear existing image previews
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
      dispatch(uploadImage(files, user && user._id));
    }
  };

  //----------------------------------------------

  const [currentImageData, setCurrentImageData] = useState([]);
  const handleImageClick = (imageData) => {
    console.log(imageData);
    // // Do something with the clicked image data
    // const isSelected = currentImageData.some(
    //   (item) => item._id === imageData._id
    // );

    // setFilterImage([imageData]);

    // if (isSelected) {
    //   // If selected, remove it from the array
    //   const updatedData = currentImageData.filter(
    //     (item) => item._id !== imageData._id
    //   );
    //   console.log(updatedData);
    //   setCurrentImageData(updatedData);
    // } else {
    //   // If not selected, add it to the array
    //   setCurrentImageData((prevData) => [...prevData, imageData]);
    // }
  };

  // useEffect(()=>{
  //   if(error){
  //     alert.error(error);
  //     dispatch(clearErrors())
  //   }
  // },[error,alert,dispatch])

  const currentImgData = (i) => {
    // // const filterImg = avatar.filter((item, index) => {
    // //   return i === index;
    // // });
    // const id =
    //   images && images.images && images.images[i] ? images.images[i]._id : null;
    // setFilterImage([i, id]);
  };

  return (
    <form encType="multipart/form-data">
      <div className="input-field-">
        <div className="-input-upload">
          <label htmlFor="avatar">avatar</label>

          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/"
            multiple
            onChange={(e) => imgHandler(e)}
          />
        </div>
        <div className="input-img-area">
          <ul>
            {avatarPreview.map((item, i) => (
              <li
                className="input-img-area-list"
                key={i}
                onClick={(e) => currentImgData(i)}
              >
                {allImgLoading ? (
                  <Loader />
                ) : (
                  <>
                    <span>
                      <LazyLoadImage
                        src={item}
                        alt="avatar"
                        handleImageClick={handleImageClick}
                        //  image={images&& images.images
                        // }
                      />
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </form>
  );
};
