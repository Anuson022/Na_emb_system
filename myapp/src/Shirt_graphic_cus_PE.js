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

function Shirt_graphic_cus_PE({
  SetShirtOptions,
  setcheck_dot_PE,
  checkbox_dot_PE,
  setcheck_undername_PE,
  checkbox_undername_PE,
  PEdata,
  setPEdata,
  set_dot_position_PE,
  dot_position_class_PE,
  SNamePositionClass_PE,
  SetSNamePositionClass_PE,
}) {
  const handleRemove = (label) => {
    SetShirtOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.label === label ? { ...option, selected: false } : option
      )
    );
    if (label === "เสื้อพละ") {
      setPEdata((prev) => ({
        ...prev,
        Selected: false,
        SName: {
          fullname: "",
          color: "#0000FF",
          position_n: "ชื่อด้านขวา",
        },
        SUndername: {
          under_name: "",
          color0: "#0000FF",
        },
        dot: {
          type: "",
          position: "",
          amount_dot: "",
          color_dot: "",
        },
      }));
    }
  };
  const handlecheckbox_dot_PE = (event) => {
    setcheck_dot_PE(event.target.checked);
    if (event.target.checked === true) {
      setPEdata((prevPEdata) => ({
        ...prevPEdata,
        dot: {
          ...prevPEdata.dot,
          type: "จุด",
          position: "บนชื่อนักเรียนด้านขวา",
          amount_dot: "1",
          color_dot: "#0000FF",
        },
      }));
    } //auto input dot1
    else if (event.target.checked === false) {
      console.log(event.target.checked);
      setPEdata((prevPEdata) => ({
        ...prevPEdata,
        dot: {
          ...prevPEdata.dot,
          type: "",
          position: "",
          amount_dot: "",
          color_dot: "",
        },
      }));
    } //remove input dot1
  };

  const HandleCheckboxUndername = (event) => {
    setcheck_undername_PE(event.target.checked);
    if (event.target.checked === true) {
      setPEdata((prevPEdata) => ({
        ...prevPEdata,
        SUndername: {
          ...prevPEdata.SUndername,
          under_name: "",
          color0: "#0000FF",
        },
      }));
    } //auto input dot1
    else if (event.target.checked === false) {
      setPEdata((prevPEdata) => ({
        ...prevPEdata,
        SUndername: {
          ...prevPEdata.SUndername,
          under_name: "",
          color0: "#0000FF",
        },
      }));
    }
  };

  const handle_text = (e) => {
    const { name, value } = e.target;
    setPEdata((prevData) => ({
      ...prevData,
      SName: {
        ...prevData.SName,
        [name]: value,
      },
      SUndername: {
        ...prevData.SUndername,
        [name]: value,
      },
    }));
    
  };
  const handledot = (event) => {
    const { name, value } = event.target;
    setPEdata((prevPEdata) => ({
      ...prevPEdata,
      dot: {
        ...prevPEdata.dot,
        [name]: value,
      },
    }));
  };
  const handledot_position = (event) => {
    const { name, value } = event.target;
    setPEdata((prevPEdata) => ({
      ...prevPEdata,
      dot: {
        ...prevPEdata.dot,
        [name]: value,
      },
    }));
    if (event.target.value === "บนชื่อนักเรียนด้านขวา") {
      set_dot_position_PE((data_position) => ({
        ...data_position,
        onschool: "onschool",
        onname: "hidden",
        dot_left: "hidden",
        dot_right: "hidden",
      }));
    }
    if (event.target.value === "บนชื่อนักเรียนด้านซ้าย") {
      set_dot_position_PE((data_position) => ({
        ...data_position,
        onschool: "hidden",
        onname: "onname",
        dot_left: "hidden",
        dot_right: "hidden",
      }));
    }
    if (event.target.value === "บนปกขวา") {
      set_dot_position_PE((data_position) => ({
        ...data_position,
        onschool: "hidden",
        onname: "hidden",
        dot_left: "hidden",
        dot_right: "dot_right",
      }));
    }
    if (event.target.value === "บนปกซ้าย") {
      set_dot_position_PE((data_position) => ({
        ...data_position,
        onschool: "hidden",
        onname: "hidden",
        dot_left: "dot_left",
        dot_right: "hidden",
      }));
    }
  };
  const HandleName_position = (event) => {
    setPEdata((prevData) => ({
      ...prevData,
      SName: {
        ...prevData.SName,
        position_n: event.target.value,
      },
    }));
  };
  const HandleSchool_position = (event) => {
    setPEdata((prevData) => ({
      ...prevData,
      SSchool: {
        ...prevData.SSchool,
        position_s: event.target.value,
      },
    }));
  };
  const HandleLogo_position = (event) => {
    setPEdata((prevData) => ({
      ...prevData,
      SLogo: {
        ...prevData.SLogo,
        position_l: event.target.value,
      },
    }));
  };




  return (
    <>{PEdata.Selected &&
      <div className="container_form" style={{alignItems:'center'}}>
        <div className="grid_input">
          <form onSubmit={""}>
            <div className="div-border">
              <h2>ชื่อ - นามสกุล (เสื้อพละ)</h2>
              <div className="input_right_container">
                <div className="textarea_input_right">
                  <textarea
                    value={PEdata.SName.fullname}
                    name="fullname"
                    onChange={handle_text}
                    placeholder="ชื่อ - นามสกุล"
                  />
                </div>


                <div className="checkbox-color">
                  <div className="dot_checkbox">
                    <div style={{ display: "flex" }}>

                    </div>
                  </div>

                  <div className="color_container_right">
                    <h2>สีของด้าย</h2>
                    <input
                      className="color_input_right"
                      type="color"
                      value={PEdata.SName.color}
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
                        checked={PEdata.SName.position_n === "ชื่อด้านขวา"}
                        onChange={HandleName_position}
                        value="ชื่อด้านขวา"
                      />
                      ด้านขวา
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="Name-Position"
                        checked={PEdata.SName.position_n === "ชื่อด้านซ้าย"}
                        onChange={HandleName_position}
                        value="ชื่อด้านซ้าย"
                      />
                      ด้านซ้าย
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="Name-Position"
                        checked={PEdata.SName.position_n === "none"}
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
            <div className="dot_checkbox">
              <div style={{ display: "flex" }}>
                <h2>มีจุดหรือไม่</h2>
                <input
                  style={{}}
                  type="checkbox"
                  checked={checkbox_dot_PE}
                  onChange={handlecheckbox_dot_PE}
                />
              </div>
              {checkbox_dot_PE ? (
                <div>
                  <div className="dot_type">
                    {/*
                        <p>
                          {PEdata.dot.type +
                            PEdata.dot.position +
                            PEdata.dot.amount_dot +
                            PEdata.dot.color_dot}
                        </p>*/}
                    <p>จุดหรือดาว</p>
                    <select
                      name="type"
                      value={PEdata.dot.type}
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
                      value={PEdata.dot.position}
                      onChange={handledot_position}
                    >
                      {/*<option value="no_dot">ตำแหน่งของจุด</option>*/}
                      <option value="บนชื่อนักเรียนด้านขวา">บนชื่อนักเรียนด้านขวา</option>
                      <option value="บนชื่อนักเรียนด้านซ้าย">บนชื่อนักเรียนด้านซ้าย</option>
                      <option value="บนปกขวา">บนปกขวา</option>
                      <option value="บนปกซ้าย">บนปกซ้าย</option>
                    </select>
                  </div>
                  <div className="amount-color">
                  <div className="dot_amount">
                    <p>จำนวนจุด</p>
                    <select
                      name="amount_dot"
                      value={PEdata.dot.amount_dot}
                      onChange={handledot}
                    >
                      <option value="1">1 จุด</option>
                      <option value="2">2 จุด</option>
                      <option value="3">3 จุด</option>
                    </select>
                  </div>

                  <div className="dot_color" onChange={handledot}>
                    <h2>สีของจุด</h2>
                    <input
                      type="color"
                      name="color_dot"
                      value={PEdata.dot.color_dot}
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
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'20rem'}}>
            <h2 style={{fontSize:'2rem'}}>รูปแบบกราฟิค</h2>
            <button onClick={() => handleRemove("เสื้อพละ")}>นำออก</button>
          </div>
          <div className="shirt_design">
            <img className="shirt_img" src="/image_folder/PE1_Shirt.png" alt="" />
            <div className="grid_dot">
              <div
                className={dot_position_class_PE.dot_left}
                style={{ color: PEdata.dot.color_dot }}
              >
                {render_dot1(PEdata.dot.type, PEdata.dot.amount_dot)}
              </div>
              <div
                className={dot_position_class_PE.dot_right}
                style={{ color: PEdata.dot.color_dot }}
              >
                {render_dot1(PEdata.dot.type, PEdata.dot.amount_dot)}
              </div>
            </div>
            <div className="grid_name">
              <div className="on_right">
                <div
                  className={dot_position_class_PE.onschool}
                  style={{ color: PEdata.dot.color_dot }}
                >
                  {render_dot_school(
                    PEdata.dot.type,
                    PEdata.dot.amount_dot
                  )}
                </div>


                <div
                  className={SNamePositionClass_PE.fullname_right}
                  style={{ color: PEdata.SName.color }}
                >
                  {render_h1(PEdata.SName.fullname)}
                  {render_h1(PEdata.SUndername.under_name)}
                </div>
              </div>

              <div className="on_left">
                <div
                  className={dot_position_class_PE.onname}
                  style={{ color: PEdata.dot.color_dot }}
                >
                  {render_dot_name(PEdata.dot.type, PEdata.dot.amount_dot)}
                </div>

                <div
                  className={SNamePositionClass_PE.fullname_left}
                  style={{ color: PEdata.SName.color }}
                >
                  {render_h1(PEdata.SName.fullname)}
                  {render_h1(PEdata.SUndername.under_name)}
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
