import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import "./imageUploader.css";

import AllImage from "./AllImage";
import { ImageUploaderForm } from "./ImageUploaderForm";

const ImgUploader = ({ open, close }) => {
  const [tabValue, setTabValue] = useState(true);

  //----------------------------------------------

  return (
    <>
      <Dialog open={open} className="tab-dialog">
        <DialogTitle>Image upload</DialogTitle>
        <DialogContent>
          <div>
            <div className="tabs">
              <div onClick={(e) => setTabValue(true)}>Upload Image</div>
              <div onClick={(e) => setTabValue(false)}>galary</div>
            </div>
            <div className="content-tab">
              <div className={tabValue ? "showTab" : "hideTab"}>
                <ImageUploaderForm />

                {/* <ImageAsideBar
                  filterImage={filterImage && filterImage}
                  backend={false}
                /> */}
              </div>
              <div className={!tabValue ? "showTab" : "hideTab"}>
                <AllImage />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button className="save-select-btn" onClick={() => close()}>
            Save
          </Button>
          <Button onClick={() => close()}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ImgUploader;
