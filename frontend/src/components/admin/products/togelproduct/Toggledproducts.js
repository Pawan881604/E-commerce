import React, { useState } from "react";
import './togel.css';
const Togelproducts = () => {

    
    const [isToggled,setIsToggled] = useState(false)
  
    console.log(isToggled)
    return (
    <>
     <div className="togel-btn" style={{ background: isToggled ? 'green' : '#000' }}>
        <span className={!isToggled?'togel-btn-filter-prod':'togel-btn-filter-prod togel-btn-filter-prod-active'} onClick={()=>setIsToggled(!isToggled)} ></span>
     </div>
    </>
  );
};

export default Togelproducts;
