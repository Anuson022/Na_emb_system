import React, { useEffect, useState } from "react";
import Shirt_graphic_cus_com from "./Shirt_graphic_cus_com";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";

function Shirt_graphic_cus() {
  const [formdata, setformdata] = useState({
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
    SUnderschool:{
      under_school:"",
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

  const [formdata_info, setformdata_info] = useState({
    info_data: "",
    parent_name: "",
    phone_number: "",
    status: "ยังไม่ตรวจสอบ",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [ShowSuccess,SetShowSuccess] = useState(false);
  const [ShowIncomplete,SetShowIncomplete] = useState(false);

  const [ShowFail,SetShowFail] = useState(false);


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

  useEffect(() => {
    fetch_image();
  }, []);

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

  const SweetAlertShow = async() =>
  {
    setShowAlert(true)
  }
  const StatusCheck = async() =>
    {
      setShowAlert(true)
    }
  const HandleSubmit = async (event) => {

    const Combine_shirt = {
      ...formdata,
    };
    if(formdata_info.phone_number === "" || formdata_info.phone_number === null)
      { return SetShowIncomplete(true) }
    try {
      const responses = await axios.post("/cus_input", {
        Combine_shirt,
        formdata_info,
      });
      console.log(responses.data)
      SetShowSuccess(true)
    } catch (error) {
      alert(error)
      SetShowFail(true)
    }
    setShowAlert(false)
  };
  const HandleCancel = async() =>
    {
      setShowAlert(false)
      SetShowSuccess(false)
      SetShowFail(false)
      SetShowIncomplete(false)
    }
  const handleChange_info = (event) => {
    const { name, value } = event.target;
    setformdata_info((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <>
      <header>
        <div class="container">
          <h1>โปรดกรอกข้อมูลการปัก</h1>
        </div>
      </header>

      <br />
      <Shirt_graphic_cus_com
        setcheck_dot={setcheck_dot}
        checkbox_dot={checkbox_dot}
        setcheck_logo={setcheck_logo}
        checkbox_logo={checkbox_logo}
        setcheck_undername={setcheck_undername}
        checkbox_undername={checkbox_undername}
        setcheck_underschool = {setcheck_underschool}
        checkbox_underschool = {checkbox_underschool}
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
      <br />
      <div className="info_container">
        <div className="info-form">
          <div >
            <div>
              <h2>รายละเอียดเพิ่มเติม</h2>
              <br />
              <textarea
                name="info_data"
                id=""
                placeholder="รายละเอียดเพิ่มเติม (หากมี)"
                value={formdata_info.info_data}
                onChange={handleChange_info}
              ></textarea>
            </div>

            <div>
              <h2>ชื่อผู้สั่ง (จำเป็น)</h2>
              <br />
              <input
                type="text"
                name="parent_name"
                id=""
                value={formdata_info.parent_name}
                onChange={handleChange_info}
                required
              />
            </div>

            <div>
              <h2>เบอร์โทร (จำเป็น)</h2>
              <br />
              <input
                type="text"
                name="phone_number"
                id=""
                value={formdata_info.phone_number}
                onChange={handleChange_info}
                required
              />
            </div>
            <div className="Cus-submit">
              <button onClick={SweetAlertShow}>ยืนยัน</button>
            </div>
          </div>
        </div>
        <div style={{ padding: "15rem" }}>
            {showAlert && (
              <SweetAlert
              info
                title="ยืนยันการส่งหรือไม่"
                onConfirm={HandleSubmit}
                onCancel={HandleCancel}
                showCancel
                confirmBtnText="ใช่"
                cancelBtnText="ไม่"
                confirmBtnCssClass="btn-custom"
                cancelBtnCssClass="btn-custom"
                customClass="custom-sweetalert" // Custom class
                style={{ display: "flex", minWidth: "15rem", width: "20rem" }}
              ></SweetAlert>
            )}
            {ShowSuccess && (
              <SweetAlert
                success
                title="ส่งข้อมูลสำเร็จ"
                onConfirm={HandleCancel}
                confirmBtnText="ตกลง"
                confirmBtnCssClass="btn-custom"
                customClass="custom-sweetalert" // Custom class
                style={{ display: "flex", minWidth: "15rem", width: "20rem" }}
              ></SweetAlert>
            )}
            {ShowIncomplete && (
              <SweetAlert
              warning
                title="โปรดกรอกเบอร์โทรและชื่อผู้สั่ง"
                onConfirm={HandleCancel}
                confirmBtnText="ตกลง"
                cancelBtnText="ไม่"
                confirmBtnCssClass="btn-custom"
                cancelBtnCssClass="btn-custom"
                customClass="custom-sweetalert" // Custom class
                style={{ display: "flex", minWidth: "15rem", width: "22rem" }}
              ></SweetAlert>
            )}
            {ShowFail && (
              <SweetAlert
              danger
                title="บางอย่างผิดพลาดไม่สามารถส่งข้อมูลได้"
                onConfirm={HandleCancel}
                confirmBtnText="ตกลง"
                confirmBtnCssClass="btn-custom"
                cancelBtnCssClass="btn-custom"
                customClass="custom-sweetalert" // Custom class
                style={{ display: "flex", minWidth: "15rem", width: "20rem" }}
              ></SweetAlert>
            )}
          </div>
      </div>
    </>
  );
}

export default Shirt_graphic_cus;
