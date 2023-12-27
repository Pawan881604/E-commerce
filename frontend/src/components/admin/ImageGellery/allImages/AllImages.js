import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Aside } from "../../aside/Aside";

import "./allImage.css";
import { ImageGelery } from "./ImageGelery";
import MetaData from "../../../layout/metaData/MetaData";

const AllImages = () => {
  return (
    <>
    <MetaData
        title={'Admin all images'}
        content={'Admin all images'}
        keywords={'Admin all images'}
      />
     
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <ImageGelery />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllImages;
