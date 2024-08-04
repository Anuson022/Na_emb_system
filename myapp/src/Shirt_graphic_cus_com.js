import React, { useEffect, useState } from "react";
import Select from "react-select";

import "./Shirt_graphic_cus_com.css";
const render_h1 = (text) => {
  return text.split("\n").map((line, index) => <h1 key={index}>{line}</h1>);
};
const render_school = (text) => {
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
          <h1 key={index} className={"dot" + re_index}>
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
  return <h1 className={"dot_school"}>{dot_array}</h1>;
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
  return <h1 className={"dot_name"}>{dot_array}</h1>;
};

function Shirt_graphic_cus_com({
  setcheck_dot,
  checkbox_dot,
  setcheck_logo,
  checkbox_logo,
  setcheck_undername,
  checkbox_undername,
  formdata,
  setformdata,
  set_dot_position,
  dot_position_class,
  Image,
  Setimage,
  formdata_info,
  setformdata_info,
  SNamePositionClass,
  SetSNamePositionClass,
  SSchoolPositionClass,
  SetSSchoolPositionClass,
  SLogoPositionClass,
  SetSLogoPositionClass,
  selectedLogo,
  setSelectedLogo,
}) {
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
  const HandleCheckboxLogo = (event) => {
    setcheck_logo(event.target.checked);
    if (event.target.checked === true) {
      setformdata((prevFormdata) => ({
        ...prevFormdata,
        SLogo: {
          ...prevFormdata.SLogo,
          school_name: "",
          image_path: "",
          position_l: "โลโก้ด้านขวา",
        },
      }));
    } //auto input dot1
    else if (event.target.checked === false) {
      console.log(selectedLogo);
      setSelectedLogo(null);
      setformdata((prevFormdata) => ({
        ...prevFormdata,
        SLogo: {
          ...prevFormdata.SLogo,
          school_name: "",
          image_path: "",
          position_l: "",
        },
      }));
    } //remove input dot1
    /*
    setformdata((prevFormdata) => ({
      ...prevFormdata,
      SUndername: {
        ...prevFormdata.SUndername,
        under_name: "",
        color0: "#0000FF",
      },
    }));
    */
  };
  const HandleCheckboxUndername = (event) => {
    setcheck_undername(event.target.checked);
    if (event.target.checked === true) {
      setformdata((prevFormdata) => ({
        ...prevFormdata,
        SUndername: {
          ...prevFormdata.SUndername,
          under_name: "",
          color0: "#0000FF",
        },
      }));
    } //auto input dot1
    else if (event.target.checked === false) {
      setformdata((prevFormdata) => ({
        ...prevFormdata,
        SUndername: {
          ...prevFormdata.SUndername,
          under_name: "",
          color0: "#0000FF",
        },
      }));
    }
  };

  const handle_text = (e) => {
    const { name, value } = e.target;
    setformdata((prevData) => ({
      ...prevData,
      SName: {
        ...prevData.SName,
        [name]: value,
      },
      SUndername: {
        ...prevData.SUndername,
        [name]: value,
      },
      SSchool: {
        ...prevData.SSchool,
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
  const HandleName_position = (event) => {
    setformdata((prevData) => ({
      ...prevData,
      SName: {
        ...prevData.SName,
        position_n: event.target.value,
      },
    }));
  };
  const HandleSchool_position = (event) => {
    setformdata((prevData) => ({
      ...prevData,
      SSchool: {
        ...prevData.SSchool,
        position_s: event.target.value,
      },
    }));
  };
  const HandleLogo_position = (event) => {
    setformdata((prevData) => ({
      ...prevData,
      SLogo: {
        ...prevData.SLogo,
        position_l: event.target.value,
      },
    }));
  };
  const Option_select = [
    /*{
      label: "ไม่มี",
      image: "",
    },*/
    ...Image.map((item) => ({
      label: item.name,
      image: `/uploads/${item.path.split("/").pop()}`,
    })),
  ];
  const Custom_option = (props) => {
    const { innerRef, innerProps, data } = props;
    const null_check = (null_data) => {
      if (null_data == "ไม่มี") {
      }
      return null;
    };
    return (
      <>
        <div ref={innerRef} {...innerProps} className="custom-option-logo">
          <img
            src={data.image}
            alt={null_check(data.label)}
            style={{ width: 80, height: 80 }}
          />
          <p>{data.label}</p>
        </div>
      </>
    );
  };

  const handlechange_logo = (selectedOption) => {
    console.log(selectedOption);
    setSelectedLogo(selectedOption);
    setformdata((prevData) => ({
      ...prevData,
      SLogo: {
        ...prevData.SLogo,
        school_name: selectedOption.label,
        image_path: selectedOption.image,
      },
    }));
  };

  return (
    <>
      <div className="container_form">
        <div className="grid_input">
          <form onSubmit={""}>
            <div className="div-border">
              <h2>ชื่อ - นามสกุล</h2>
              <div className="input_right_container">
                <div className="textarea_input_right">
                  <textarea
                    value={formdata.SName.fullname}
                    name="fullname"
                    onChange={handle_text}
                    placeholder="ชื่อ - นามสกุล"
                  />
                </div>
                {checkbox_undername ? (
                  <>
                    <div className="textarea_input_right">
                      <textarea
                        value={formdata.SUndername.under_name}
                        name="under_name"
                        onChange={handle_text}
                        placeholder="การปักใต้ชื่อ"
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}

                <div className="checkbox-color">
                  <div className="dot_checkbox">
                    <div style={{ display: "flex" }}>
                      <h2>การปักใต้ชื่อ เช่น สาขา,ชื่อเล่น</h2>
                      <input
                        style={{}}
                        type="checkbox"
                        checked={checkbox_undername}
                        onChange={HandleCheckboxUndername}
                      />
                    </div>
                  </div>

                  <div className="color_container_right">
                    <h2>สีของด้าย</h2>
                    <input
                      className="color_input_right"
                      type="color"
                      value={formdata.SName.color}
                      name="color"
                      onChange={handle_text}
                    />
                  </div>
                </div>
                <div style={{ marginTop: "-1em" }}>
                  <h2>ตำแหน่งของชื่อ</h2>
                  <div className="radio-position">
                    <label>
                      <input
                        type="radio"
                        name="Name-Position"
                        checked={formdata.SName.position_n === "ชื่อด้านขวา"}
                        onChange={HandleName_position}
                        value="ชื่อด้านขวา"
                      />
                      ด้านขวา
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="Name-Position"
                        checked={formdata.SName.position_n === "ชื่อด้านซ้าย"}
                        onChange={HandleName_position}
                        value="ชื่อด้านซ้าย"
                      />
                      ด้านซ้าย
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="Name-Position"
                        checked={formdata.SName.position_n === "none"}
                        onChange={HandleName_position}
                        value="none"
                      />
                      ไม่มี
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <div className="div-border">
              <h2>ตัวย่อโรงเรียน</h2>
              <div className="textarea_input_right">
                <textarea
                  value={formdata.SSchool.name}
                  name="name"
                  onChange={handle_text}
                  placeholder="ตัวย่อโรงเรียน"
                />
              </div>
              <div className="checkbox-color">
                <div></div>
                <div className="color_container_right">
                  <h2>สีของด้าย</h2>
                  <input
                    className="color_input_right"
                    type="color"
                    value={formdata.SSchool.color1}
                    name="color1"
                    onChange={handle_text}
                  />
                </div>
              </div>
              <div style={{ marginTop: "-2em" }}>
              <div className="dot_checkbox">
                <div style={{ display: "flex" }}>
                  <h2>มีโลโก้หรือไม่</h2>
                  <input
                    style={{}}
                    type="checkbox"
                    checked={checkbox_logo}
                    onChange={HandleCheckboxLogo}
                  />
                </div>
                {checkbox_logo ? (
                  <>
                    <div>
                      <Select
                        className="Select-logo"
                        classNamePrefix="Select-logo"
                        value={selectedLogo}
                        options={Option_select}
                        components={{ Option: Custom_option }}
                        placeholder="โปรดเลือกโลโก้(หากมี)"
                        onChange={(selectedOption) =>
                          handlechange_logo(selectedOption)
                        }
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
                
                <h2>ตำแหน่ง</h2>
                <div /*school position*/ className="radio-position">
                  <label>
                    <input
                      type="radio"
                      name="SchoolName-Position"
                      checked={
                        formdata.SSchool.position_s === "ชื่อโรงเรียนด้านขวา"
                      }
                      onChange={HandleSchool_position}
                      value="ชื่อโรงเรียนด้านขวา"
                    />
                    ด้านขวา
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="SchoolName-Position"
                      checked={
                        formdata.SSchool.position_s === "ชื่อโรงเรียนด้านซ้าย"
                      }
                      onChange={HandleSchool_position}
                      value="ชื่อโรงเรียนด้านซ้าย"
                    />
                    ด้านซ้าย
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="SchoolName-Position"
                      checked={formdata.SSchool.position_s === "none"}
                      onChange={HandleSchool_position}
                      value="none"
                    />
                    ไม่มี
                  </label>
                </div>
              </div>
              </div>
            </div>

            <br />
            <div className="div-border">
            <div className="dot_checkbox">
              <div style={{ display: "flex" }}>
                <h2>มีจุดหรือไม่</h2>
                <input
                  style={{}}
                  type="checkbox"
                  checked={checkbox_dot}
                  onChange={handlecheckbox_dot}
                />
              </div>
              {checkbox_dot ? (
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
                    <select
                      name="type"
                      value={formdata.dot.type}
                      onChange={handledot}
                    >
                      {/*<option value="no_dot">จุดหรือดาว</option>*/}
                      <option value="จุด">จุด</option>
                      <option value="ดาว">ดาว</option>
                    </select>
                  </div>

                  <div className="dot_position">
                    <p>ตำแหน่งของจุด</p>
                    <select
                      name="position"
                      value={formdata.dot.position}
                      onChange={handledot_position}
                    >
                      {/*<option value="no_dot">ตำแหน่งของจุด</option>*/}
                      <option value="บนชื่อโรงเรียน">บนชื่อโรงเรียน</option>
                      <option value="บนชื่อนักเรียน">บนชื่อนักเรียน</option>
                      <option value="บนปกขวา">บนปกขวา</option>
                      <option value="บนปกซ้าย">บนปกซ้าย</option>
                    </select>
                  </div>
                  <div className="amount-color">
                  <div className="dot_amount">
                    <p>จำนวนจุด</p>
                    <select
                      name="amount_dot"
                      value={formdata.dot.amount_dot}
                      onChange={handledot}
                    >
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
                      className="color_input_right"
                    />
                  </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            </div>
          </form>
        </div>

        <div className="body_shirt">
          <h2 style={{fontSize:'2rem'}}>รูปแบบกราฟิค</h2>
          <div className="shirt_design">
            <img className="shirt_img" src="image_folder/S_Shirt.png" alt="" />
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
                <div className={SLogoPositionClass.right}>
                  {formdata.SLogo.image_path && (
                    <img
                      src={formdata.SLogo.image_path}
                      alt={formdata.SLogo.school_name}
                    />
                  )}
                </div>
                <div
                  className={SSchoolPositionClass.right}
                  style={{ color: formdata.SSchool.color1 }}
                >
                  {render_school(formdata.SSchool.name)}
                </div>
                <div
                  className={SNamePositionClass.fullname_right}
                  style={{ color: formdata.SName.color }}
                >
                  {render_h1(formdata.SName.fullname)}
                  {render_h1(formdata.SUndername.under_name)}
                </div>
              </div>

              <div className="on_left">
                <div
                  className={dot_position_class.onname}
                  style={{ color: formdata.dot.color_dot }}
                >
                  {render_dot_name(formdata.dot.type, formdata.dot.amount_dot)}
                </div>
                <div className={SLogoPositionClass.left}>
                  {formdata.SLogo.image_path && (
                    <img
                      src={formdata.SLogo.image_path}
                      alt={formdata.SLogo.school_name}
                    />
                  )}
                </div>
                <div
                  className={SSchoolPositionClass.left}
                  style={{ color: formdata.SSchool.color1 }}
                >
                  {render_school(formdata.SSchool.name)}
                </div>
                <div
                  className={SNamePositionClass.fullname_left}
                  style={{ color: formdata.SName.color }}
                >
                  {render_h1(formdata.SName.fullname)}
                  {render_h1(formdata.SUndername.under_name)}
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
