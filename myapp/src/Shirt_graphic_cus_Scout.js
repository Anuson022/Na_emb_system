import React, { useEffect, useState } from "react";
import Select from "react-select";

import "./Shirt_graphic_cus_com.css";

const render_h1 = (text) => {
  return text.split("\n").map((line, index) => <h1 key={index}>{line}</h1>);
};

function Shirt_graphic_cus_PE({
  SetShirtOptions,
  Scoutdata,
  setScoutdata,
  SNamePositionClass_Scout,
  SetSNamePositionClass_Scout,
}) 
{
  const [ScoutImage,SetScoutImage] = useState(Scoutdata.path)
  const [ColorSelect,SetColorSelect] = useState("")
  useEffect(()=>
    {
      SetScoutImage(Scoutdata.path)
      const colorofscout = `${Scoutdata.SName.color_border}_${Scoutdata.SName.cloth}_${Scoutdata.SName.color}`;
      console.log(colorofscout)
      SetColorSelect(colorofscout)
    },[Scoutdata.SName])

  const handleRemove = (label) => {
    SetShirtOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.label === label ? { ...option, selected: false } : option
      )
    );
    if (label === "เสื้อลูกเสือ&เนตรนารี") {
      setScoutdata((prev) => ({
        ...prev,
        Selected: false,
        path:"/image_folder/L_Shirt.png",
        SName: {
          fullname: "",
          position_n: "ชื่อด้านขวา",
          color: "Blue",
          color_border: "#FCF5E5",
          cloth: "White"
        },
      }));
    }
  };

  const handle_text = (e) => {
    const { name, value } = e.target;
    setScoutdata((prevData) => ({
      ...prevData,
      SName: {
        ...prevData.SName,
        [name]: value,
      },
    }));
    
  };
  
  const HandleScoutImage = (e) =>
  {
    setScoutdata((prev) => ({
        ...prev,
        path:e.target.value
      }))
    SetScoutImage(e.target.value)
  }
  const HandleColorScout = (e) =>
  {
    SetColorSelect(e.target.value)
    const select_now = e.target.value
    const [frameColor, clothColor, textColor] = select_now.split('_');
    console.log(frameColor)
    console.log(clothColor)
    console.log(textColor)
    setScoutdata((prev) => ({
      ...prev,
      SName:
      {
        ...prev.SName,
        color: textColor,
        color_border: frameColor,
        cloth: clothColor
      }
    }))
  }


  return (
    <>{Scoutdata.Selected &&
      <div className="container_form" style={{alignItems:'center'}}>
        <div className="grid_input" style={{}}>
          <form onSubmit={""} >
            <div className="div-border" >
              <h2>ชื่อ - นามสกุล (ลูกเสือ&เนตรนารี&ยุวกาชาติ)</h2>
              <div className="input_right_container" >
                <div className="textarea_input_right">
                  <textarea
                    value={Scoutdata.SName.fullname}
                    name="fullname"
                    onChange={handle_text}
                    placeholder="ชื่อ - นามสกุล"
                  />
                </div>
                <br />
              <div style={{display:'flex',justifyContent:'space-around'}}>
              <div style={{display:'flex',gap:'1rem',alignItems:'center'}}>
                <h2>เสื้อ :</h2>
                <select name="" id="" value={Scoutdata.path} onChange={HandleScoutImage} style={{          
                  height: '3rem',padding: '0rem',fontSize: '1.5rem',fontFamily:'RSU_regular'}}>
                  <option value="/image_folder/L_Shirt.png">ลูกเสือ</option>
                  <option value="/image_folder/N_Shirt.png">เนตรนารี</option>
                  <option value="/image_folder/U_Shirt.png">ยุวกาชาติ</option>
                </select>
              </div>
              <div style={{display:'flex',gap:'1rem',alignItems:'center'}}>
                <h2>รูปแบบสีของการปัก :</h2>
                <select value={ColorSelect} onChange={HandleColorScout} style={{          
                  height: '3rem',padding: '0rem',fontSize: '1.5rem',fontFamily:'RSU_regular'}}>
                  <option value="#FCF5E5_white_blue">กรอบสีขาว ผ้าสีขาว ชื่อสีน้ำเงิน</option>
                  <option value="#FCF5E5_white_black">กรอบสีขาว ผ้าสีขาว ชื่อสีดำ</option>
                  <option value="red_lightcoral_yellow">กรอบสีแดง ผ้าสีแดง ชื่อสีเหลือง</option>
                  <option value="black_#36454F_yellow">กรอบสีดำ ผ้าสีดำ ชื่อสีเหลือง</option>
                </select>
              </div>
              </div>



              </div>
            </div>



            <br />

          </form>
        </div>

        <div className="body_shirt">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'20rem'}}>
            <h2 style={{fontSize:'2rem'}}>รูปแบบกราฟิค</h2>
            <button onClick={() => handleRemove("เสื้อลูกเสือ&เนตรนารี")}>นำออก</button>
          </div>

          <div className="shirt_design">
            <img className="shirt_img" src={ScoutImage} alt="" />
            <div className="grid_dot">
            </div>
            <div className="grid_name">
              <div className="on_right">
                
                <div
                  className={SNamePositionClass_Scout.fullname_right}
                  style={{ color: Scoutdata.SName.color ,marginTop:'-0.5rem',marginRight:'-0.5rem',
                    backgroundColor:Scoutdata.SName.cloth}}
                >
                  <div style={{borderStyle:'solid',borderWidth:'4px',
                    borderColor:Scoutdata.SName.color_border,fontSize:'0.75rem',
                    width:'auto',minWidth:'8rem',maxWidth:'10rem',height:'2.2rem'}}>
                  {render_h1(Scoutdata.SName.fullname)}
                </div>
                </div>
              </div>


            </div>
          </div>
        </div>
        <br /><br />
      </div>
      }
      
    </>
  );
}

export default Shirt_graphic_cus_PE;
