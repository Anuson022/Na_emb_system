import React, { useEffect, useState, Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css1.css";
import Shirt_graphic_cus_com from "./Shirt_graphic_cus_com";
import Shirt_graphic_cus_PE from "./Shirt_graphic_cus_PE";
import Shirt_graphic_cus_Scout from "./Shirt_graphic_cus_Scout";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShirt } from "@fortawesome/free-solid-svg-icons";

const Recheck = () => {
  const location = useLocation();
  const { cus_data } = location.state;
  const [formdata_cus, setformdata_cus] = useState({
    cus_id: cus_data.cus_id,
    info: cus_data.info,
    parent_name: cus_data.parent_name,
    phone_number: cus_data.phone_number,
    status: cus_data.status,
  });
  const [FetchData, SetFetchData] = useState({});
  const Fetch_graphic = async () => {
    try {
      const response = await axios.get("/api/get_cusID", {
        params: {
          id: formdata_cus.cus_id,
        },
      });
      //console.log(response.data[0])
      const object = JSON.parse(response.data[0].shirt);
      const object_pe = JSON.parse(response.data[0].PE);
      const object_scout = JSON.parse(response.data[0].scout);
      await SetFetchData({
        shirt: object,
        PE: object_pe,
        scout: object_scout,
      });
      
      const billOrder = JSON.parse(response.data[0].cus_order);
      const IsCusPaid = parseInt(response.data[0].is_paid);
      if (billOrder) {
        setOrders(billOrder);
      }
      if (IsCusPaid) {
        SetIsPaid(IsCusPaid);
      }
      console.log(FetchData.shirt.SName.fullname)

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
        Selected:FetchData.shirt.Selected,
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
    if (FetchData.shirt?.SUndername?.under_name) {
      setcheck_undername(true);
    }
    if (FetchData.shirt?.SUnderschool?.under_school) {
      setcheck_underschool(true);
    }
  }, [FetchData.shirt]);
  useEffect(() => {
    if (FetchData.PE?.SName) {
      setPEdata((prevFormData) => ({
        ...prevFormData,
        Selected:FetchData.PE.Selected,
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
    if (FetchData.PE?.dot?.type) {
      setcheck_dot_PE(true);
    }
  }, [FetchData.PE]);

  useEffect(() => {
    if (FetchData.scout?.SName) {
      setScoutdata((prevFormData) => ({
        ...prevFormData,
        Selected:FetchData.scout.Selected,
        path:FetchData.scout.path,
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
    path:"/image_folder/L_Shirt.png",
    SName: {
      fullname: "",
      position_n: "ชื่อด้านขวา",
      color: "Blue",
      color_border: "#FCF5E5",
      cloth: "White"
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
  const [ShirtOptions, SetShirtOptions] = useState([
    { label: "เสื้อนักเรียน", selected: formdata.Selected },
    { label: "เสื้อพละ", selected: PEdata.Selected },
    { label: "เสื้อลูกเสือ&เนตรนารี", selected: Scoutdata.Selected },
    /*{ label: "เอี้ยม", selected: Bibdata.Selected },*/
  ]);
  useEffect(()=>
    {
      if (FetchData) {
        SetShirtOptions([
          { label: "เสื้อนักเรียน", selected: FetchData?.shirt?.Selected ?? false },
          { label: "เสื้อพละ", selected: FetchData?.PE?.Selected ?? false },
          { label: "เสื้อลูกเสือ&เนตรนารี", selected: FetchData?.scout?.Selected ?? false },
          /*{ label: "เอี้ยม", selected: FetchData?.bib?.Selected ?? false },*/
        ]);
      }
    },[FetchData])
  const [selectedItem, setSelectedItem] = useState("");
  const [ShowTypeAlert, SetShowTypeAlert] = useState(false);
  const HandleShow = () => {
    SetShowTypeAlert(true);
  };
  const handleSelect = (e) => {
    setSelectedItem(e.target.value);
  };
  const handleSelectChange = (e) => {
    SetShirtOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.label === selectedItem ? { ...option, selected: true } : option
      )
    );
    if (selectedItem === "เสื้อนักเรียน") {
      setformdata((prev) => ({
        ...prev,
        Selected: true,
      }));
    }
    if (selectedItem === "เสื้อพละ") {
      setPEdata((prev) => ({
        ...prev,
        Selected: true,
      }));
    }
    if (selectedItem === "เสื้อลูกเสือ&เนตรนารี") {
      setScoutdata((prev) => ({
        ...prev,
        Selected: true,
      }));
    }
    if (selectedItem === "เอี้ยม") {
      setBibdata((prev) => ({
        ...prev,
        Selected: true,
      }));
    }
    setSelectedItem("")
    HandleCancel();
  };

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

  const [checkbox_dot_PE, setcheck_dot_PE] = useState(false);
  const [checkbox_undername_PE, setcheck_undername_PE] = useState(false);
  const [dot_position_class_PE, set_dot_position_PE] = useState({
    onschool: "hidden",
    onname: "hidden",
    dot_left: "hidden",
    dot_right: "hidden",
  });
  const [SNamePositionClass_PE, SetSNamePositionClass_PE] = useState({
    fullname_right: "hidden",
    fullname_left: "hidden",
  });

  const [SNamePositionClass_Scout, SetSNamePositionClass_Scout] = useState({
    fullname_right: "hidden",
    fullname_left: "hidden",
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
      if (formdata.dot.position === "onname_shirt") {
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

  //name position PE
  useEffect(() => {
    if (PEdata.SName.position_n === "ชื่อด้านขวา") {
      SetSNamePositionClass_PE((data) => ({
        ...data,
        fullname_right: "nameright",
        fullname_left: "hidden",
      }));
    } else if (PEdata.SName.position_n === "ชื่อด้านซ้าย") {
      SetSNamePositionClass_PE((data) => ({
        ...data,
        fullname_right: "hidden",
        fullname_left: "nameleft",
      }));
    } else {
      SetSNamePositionClass_PE((data) => ({
        ...data,
        fullname_right: "hidden",
        fullname_left: "hidden",
      }));
    }
  }, [PEdata.SName]);

  useEffect(() => {
    var dot_star = "";
    var position = "";
    var amount = "";
    if (checkbox_dot_PE === true) {
      if (PEdata.dot.type === "จุด") {
        dot_star = "•";
      }
      if (PEdata.dot.type === "ดาว") {
        dot_star = "★";
      }
      if (PEdata.dot.position === "บนชื่อนักเรียนด้านขวา") {
        set_dot_position_PE((data_position) => ({
          ...data_position,
          onschool: "onschool",
          onname: "hidden",
          dot_left: "hidden",
          dot_right: "hidden",
        }));
      }
      if (PEdata.dot.position === "บนชื่อนักเรียนด้านซ้าย") {
        set_dot_position_PE((data_position) => ({
          ...data_position,
          onschool: "hidden",
          onname: "onname",
          dot_left: "hidden",
          dot_right: "hidden",
        }));
      }
      if (PEdata.dot.position === "right_collar") {
        set_dot_position_PE((data_position) => ({
          ...data_position,
          onschool: "hidden",
          onname: "hidden",
          dot_left: "hidden",
          dot_right: "dot_right",
        }));
      }
      if (PEdata.dot.position === "left_collar") {
        set_dot_position_PE((data_position) => ({
          ...data_position,
          onschool: "hidden",
          onname: "hidden",
          dot_left: "dot_left",
          dot_right: "hidden",
        }));
      }
    }
  }, [PEdata.dot, checkbox_dot_PE]);

  //name position Scout
  useEffect(() => {
    if (Scoutdata.SName.position_n === "ชื่อด้านขวา") {
      SetSNamePositionClass_Scout((data) => ({
        ...data,
        fullname_right: "nameright",
        fullname_left: "hidden",
      }));
    }
  }, [Scoutdata.SName]);


  const handle_cuschange = (e) => {
    const { name, value } = e.target;
    setformdata_cus({
      ...formdata_cus,
      [name]: value,
    });
  };

  const [orders, setOrders] = useState([
    { id: 1, value1: "", value2: "", value3: "", value4: "" },
  ]);
  const [IsPaid, SetIsPaid] = useState(false);
  //order varible

  const addInput = (e) => {
    e.preventDefault();
    setOrders([
      ...orders,
      { id: orders.length + 1, value1: "", value2: "", value3: "", value4: "" },
    ]);
  };

  const removeInput = (id) => {
    setOrders(orders.filter((input) => input.id !== id));
  };

  const handleDynamicInputGrid = (id, name, value) => {
    setOrders(
      orders.map((input) => {
        if (input.id === id) {
          const updatedInput = { ...input, [name]: value };
          if (name === "value2" || name === "value3") {
            const sum =
              (parseFloat(updatedInput.value2) || 0) *
              (parseFloat(updatedInput.value3) || 0);
            updatedInput.value4 = sum.toString();
          }
          return updatedInput;
        }
        return input;
      })
    );
  };

  const OrderSum = () => {
    return orders.reduce(
      (total, order) => total + (parseFloat(order.value4) || 0),
      0
    );
  };
  const HandlePaidCheck = (event) => {
    SetIsPaid(event.target.checked);
  };
  //order varible

  const HandleSubmit = async(e) => {
    
    const SumPrice = orders.reduce(
      (total, order) => total + (parseFloat(order.value4) || 0),
      0
    );
    const Token = localStorage.getItem("token");
    const UserData = JSON.parse(localStorage.getItem("UserData"));
    const username = UserData.username
    if(
      formdata_cus.phone_number === "" ||
      formdata_cus.phone_number === null ||
      SumPrice === 0
    )
      { return SetShowIncomplete(true) }
    try {
      const response = await axios.post("/api/update_customdata", {
        formdata_cus,
        formdata,
        PEdata,
        Scoutdata,
        orders,
        SumPrice,
        IsPaid,
        username,
      });
      console.log(response.data)
      SetShowSuccess(true)
    } catch (error) {
      console.log(error);
      SetShowFail(true)
    }
    //console.log(result);*/
  };

  useEffect(() => {
    document.body.classList.add("body_of_edit");
    return () => {
      document.body.classList.remove("body_of_edit");
    };
  }, []);

  const [showAlert, setShowAlert] = useState(false);
  const [ShowSuccess,SetShowSuccess] = useState(false);
  const [ShowIncomplete,SetShowIncomplete] = useState(false);
  const [ShowFail,SetShowFail] = useState(false);
  const SweetAlertShow = async() =>
    {
      setShowAlert(true)
    }
  const StatusCheck = async() =>
    {
      setShowAlert(true)
    }
  const HandleCancel = async() =>
    {
      setShowAlert(false)
      SetShowSuccess(false)
      SetShowFail(false)
      SetShowIncomplete(false)
      SetShowTypeAlert(false);
    }
  const GoTo = useNavigate();
  const HandleNavigate = async() =>
    {
      GoTo("/Admin_dashboard")
    }
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
  return (
    <div className="">
      <br />
      <div className="cus_insert">
        <fieldset className="" style={{ backgroundColor: "#FAF9F6" ,paddingBottom:'2rem'}}>
          <legend style={{}}>
            <h1>ข้อมูลสำหรับแสดงกราฟิค</h1>
          </legend>
          <div className="Shirt_com">
            <>
              <Shirt_graphic_cus_com
                SetShirtOptions={SetShirtOptions}
                setcheck_dot={setcheck_dot}
                checkbox_dot={checkbox_dot}
                setcheck_logo={setcheck_logo}
                checkbox_logo={checkbox_logo}
                setcheck_undername={setcheck_undername}
                checkbox_undername={checkbox_undername}
                setcheck_underschool={setcheck_underschool}
                checkbox_underschool={checkbox_underschool}
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
              <Shirt_graphic_cus_PE
                SetShirtOptions={SetShirtOptions}
                setcheck_dot_PE={setcheck_dot_PE}
                checkbox_dot_PE={checkbox_dot_PE}
                setcheck_undername_PE={setcheck_undername_PE}
                checkbox_undername_PE={checkbox_undername_PE}
                PEdata={PEdata}
                setPEdata={setPEdata}
                set_dot_position_PE={set_dot_position_PE}
                dot_position_class_PE={dot_position_class_PE}
                SNamePositionClass_PE={SNamePositionClass_PE}
                SetSNamePositionClass_PE={SetSNamePositionClass_PE}
              />
              <Shirt_graphic_cus_Scout
                SetShirtOptions={SetShirtOptions}
                Scoutdata={Scoutdata}
                setScoutdata={setScoutdata}
                SNamePositionClass_Scout={SNamePositionClass_Scout}
                SetSNamePositionClass_Scout = {SetSNamePositionClass_Scout}
              />
              <div className='Add-Shirt-Type' onClick={HandleShow}>
                <button style={{display:'flex', alignItems:'center',gap:'1rem'}} 
                  onClick={HandleShow}>
                  <FontAwesomeIcon icon={faShirt} />เพิ่มรูปแบบเสื้อ</button>
              </div>
            </>
          </div>
        </fieldset>
      </div>

      <form className="cus_edit">
        <fieldset style={{ backgroundColor: "#FAF9F6" ,paddingBottom:'2rem'}}>
          <legend style={{}}>
            <h1>ข้อมูลลูกค้า</h1>
          </legend>
          <div className="div-border">
            <div className="customer_edit_content">
              <div className="grid_cus">
                <div className="grid_cus_item">
                  <label htmlFor="cus_id">
                    <h2>รหัสลูกค้า</h2>
                  </label>
                  <input
                    type="text"
                    name="cus_id"
                    value={formdata_cus.cus_id}
                    readOnly
                  />
                </div>
                <div
                  className="grid_cus_item"
                  style={{ marginBottom: "1.5rem" }}
                >
                  <label htmlFor="status">
                    <h2 style={{ marginBottom: "1.7rem" }}>สถานะ</h2>
                  </label>
                  <select
                    name="status"
                    value={formdata_cus.status}
                    onChange={handle_cuschange}
                  >
                    <option value="ยังไม่ตรวจสอบ">ยังไม่ตรวจสอบ</option>
                    <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                    <option value="การปักเสร็จสิ้น">การปักเสร็จสิ้น</option>
                  </select>
                </div>
              </div>

              <div className="grid_cus_item" style={{ marginTop: "-2em" }}>
                <label htmlFor="info">
                  <h2>รายละเอียด</h2>
                </label>
                <textarea
                  name="info"
                  value={formdata_cus.info}
                  onChange={handle_cuschange}
                />
              </div>

              <div className="grid_cus" style={{ marginTop: "1em" }}>
                <div className="grid_cus_item">
                  <label htmlFor="parent_name">
                    <h2>ชื่อผู้สั่ง</h2>
                  </label>
                  <input
                    type="text"
                    id="parent_name"
                    name="parent_name"
                    value={formdata_cus.parent_name}
                    onChange={handle_cuschange}
                  />
                </div>
                <div className="grid_cus_item">
                  <label htmlFor="phone_number">
                    <h2>เบอร์โทร</h2>
                  </label>
                  <input
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    value={formdata_cus.phone_number}
                    onChange={handle_cuschange}
                  />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </form>

      <form>
        <fieldset className="order_sum" style={{ backgroundColor: "#FAF9F6" ,paddingBottom:'2rem'}}>
          <legend>
            <h1>สรุปรายการ</h1>
          </legend>
          <div className="div-border">
          <table>
            <tr>
              <th style={{ textAlign: "left" }}>รายการ</th>
              <th style={{ textAlign: "center" }}>จำนวน</th>
              <th style={{ textAlign: "center" }}>ราคา/หน่วย</th>
              <th style={{ textAlign: "center" }}>จำวนเงิน</th>
              <th style={{ textAlign: "center" }}></th>
            </tr>

            {orders.map((input, index) => (
              <tr key={input.id} className="grid_order">
                <td className="order_info">
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    value={input.value1}
                    onChange={(e) =>
                      handleDynamicInputGrid(input.id, "value1", e.target.value)
                    }
                  />
                </td>
                <td className="quantity">
                  <input
                    style={{ textAlign: "center" }}
                    type="text"
                    value={input.value2}
                    onChange={(e) =>
                      handleDynamicInputGrid(input.id, "value2", e.target.value)
                    }
                  />
                </td>
                <td className="price">
                  <input
                    style={{ textAlign: "center" }}
                    type="text"
                    value={input.value3}
                    onChange={(e) =>
                      handleDynamicInputGrid(input.id, "value3", e.target.value)
                    }
                  />
                </td>
                <td className="price_sum">
                  <input
                    style={{ textAlign: "center" }}
                    type="text"
                    value={input.value4}
                    onChange={(e) =>
                      handleDynamicInputGrid(input.id, "value4", e.target.value)
                    }
                  />
                </td>
                <td style={{ textAlign: "center" ,backgroundColor:'white'}}>
                  <button
                    style={{
                      padding: "10px 20px",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                      marginRight: "10px",
                      fontSize: "1.5rem",
                      backgroundColor: "#f44336",
                      color: "#fff",
                    }}
                    onClick={() => removeInput(input.id)}
                  >
                    ลบรายการ
                  </button>
                </td>
              </tr>
            ))}
            <tr style={{backgroundColor:'white'}}>
              <td></td>
              <td></td>
              <td style={{ textAlign: "right" }}>
                <h3>รวม</h3>
              </td>
              <td style={{ textAlign: "center" ,fontSize:'2.5rem' , fontWeight:'bold'}}>{OrderSum()}</td>
              <td></td>
            </tr>
          </table>
          <br />
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              marginRight: "10px",
              fontSize: "1rem",
              backgroundColor: "gray",
              color: "white",
            }}
            onClick={addInput}
          >
            เพิ่มรายการ
          </button>
          <div className="Ispaid-check">
            <label>
              ชำระเงินแล้วหรือไม่
              <input
                type="checkbox"
                checked={IsPaid}
                onChange={HandlePaidCheck}
              />
            </label>
          </div>
          </div>
        </fieldset>
      </form>
      <div className="Cus-submit">
      <button 
      onClick={SweetAlertShow}>ยืนยันข้อมูล</button>
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
                onConfirm={HandleNavigate}
                confirmBtnText="ตกลง"
                confirmBtnCssClass="btn-custom"
                customClass="custom-sweetalert" // Custom class
                style={{ display: "flex", minWidth: "15rem", width: "20rem" }}
              ></SweetAlert>
            )}
            {ShowIncomplete && (
              <SweetAlert
              warning
                title="โปรดกรอกข้อมูลให้ครบถ้วน"
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
      <div style={{ padding: "15rem" }}>
          {ShowTypeAlert && (
            <SweetAlert
              title="กรุณาเลือกรูปแบบเสื้อ"
              onConfirm={handleSelectChange}
              onCancel={HandleCancel}
              showCancel
              confirmBtnText="เพิ่ม"
              cancelBtnText="ยกเลิก"
              confirmBtnCssClass="btn-custom"
              cancelBtnCssClass="btn-custom"
              customClass="custom-sweetalert" // Custom class
              
            >
              <div className="Shirt-Select">
                <select value={selectedItem} onChange={handleSelect}>
                  <option value="" disabled>เลือกรูปแบบเสิ้อ</option>
                  {ShirtOptions.filter((option) => !option.selected).map(
                    (option) => (
                      <option key={option.id} value={option.label}>
                        {option.label}
                      </option>
                    )
                  )}
                </select>
              </div>
            </SweetAlert>
          )}
        </div>
    </div>
  );
};

export default Recheck;

/*   

        const lines = text.split('\n').filter(line => line.trim() !== '');
        setpara(lines)
        console.log(lines)
        console.log("sadsa")
<div>
      <h2>Textarea to Paragraphs</h2>
      <textarea
        value={text}
        onChange={handleChange}
        rows="10"
        cols="50"
        placeholder="Enter text here..."
      />
      <br />
      <button onClick={handleClick}>Convert to Paragraphs</button>
      <div>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={index}>{paragraph}</p>
        ))}
      </div>
    </div>*/
