import React, { useEffect, useState } from "react";
import Select from 'react-select';

import './Shirt_graphic_cus_com.css'
const render_h1 = (text) => {
  return text.split("\n").map((line, index) => <h1 key={index}>{line}</h1>);
};
const render_dot1 = (dot_type, dot_amount) => {
  var dot_star = "";
  let dot_array = [];
  var font_size = {};
  if (dot_type === "จุด") {
    dot_star = "•";
    font_size = { fontSize: "1.7rem" };
  }
  if (dot_type === "ดาว") {
    dot_star = "★";
    font_size = { fontSize: "1.6rem" };
  }
  if (dot_amount === "1") {
    dot_array = ["\u00A0", "\u00A0", dot_star];
  }
  if (dot_amount === "2") {
    dot_array = ["\u00A0", dot_star, dot_star];
  }
  if (dot_amount === "3") {
    dot_array = [dot_star, dot_star, dot_star];
  }
  return (
    <>
      {dot_array.map((item, index) => {
        const re_index = dot_array.length - index;
        return (
          <h1 key={index} className={"dot" + re_index} >
            {item}
          </h1>
        );
      })}
    </>
  );
};
const render_dot_school = (dot_type, dot_amount) => {
  var dot_star = "";
  let dot_array = [];
  var font_size = {};
  if (dot_type === "จุด") {
    dot_star = "•";
    font_size = {
      fontSize: "1.7rem",
      marginTop: -20,
      marginBottom: -5,
      textAlign: "center",
    };
  }
  if (dot_type === "ดาว") {
    dot_star = "★";
    font_size = { fontSize: "1.2rem", marginTop: -15 };
  }
  if (dot_amount === "1") {
    dot_array = ["\u00A0", dot_star, "\u00A0"];
  }
  if (dot_amount === "2") {
    dot_array = ["\u00A0", dot_star, dot_star];
  }
  if (dot_amount === "3") {
    dot_array = [dot_star, dot_star, dot_star];
  }
  return (
    <h1 className={"dot_school"}>
      {dot_array}
    </h1>
  );
};
const render_dot_name = (dot_type, dot_amount) => {
  var dot_star = "";
  let dot_array = [];
  var font_size = {};
  if (dot_type === "จุด") {
    dot_star = "•";
    font_size = {
      fontSize: "1.7rem",
      marginTop: -20,
      marginBottom: -5,
      textAlign: "center",
    };
  }
  if (dot_type === "ดาว") {
    dot_star = "★";
    font_size = { fontSize: "1.2rem", marginTop: -15 };
  }
  if (dot_amount === "1") {
    dot_array = ["\u00A0", dot_star, "\u00A0"];
  }
  if (dot_amount === "2") {
    dot_array = ["\u00A0", dot_star, dot_star];
  }
  if (dot_amount === "3") {
    dot_array = [dot_star, dot_star, dot_star];
  }
  return (
    <h1 className={"dot_name"}>
      {dot_array}
    </h1>
  );
};

function Shirt_graphic_cus_com({
  setcheck_dot,
  checbox_dot,
  formdata,
  setformdata,
  set_dot_position,
  dot_position_class,
  Logo,Setlogo,
  Image,Setimage,
  formdata_info,setformdata_info,
  selectedRightLogo,setSelectedRightLogo,
  selectedLeftLogo,setSelectedLeftLogo
}) 
{
  
  const handlecheckbox_dot = (event) => {
    setcheck_dot(event.target.checked);
    if (event.target.checked === true) {
      setformdata((prevFormdata) => ({
        ...prevFormdata,
        dot: {
          ...prevFormdata.dot,
          type: "จุด",
          position: "บนชื่อโรงเรียน",
          amount_dot: "1",
          color_dot: "#0000FF",
        },
      }));
    } //auto input dot1
    else if (event.target.checked === false) {
      console.log(event.target.checked);
      setformdata((prevFormdata) => ({
        ...prevFormdata,
        dot: {
          ...prevFormdata.dot,
          type: "",
          position: "",
          amount_dot: "",
          color_dot: "",
        },
      }));
    } //remove input dot1
  };
  const handle_text = (e) => {
    const { name, value } = e.target;
    setformdata((prevData) => ({
      ...prevData,
      text_right: {
        ...prevData.text_right,
        [name]: value,
      },
      text_left: {
        ...prevData.text_left,
        [name]: value,
      },
    }));
  };
  const handledot = (event) => {
    const { name, value } = event.target;
    setformdata((prevFormdata) => ({
      ...prevFormdata,
      dot: {
        ...prevFormdata.dot,
        [name]: value,
      },
    }));
  };
  const handledot_position = (event) => {
    const { name, value } = event.target;
    setformdata((prevFormdata) => ({
      ...prevFormdata,
      dot: {
        ...prevFormdata.dot,
        [name]: value,
      },
    }));
    if (event.target.value === "บนชื่อโรงเรียน") {
      set_dot_position((data_position) => ({
        ...data_position,
        onschool: "onschool",
        onname: "hidden",
        dot_left: "hidden",
        dot_right: "hidden",
      }));
    }
    if (event.target.value === "บนชื่อนักเรียน") {
      set_dot_position((data_position) => ({
        ...data_position,
        onschool: "hidden",
        onname: "onname",
        dot_left: "hidden",
        dot_right: "hidden",
      }));
    }
    if (event.target.value === "บนปกขวา") {
      set_dot_position((data_position) => ({
        ...data_position,
        onschool: "hidden",
        onname: "hidden",
        dot_left: "hidden",
        dot_right: "dot_right",
      }));
    }
    if (event.target.value === "บนปกซ้าย") {
      set_dot_position((data_position) => ({
        ...data_position,
        onschool: "hidden",
        onname: "hidden",
        dot_left: "dot_left",
        dot_right: "hidden",
      }));
    }
  };

  const Option_select = [
    {
      label: "ไม่มี",
      image: "",
    },
    ...Image.map((item) => ({
      label: item.name,
      image: `/uploads/${item.path.split("/").pop()}`,
    })),
  ];
  const Custom_option = (props) => {
    const { innerRef, innerProps, data } = props;
    const null_check = (null_data) => 
      {if(null_data == "ไม่มี"){}return null}
    return (
      <>
        <div ref={innerRef} {...innerProps} className="custom-option">
          <img
            src={data.image}
            alt={null_check(data.label)}
            style={{ width: 20, height: 20, marginRight: 10, marginTop: 10 }}
          />
          {data.label}
        </div>
      </>
    );
  };

  const handlechange_logo = (selectedOption,position) =>
    {
      console.log(selectedOption)
      Setlogo((prevData) => {
        if (position === 'left') {
          setSelectedLeftLogo(selectedOption);
          setSelectedRightLogo(null);  // Clear the right logo selection
          return {
            ...prevData,
            Logo_left: {
              ...prevData.Logo_left,
              school_name: selectedOption.label,
              image_path: selectedOption.image
            },
            Logo_right: {
              ...prevData.Logo_right,
              school_name: "ไม่มี",
              image_path: null
            }
          };
        } else if (position === 'right') {
          setSelectedRightLogo(selectedOption);
          setSelectedLeftLogo(null);  // Clear the left logo selection
          return {
            ...prevData,
            Logo_right: {
              ...prevData.Logo_right,
              school_name: selectedOption.label,
              image_path: selectedOption.image
            },
            Logo_left: {
              ...prevData.Logo_left,
              school_name: "ไม่มี",
              image_path: null
            }
          };
        }
      });
    }
      const handleChange_info = (event) =>
        {
            const { name, value } = event.target;
            setformdata_info((prevFormData) => ({
              ...prevFormData,
              [name]: value
            }));
          };
  
  return (
    <>
      <div className="container_form">
        <div className="grid_input">
          <div className="input_right">
            <form onSubmit={""}>
              <h2 style={{ fontSize: "3vh" }}>สิ่งที่ต้องการปักปักด้านขวา</h2>

              <div className="input_right_container">
                <div className="textarea_input_right">
                  <textarea
                    value={formdata.text_right.textright_input}
                    name="textright_input"
                    onChange={handle_text}
                    placeholder="สิ่งที่ต้องการปัก"
                  />
                </div>
                <div className="color_container_right">
                  <input
                    className="color_input_right"
                    type="color"
                    value={formdata.text_right.color_right}
                    name="color_right"
                    onChange={handle_text}
                  />
                </div>
                <div style={{}}>
                  <Select
                    value={selectedRightLogo}
                    options={Option_select}
                    components={{ Option: Custom_option }}
                    placeholder="โปรดเลือกโลโก้(หากมี)"
                    onChange={(selectedOption)=>handlechange_logo(selectedOption,"right")}
                  />
                </div>
              </div>
              <h2 style={{ fontSize: "3vh" }}>สิ่งที่ต้องการปักปักด้านซ้าย</h2>
              <div className="input_left_container">
                <div className="textarea_input_left">
                  <textarea
                    value={formdata.text_left.textleft_input}
                    name="textleft_input"
                    onChange={handle_text}
                    placeholder="สิ่งที่ต้องการปัก"
                  />
                </div>
                <div className="color_container_left">
                  <input
                    className="color_input_left"
                    type="color"
                    value={formdata.text_left.color_left}
                    name="color_left"
                    onChange={handle_text}
                  />
                </div>
                <div>
                  <Select
                    value={selectedLeftLogo}
                    options={Option_select}
                    components={{ Option: Custom_option }}
                    placeholder="โปรดเลือกโลโก้(หากมี)"
                    onChange={(selectedOption)=>handlechange_logo(selectedOption,"left")}
                  />
                </div>
              </div>

              <div className="dot_checkbox">
                <div style={{ display: "flex" }}>
                  <h2 style={{ fontSize: "3vh" }}>มีจุดหรือไม่</h2>
                  <input
                    style={{}}
                    type="checkbox"
                    checked={checbox_dot}
                    onChange={handlecheckbox_dot}
                  />
                </div>
                {checbox_dot ? (
                  <div>
                    <div className="dot_type">
                      {/*
                        <p>
                          {formdata.dot.type +
                            formdata.dot.position +
                            formdata.dot.amount_dot +
                            formdata.dot.color_dot}
                        </p>*/}
                      <p>จุดหรือดาว</p>
                      <select name="type" value={formdata.dot.type} onChange={handledot}>
                        {/*<option value="no_dot">จุดหรือดาว</option>*/}
                        <option value="จุด">จุด</option>
                        <option value="ดาว">ดาว</option>
                      </select>
                    </div>

                    <div className="dot_position">
                      <p>ตำแหน่งของจุด</p>
                      <select name="position" value={formdata.dot.position} onChange={handledot_position}>
                        {/*<option value="no_dot">ตำแหน่งของจุด</option>*/}
                        <option value="บนชื่อโรงเรียน">บนชื่อโรงเรียน</option>
                        <option value="บนชื่อนักเรียน">บนชื่อนักเรียน</option>
                        <option value="บนปกขวา">บนปกขวา</option>
                        <option value="บนปกซ้าย">บนปกซ้าย</option>
                      </select>
                    </div>

                    <div className="dot_amount">
                      <p>จำนวนจุด</p>
                      <select name="amount_dot" value={formdata.dot.amount_dot} onChange={handledot}>
                        <option value="1">1 จุด</option>
                        <option value="2">2 จุด</option>
                        <option value="3">3 จุด</option>
                      </select>
                    </div>

                    <div className="dot_color" onChange={handledot}>
                      <p>สีของจุด</p>
                      <input
                        type="color"
                        name="color_dot"
                        value={formdata.dot.color_dot}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label htmlFor="">รายละเอียด</label>
                <textarea
                  name="info_data"
                  id=""
                  placeholder="สิ่งที่ต้องการปัก..."
                  value={formdata_info.info_data}
                  onChange={handleChange_info}
                ></textarea>
              </div>

              <div>
                <label htmlFor="">ชื่อผู้สั่ง</label>
                <input
                  type="text"
                  name="parent_name"
                  id=""
                  value={formdata_info.parent_name}
                  onChange={handleChange_info}
                />
              </div>
              <div>
                <label htmlFor="">เบอร์โทร</label>
                <input
                  type="text"
                  name="phone_number"
                  id=""
                  value={formdata_info.phone_number}
                  onChange={handleChange_info}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="body_shirt">
          <h1>รูปแบบกราฟิค</h1>
          <div className="shirt_design">
            <img src="image_folder/S_Shirt.png" alt="" />
            <div className="grid_dot">
              <div 
              className={dot_position_class.dot_left}
              style={{ color: formdata.dot.color_dot }}
              >
                {render_dot1(formdata.dot.type, formdata.dot.amount_dot)}
              </div>
              <div
                className={dot_position_class.dot_right}
                style={{ color: formdata.dot.color_dot }}
              >
                {render_dot1(formdata.dot.type, formdata.dot.amount_dot)}
              </div>
            </div>
            <div className="grid_name">
              <div className="on_right">
                <div
                  className={dot_position_class.onschool}
                  style={{ color: formdata.dot.color_dot }}
                >
                  {render_dot_school(
                    formdata.dot.type,
                    formdata.dot.amount_dot
                  )}
                </div>
                <div className="Logo_">
                  {Logo.Logo_right.image_path && (
                    <img
                      src={Logo.Logo_right.image_path}
                      alt={Logo.Logo_right.school_name}
                    />
                  )}
                </div>
                <div style={{ color: formdata.text_right.color_right }}>
                  {render_h1(formdata.text_right.textright_input)}
                </div>
              </div>

              <div className="on_left">
                <div
                  className={dot_position_class.onname}
                  style={{ color: formdata.dot.color_dot }}
                >
                  {render_dot_name(formdata.dot.type, formdata.dot.amount_dot)}
                </div>
                <div className="Logo_">
                  {Logo.Logo_left.image_path && (
                    <img
                      src={Logo.Logo_left.image_path}
                      alt={Logo.Logo_left.school_name}
                    />
                  )}
                </div>
                <div style={{ color: formdata.text_left.color_left }}>
                  {render_h1(formdata.text_left.textleft_input)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Shirt_graphic_cus_com;
