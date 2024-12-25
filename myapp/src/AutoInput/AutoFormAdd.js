import React, { useEffect, useState } from "react";
import Shirt_graphic_cus_com from "../Shirt_graphic_cus_com";
import { useNavigate } from "react-router-dom";
import { fetchAutoShirt } from "./Module/API_AutoInput";
import { ParseShirtData } from "./Module/Data_Parser"
import { UpdateFormShirt , updateChecksAndLogo } from "./Module/ShirtDataSetter";
import EditAndAdd from "./EditAndAdd";
import axios from "axios";
import { useLocation } from "react-router-dom";

function AutoFormAdd({ }) {
  const [formdata, setformdata] = useState({
    SName: {
      fullname: "ชื่อ - นามสกุล",
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
  const location = useLocation();
  const { school_ID, school_name } = location.state || "";
  /*const { cus_data } = location.state;
      const [formdata_cus, setformdata_cus] = useState({
        cus_id: cus_data.cus_id,
        info: cus_data.info,
        parent_name: cus_data.parent_name,
        phone_number: cus_data.phone_number,
        status: cus_data.status,
      });*/
  const [SchoolName, SetSchoolName] = useState();
  const [checkbox_dot, setcheck_dot] = useState(false);
  const [checkbox_logo, setcheck_logo] = useState(false);
  const [checkbox_undername, setcheck_undername] = useState(false);
  const [checkbox_underschool, setcheck_underschool] = useState(false);
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
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [Image, Setimage] = useState([]);
  const [FetchData, SetFetchData] = useState({});
  
  const Fetch_graphic = async () => {    
    SetSchoolName(school_name);
    try {
      const data = await fetchAutoShirt(school_ID);
      const school_form = await ParseShirtData(data);
      console.log(school_form)
      SetFetchData(school_form);
      
    } catch (error) {
      console.error("Error in Fetch_graphic:", error);
    }
  };
  const Data_update = async () =>
    {
      if (FetchData.school_shirt?.SName) {
        setformdata((prevFormData) => ({
          ...prevFormData,
          Selected:FetchData.school_shirt.Selected,
          SName: {
            ...prevFormData.SName,
            fullname: FetchData.school_shirt.SName.fullname || "",
            color: FetchData.school_shirt.SName.color || "",
            position_n: FetchData.school_shirt.SName.position_n || "",
          },
          SUndername: {
            ...prevFormData.SUndername,
            under_name: FetchData.school_shirt.SUndername.under_name || "",
            color0: FetchData.school_shirt.SUndername.color0 || "",
          },
          SSchool: {
            ...prevFormData.SSchool,
            name: FetchData.school_shirt.SSchool.name || "",
            color1: FetchData.school_shirt.SSchool.color1 || "",
            position_s: FetchData.school_shirt.SSchool.position_s || "",
          },
          SUnderschool: {
            ...prevFormData.SUnderschool,
            under_school: FetchData.school_shirt.SUnderschool.under_school || "",
            color01: FetchData.school_shirt.SUnderschool.color01 || "",
          },
          SLogo: {
            ...prevFormData.SLogo,
            school_name: FetchData.school_shirt.SLogo.school_name || "",
            image_path: FetchData.school_shirt.SLogo.image_path || "",
            position_l: FetchData.school_shirt.SLogo.position_l || "",
          },
          dot: {
            ...prevFormData.dot,
            type: FetchData.school_shirt.dot.type || "",
            position: FetchData.school_shirt.dot?.position || "",
            amount_dot: FetchData.school_shirt.dot?.amount_dot || "",
            color_dot: FetchData.school_shirt.dot?.color_dot || "",
          },
        }));
      }
      if (FetchData.school_shirt?.dot?.type) {
        setcheck_dot(true);
      }
      if (FetchData.school_shirt?.SLogo?.image_path) {
        setcheck_logo(true);
        setSelectedLogo({
          label: FetchData.school_shirt.SLogo.school_name,
          image: FetchData.school_shirt.SLogo.image_path,
        });
      }
      if (FetchData.school_shirt?.SUndername?.under_name) {
        setcheck_undername(true);
      }
      if (FetchData.school_shirt?.SUnderschool?.under_school) {
        setcheck_underschool(true);
      }
    }
  useEffect(() => {
    if(school_ID !== null)
      {
        Fetch_graphic();
      }
    
  }, []);
  useEffect(() => {
    if(school_ID !== null)
      {
        Data_update();
      }
    
  }, [FetchData]);

  const fetch_image = async () => {
    const res = await axios.post("/api/files");
    Setimage(res.data);
  };
  useEffect(() => {
    fetch_image();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
      if (formdata.dot.position === "onname_shirt") {
        set_dot_position((data_position) => ({
          ...data_position,
          onschool: "hidden",
          onname: "onname",
          dot_left: "hidden",
          dot_right: "hidden",
        }));
      }
      if (formdata.dot.position === "right_collar") {
        set_dot_position((data_position) => ({
          ...data_position,
          onschool: "hidden",
          onname: "hidden",
          dot_left: "hidden",
          dot_right: "dot_right",
        }));
      }
      if (formdata.dot.position === "left_collar") {
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
  }, [formdata.SLogo]);
  
  const HandleSubmit = async () => {
    if (school_ID === null) {
      const response = await axios.post("/api/autoform_add", {
        SchoolName,
        formdata,
      });
      console.log(response.data);
    } else if (school_ID !== null) {
      const response = await axios.post("/api/autoform_edit", {
        school_ID,
        SchoolName,
        formdata,
      });
      console.log(response.data);
    }
  };
  const navigate = useNavigate();
  return (
    <div>
      <nav
        className="navbar_header"
        style={{ display: "grid", gridTemplateColumns: "0% 100%" }}
      >
        <div className="User-add" style={{ zIndex: "1" }}>
          <button onClick={() => navigate(-1)}>กลับ</button>
        </div>
        <div className="navbar-logo" style={{ textAlign: "center" }}>
          <h3>เพิ่มข้อมูลการปัก</h3>
        </div>
      </nav>

      <EditAndAdd
        setcheck_dot={setcheck_dot}
        checkbox_dot={checkbox_dot}
        setcheck_logo={setcheck_logo}
        checkbox_logo={checkbox_logo}
        setcheck_undername={setcheck_undername}
        checkbox_undername={checkbox_undername}
        setcheck_underschool={setcheck_underschool}
        checkbox_underschool={checkbox_underschool}
        SchoolName={SchoolName}
        SetSchoolName={SetSchoolName}
        formdata={formdata}
        setformdata={setformdata}
        set_dot_position={set_dot_position}
        dot_position_class={dot_position_class}
        Image={Image}
        Setimage={Setimage}
        selectedLogo={selectedLogo}
        setSelectedLogo={setSelectedLogo}
        SNamePositionClass={SNamePositionClass}
        SetSNamePositionClass={SetSNamePositionClass}
        SSchoolPositionClass={SSchoolPositionClass}
        SetSSchoolPositionClass={SetSSchoolPositionClass}
        SLogoPositionClass={SLogoPositionClass}
        SetSLogoPositionClass={SetSLogoPositionClass}
      />
      <div
        className="Cus-submit"
        style={{ backgroundColor: "#f4f4f4", padding: "1rem" }}
      >
        <button onClick={HandleSubmit} style={{ width: "20rem" }}>
          ยืนยันการเพิ่ม
        </button>
      </div>
    </div>
  );
}

export default AutoFormAdd;
