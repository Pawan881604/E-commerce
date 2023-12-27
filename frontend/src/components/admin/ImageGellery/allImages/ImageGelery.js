import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllImages,
  setSelectedImage,
} from "../../../../actions/imageGelleryAction";
import { useAlert } from "react-alert";
import Loader from "../../../layout/loader/Loader";
import Pagination from "react-js-pagination";
import { LazyLoadImage } from "./LazyLoadImage";
import { ImageAsideBar } from "../uploadimage/ImageAsideBar";
import ImgUploader from "../uploadimage/ImgUploader";
import { ImageUploaderForm } from "../uploadimage/ImageUploaderForm";

export const ImageGelery = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, images, resultPerPage, imageCount, error } = useSelector(
    (state) => state.images
  );
  console.log(images);
  const [isSelected, setIsSelected] = useState(true);
  const [filterImage, setFilterImage] = useState([]);
  const [currentImageData, setCurrentImageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const handleImageClick = (imageData) => {
    // Do something with the clicked image data
    const isSelected = currentImageData.some(
      (item) => item._id === imageData._id
    );

    setFilterImage([imageData]);

    if (isSelected) {
      // If selected, remove it from the array
      const updatedData = currentImageData.filter(
        (item) => item._id !== imageData._id
      );
      console.log(updatedData);
      setCurrentImageData(updatedData);
    } else {
      // If not selected, add it to the array
      setCurrentImageData((prevData) => [...prevData, imageData]);
    }
  };

  const imsgeSelectSaveBtn = document.querySelector(".save-select-btn");
  imsgeSelectSaveBtn &&
    imsgeSelectSaveBtn.addEventListener("click", () => {
      // const elementToRemove = document.querySelector(".tab-dialog");

      dispatch(setSelectedImage(currentImageData));
      // if (elementToRemove) {
      //   elementToRemove.classList.add('hidden');
      // }
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllImages(currentPage));
  }, [alert, error, dispatch, currentPage]);
  return (
    <>
     <div className="all-img-cont-containor">
     <section className="ad-section">
        <div className="all-img-cont">
        
          <div className="admin-img-title">
            <h1>Image Gellery</h1>
            <p>
              {images &&
                images.reduce((totalImages, imageGroup) => {
                  // Check if imageGroup.images is an array before counting
                  if (imageGroup.images && Array.isArray(imageGroup.images)) {
                    return totalImages + imageGroup.images.length;
                  }
                  return totalImages;
                }, 0)}
            </p>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="image-gelery-containor">
                {images &&
                  images.map((imageGroup, groupIndex) => (
                    <div className="admin-image-cont" key={groupIndex}>
                      <LazyLoadImage
                        src={`http://localhost:8000/${imageGroup.path}`}
                        alt={groupIndex}
                        handleImageClick={handleImageClick}
                        image={imageGroup}
                      />
                    </div>
                  ))}
              </div>
            </>
          )}
            {resultPerPage < imageCount && (
            <div className="pagination-box">
              <Pagination
                totalItemsCount={imageCount}
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-items"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </div>
      </section>
      <aside>
        <ImageAsideBar
          filterImage={filterImage && filterImage}
          backend={true}
        />
        <ImageUploaderForm/>
      </aside>
     </div>
    </>
  );
};
