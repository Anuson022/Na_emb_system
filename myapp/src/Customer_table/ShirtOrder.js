import React, { useEffect, useState } from "react";
import Select from 'react-select';

import '../Shirt_graphic_cus_com.css'
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
          <h1 style={{margin:'-1rem'}} key={index} className={"dot" + re_index} >
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



function ShirtOrder({ cus_id, parent_name, phone_number, status }) 
{
    const [FetchData,SetFetchData] = useState({})
  const Fetch_graphic = async() => 
    {
      try {
        const response = await axios.get('/get_cusID', {
          params: {
            id: cus_id
          }
        });
        //console.log(response.data[0])
        const object = JSON.parse(response.data[0].shirt);
        await SetFetchData(object);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    useEffect(() => {
      Fetch_graphic();
    }, []);
    useEffect(() => {
      if (FetchData.SName) {
        setformdata(prevFormData => ({
          ...prevFormData,
          SName: {
            ...prevFormData.SName,
            fullname: FetchData.SName.fullname || "",
            color: FetchData.SName.color || "",
            position_n: FetchData.SName.position_n || "",
          },
          SUndername: {
            ...prevFormData.SUndername,
            under_name: FetchData.SUndername.under_name || "",
            color0: FetchData.SUndername.color0 || "",
          },
          SSchool: {
            ...prevFormData.SSchool,
            name: FetchData.SSchool.name,
            color1: FetchData.SSchool.color1,
            position_s: FetchData.SSchool.position_s
          },
          SLogo: {
            ...prevFormData.SLogo,
            school_name:FetchData.SLogo.school_name,
            image_path:FetchData.SLogo.image_path,
            position_l:FetchData.SLogo.position_l,
          },
          dot: {
            ...prevFormData.dot,
            type: FetchData.dot.type || "",
            position: FetchData.dot?.position || "",
            amount_dot: FetchData.dot?.amount_dot || "",
            color_dot: FetchData.dot?.color_dot || "",
          },
        }));
      }
      if(FetchData.dot?.type)
        {
          setcheck_dot(true)
        }
      if(FetchData.SLogo?.image_path)
        {
          setcheck_logo(true)
          setSelectedLogo({
            label:FetchData.SLogo.school_name,
            image:FetchData.SLogo.image_path
          })
        }
      if(FetchData.SUndername?.under_name)
        {
          setcheck_undername(true)
        }
    }, [FetchData]);



  const [formdata, setformdata] = useState({
    SName: {
      fullname: "",
      color: "#0000FF",
      position_n:"ชื่อด้านซ้าย"
    },
    SUndername: {
      under_name: "",
      color0: "#0000FF",
    },
    SSchool: {
      name: "",
      color1: "#0000FF",
      position_s:""
    },
    SLogo:
    {
      school_name:"",
      image_path:"",
      position_l:""},
    dot: {
      type: "",
      position: "",
      amount_dot: "",
      color_dot: "",
    },
  });

  const [checkbox_dot,setcheck_dot] = useState(false)
  const [checkbox_logo,setcheck_logo] = useState(false)
  const [checkbox_undername,setcheck_undername] = useState(false)

  const [dot_position_class, set_dot_position] = useState({
    onschool: "hidden",
    onname: "hidden",
    dot_left: "hidden",
    dot_right: "hidden",
  });
  const [SNamePositionClass, SetSNamePositionClass] = useState({
    fullname_right: "hidden",fullname_left: "hidden",
  });
  const [SSchoolPositionClass, SetSSchoolPositionClass] = useState({
    right: "hidden",left: "hidden",
  });
  const [SLogoPositionClass, SetSLogoPositionClass] = useState({
    right: "hidden",left: "hidden",
  });


  const [Image,Setimage] = useState([])

  const [selectedLogo, setSelectedLogo] = useState(null);
  const [formdata_info, setformdata_info] = useState({
    info_data:"",
    parent_name:"",
    phone_number:"",
    status:"ยังไม่ตรวจสอบ",
  });
  const fetch_image = async () => {
    const res = await axios.post('/api/files');
    console.log(res.data)
    Setimage(res.data);
};


  useEffect(() => {
    var dot_star = ''
    var position = ''
    var amount = ''
    if (checkbox_dot === true) {
      if(formdata.dot.type === 'จุด')
        {dot_star = '•';}
      if(formdata.dot.type ==='ดาว')
        {dot_star = '★';}
      if(formdata.dot.position === 'บนชื่อโรงเรียน')
        {
          set_dot_position(data_position =>(
            {...data_position,
              onschool:"onschool",
              onname:"hidden",
              dot_left:"hidden",
              dot_right:"hidden"}))
        }
      if(formdata.dot.position === 'บนชื่อนักเรียน')
        {
          set_dot_position(data_position =>(
            {...data_position,
              onschool:"hidden",
              onname:"onname",
              dot_left:"hidden",
              dot_right:"hidden"}))
        }
      if(formdata.dot.position === 'บนปกขวา')
        {
          set_dot_position(data_position =>(
            {...data_position,
              onschool:"hidden",
              onname:"hidden",
              dot_left:"hidden",
              dot_right:"dot_right"}))
        }
      if(formdata.dot.position === 'บนปกซ้าย')
        {
          set_dot_position(data_position =>(
            {...data_position,
              onschool:"hidden",
              onname:"hidden",
              dot_left:"dot_left",
              dot_right:"hidden"}))
        }
    }
  }, [formdata.dot, checkbox_dot]);
    //name position
    useEffect(() => {
      if(formdata.SName.position_n === "ชื่อด้านขวา")
        {
          SetSNamePositionClass(data=>(
            {
              ...data,
              fullname_right: "nameright",
              fullname_left: "hidden",
            }))
        }
      else if(formdata.SName.position_n === "ชื่อด้านซ้าย")
        {
          SetSNamePositionClass(data=>(
            {
              ...data,
              fullname_right: "hidden",
              fullname_left: "nameleft",
            }))
        }
      else
      {
        SetSNamePositionClass(data=>(
          {
            ...data,
            fullname_right: "hidden",
            fullname_left: "hidden",
          }))
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
      if(formdata.SLogo.position_l === "โลโก้ด้านขวา")
        {
          SetSLogoPositionClass(data=>(
            {
              ...data,
              right: "logo-right",
              left: "hidden",
            }))
        }
      else if(formdata.SLogo.position_l === "โลโก้ด้านซ้าย")
        {
          SetSLogoPositionClass(data=>(
            {
              ...data,
              right: "hidden",
              left: "logo-left",
            }))
        }
      else
      {
        SetSLogoPositionClass(data=>(
          {
            ...data,
            right: "hidden",
            left: "hidden",
          }))
      }
      if(checkbox_logo === false)
        {
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
    if (event.target.checked === true) 
      {
        setSelectedLogo(null)
        
      } //auto input dot1
    else if (event.target.checked === false) {
      console.log(selectedLogo)
      setformdata((prevFormdata) => ({
        ...prevFormdata,
        SLogo: {
          ...prevFormdata.SLogo,
          school_name:"",
          image_path:"",
          position_l:"โลโก้ด้านขวา"
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
  const HandleCheckboxUndername = (event) =>
    {
      setcheck_undername(event.target.checked);
      if (event.target.checked === true) 
        {
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
    } }


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

  
  return (
    <>

        <div className="body_shirt" style={{width:'10rem'}}>
          <div className="shirt_design" style={{margin:'-0.5rem'}}>
            <img className="shirt_img" src="/image_folder/S_Shirt.png" alt="" />
            <div className="grid_dot">
              <div
                className={dot_position_class.dot_left}
                style={{ color: formdata.dot.color_dot }}
              >
                {render_dot1(formdata.dot.type, formdata.dot.amount_dot)}
              </div>
              <div
                className={dot_position_class.dot_right}
                style={{ color: formdata.dot.color_dot}}
              >
                {render_dot1(formdata.dot.type, formdata.dot.amount_dot)}
              </div>
            </div>
            <div className="grid_name" style={{bottom:'30rem'}}>
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


    </>
  );
}

export default ShirtOrder;
