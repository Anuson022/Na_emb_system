import React, { useEffect, useState } from "react";
import Select from "react-select";

import "../Shirt_graphic_cus_com.css";
import axios from "axios";
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

function ShirtOrder({ cus_id, parent_name, phone_number, status }) {
  const [FetchData, SetFetchData] = useState({});
  const Fetch_graphic = async () => {
    try {
      const response = await axios.get("/api/get_cusID", {
        params: {
          id: cus_id,
        },
      });
      const object = JSON.parse(response.data[0].shirt);
      const object_pe = JSON.parse(response.data[0].PE);
      const object_scout = JSON.parse(response.data[0].scout);
      await SetFetchData({
        shirt: object,
        PE: object_pe,
        scout: object_scout,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    Fetch_graphic();
  }, []);
  useEffect(() => {
    if (FetchData.shirt?.SName) {
      setformdata((prevFormData) => ({
        ...prevFormData,
        Selected: FetchData.shirt.Selected,
        SName: {
          ...prevFormData.SName,
          fullname: FetchData.shirt.SName.fullname || "",
          color: FetchData.shirt.SName.color || "",
          position_n: FetchData.shirt.SName.position_n || "",
        },
        SUndername: {
          ...prevFormData.SUndername,
          under_name: FetchData.shirt.SUndername.under_name || "",
          color0: FetchData.shirt.SUndername.color0 || "",
        },
        SSchool: {
          ...prevFormData.SSchool,
          name: FetchData.shirt.SSchool.name || "",
          color1: FetchData.shirt.SSchool.color1 || "",
          position_s: FetchData.shirt.SSchool.position_s || "",
        },
        SUnderschool: {
          ...prevFormData.SUnderschool,
          under_school: FetchData.shirt.SUnderschool.under_school || "",
          color01: FetchData.shirt.SUnderschool.color01 || "",
        },
        SLogo: {
          ...prevFormData.SLogo,
          school_name: FetchData.shirt.SLogo.school_name || "",
          image_path: FetchData.shirt.SLogo.image_path || "",
          position_l: FetchData.shirt.SLogo.position_l || "",
        },
        dot: {
          ...prevFormData.dot,
          type: FetchData.shirt.dot.type || "",
          position: FetchData.shirt.dot?.position || "",
          amount_dot: FetchData.shirt.dot?.amount_dot || "",
          color_dot: FetchData.shirt.dot?.color_dot || "",
        },
      }));
    }
    if (FetchData.shirt?.dot?.type) {
      setcheck_dot(true);
    }
    if (FetchData.shirt?.SLogo?.image_path) {
      setcheck_logo(true);
      setSelectedLogo({
        label: FetchData.shirt.SLogo.school_name,
        image: FetchData.shirt.SLogo.image_path,
      });
    }
  }, [FetchData.shirt]);
  useEffect(() => {
    if (FetchData.PE?.SName) {
      setPEdata((prevFormData) => ({
        ...prevFormData,
        Selected: FetchData.PE.Selected,
        SName: {
          ...prevFormData.SName,
          fullname: FetchData.PE.SName.fullname || "",
          color: FetchData.PE.SName.color || "",
          position_n: FetchData.PE.SName.position_n || "",
        },
        SUndername: {
          ...prevFormData.SUndername,
          under_name: FetchData.PE.SUndername.under_name || "",
          color0: FetchData.PE.SUndername.color0 || "",
        },
        dot: {
          ...prevFormData.dot,
          type: FetchData.PE.dot.type || "",
          position: FetchData.PE.dot?.position || "",
          amount_dot: FetchData.PE.dot?.amount_dot || "",
          color_dot: FetchData.PE.dot?.color_dot || "",
        },
      }));
    }
  }, [FetchData.PE]);

  useEffect(() => {
    if (FetchData.scout?.SName) {
      setScoutdata((prevFormData) => ({
        ...prevFormData,
        Selected: FetchData.scout.Selected,
        path: FetchData.scout.path,
        SName: {
          ...prevFormData.SName,
          fullname: FetchData.scout.SName.fullname || "",
          position_n: FetchData.scout.SName.position_n || "",
          color: FetchData.scout.SName.color || "",
          color_border: FetchData.scout.SName.color_border || "",
          cloth: FetchData.scout.SName.cloth || "",
        },
      }));
    }
  }, [FetchData.scout]);

  const [formdata, setformdata] = useState({
    Selected: false,
    SName: {
      fullname: "",
      color: "#0000FF",
      position_n: "ชื่อด้านซ้าย",
    },
    SUndername: {
      under_name: "",
      color0: "#0000FF",
    },
    SSchool: {
      name: "",
      color1: "#0000FF",
      position_s: "ชื่อโรงเรียนด้านขวา",
    },
    SUnderschool: {
      under_school: "",
      color01: "#0000FF",
    },
    SLogo: {
      school_name: "",
      image_path: "",
      position_l: "",
    },
    dot: {
      type: "",
      position: "",
      amount_dot: "",
      color_dot: "",
    },
  });
  const [PEdata, setPEdata] = useState({
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
  });
  const [Scoutdata, setScoutdata] = useState({
    Selected: false,
    path: "/image_folder/L_Shirt.png",
    SName: {
      fullname: "",
      position_n: "ชื่อด้านขวา",
      color: "Blue",
      color_border: "#FCF5E5",
      cloth: "White",
    },
  });
  const [Bibdata, setBibdata] = useState({
    Selected: false,
    SName: {
      fullname: "",
      color: "#0000FF",
    },
    SUndername: {
      under_name: "",
      color0: "#0000FF",
    },
  });

  const [checkbox_dot, setcheck_dot] = useState(false);
  const [checkbox_logo, setcheck_logo] = useState(false);
  const [checkbox_undername, setcheck_undername] = useState(false);

  const [dot_position_class, set_dot_position] = useState({
    onschool: "hidden",
    onname: "hidden",
    dot_left: "hidden",
    dot_right: "hidden",
  });
  const [SNamePositionClass, SetSNamePositionClass] = useState({
    fullname_right: "hidden",
    fullname_left: "hidden",
  });
  const [SSchoolPositionClass, SetSSchoolPositionClass] = useState({
    right: "hidden",
    left: "hidden",
  });
  const [SLogoPositionClass, SetSLogoPositionClass] = useState({
    right: "hidden",
    left: "hidden",
  });

  const [Image, Setimage] = useState([]);

  const [selectedLogo, setSelectedLogo] = useState(null);
  const [formdata_info, setformdata_info] = useState({
    info_data: "",
    parent_name: "",
    phone_number: "",
    status: "ยังไม่ตรวจสอบ",
  });
  const fetch_image = async () => {
    const res = await axios.post("/api/files");
    Setimage(res.data);
  };

  useEffect(() => {
    var dot_star = "";
    var position = "";
    var amount = "";
    if (checkbox_dot === true) {
      if (formdata.dot.type === "จุด") {
        dot_star = "•";
      }
      if (formdata.dot.type === "ดาว") {
        dot_star = "★";
      }
      if (formdata.dot.position === "บนชื่อโรงเรียน") {
        set_dot_position((data_position) => ({
          ...data_position,
          onschool: "onschool",
          onname: "hidden",
          dot_left: "hidden",
          dot_right: "hidden",
        }));
      }
      if (formdata.dot.position === "บนชื่อนักเรียน") {
        set_dot_position((data_position) => ({
          ...data_position,
          onschool: "hidden",
          onname: "onname",
          dot_left: "hidden",
          dot_right: "hidden",
        }));
      }
      if (formdata.dot.position === "บนปกขวา") {
        set_dot_position((data_position) => ({
          ...data_position,
          onschool: "hidden",
          onname: "hidden",
          dot_left: "hidden",
          dot_right: "dot_right",
        }));
      }
      if (formdata.dot.position === "บนปกซ้าย") {
        set_dot_position((data_position) => ({
          ...data_position,
          onschool: "hidden",
          onname: "hidden",
          dot_left: "dot_left",
          dot_right: "hidden",
        }));
      }
    }
  }, [formdata.dot, checkbox_dot]);
  //name position
  useEffect(() => {
    if (formdata.SName.position_n === "ชื่อด้านขวา") {
      SetSNamePositionClass((data) => ({
        ...data,
        fullname_right: "nameright",
        fullname_left: "hidden",
      }));
    } else if (formdata.SName.position_n === "ชื่อด้านซ้าย") {
      SetSNamePositionClass((data) => ({
        ...data,
        fullname_right: "hidden",
        fullname_left: "nameleft",
      }));
    } else {
      SetSNamePositionClass((data) => ({
        ...data,
        fullname_right: "hidden",
        fullname_left: "hidden",
      }));
    }
  }, [formdata.SName]);

  //school position
  //school position
  useEffect(() => {
    if (formdata.SSchool.position_s === "ชื่อโรงเรียนด้านขวา") {
      SetSSchoolPositionClass((data) => ({
        ...data,
        right: "School-right",
        left: "hidden",
      }));
      if (checkbox_logo === true) {
        SetSLogoPositionClass((data) => ({
          ...data,
          right: "logo-right",
          left: "hidden",
        }));
      }
    } else if (formdata.SSchool.position_s === "ชื่อโรงเรียนด้านซ้าย") {
      SetSSchoolPositionClass((data) => ({
        ...data,
        right: "hidden",
        left: "School-left",
      }));
      if (checkbox_logo === true) {
        SetSLogoPositionClass((data) => ({
          ...data,
          right: "hidden",
          left: "logo-left",
        }));
      }
    } else {
      SetSSchoolPositionClass((data) => ({
        ...data,
        right: "hidden",
        left: "hidden",
      }));
      SetSLogoPositionClass((data) => ({
        ...data,
        right: "hidden",
        left: "hidden",
      }));
    }
  }, [formdata.SSchool]);

  //logo position
  useEffect(() => {
    if (formdata.SLogo.position_l === "โลโก้ด้านขวา") {
      SetSLogoPositionClass((data) => ({
        ...data,
        right: "logo-right",
        left: "hidden",
      }));
    } else if (formdata.SLogo.position_l === "โลโก้ด้านซ้าย") {
      SetSLogoPositionClass((data) => ({
        ...data,
        right: "hidden",
        left: "logo-left",
      }));
    } else {
      SetSLogoPositionClass((data) => ({
        ...data,
        right: "hidden",
        left: "hidden",
      }));
    }
    if (checkbox_logo === false) {
      SetSLogoPositionClass((data) => ({
        ...data,
        right: "hidden",
        left: "hidden",
      }));
    }
  }, [formdata.SLogo]);

  useEffect(() => {
    fetch_image();
  }, []);

  return (
    <>
      {formdata.Selected && (
        <div className="container_form">
          <div className="body_shirt">
            <br />
            <div className="shirt_design">
              <img
                className="shirt_img"
                src="/image_folder/S_Shirt.png"
                alt=""
              />
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
                    {render_h1(formdata.SUnderschool.under_school)}
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
                    {render_dot_name(
                      formdata.dot.type,
                      formdata.dot.amount_dot
                    )}
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
                    {render_h1(formdata.SUnderschool.under_school)}
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
          <br />
          <br />
        </div>
      )}
    </>
  );
}

export default ShirtOrder;
