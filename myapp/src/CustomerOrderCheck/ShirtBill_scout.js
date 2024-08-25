import React, { useEffect, useState } from "react";
import Select from 'react-select';

import '../Shirt_graphic_cus_com.css'
import axios from "axios";
const render_h1 = (text) => {
  return text.split("\n").map((line, index) => <h1 key={index}>{line}</h1>);
};




function ShirtBill_scout({ cus_id, parent_name, phone_number, status }) 
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
        const object_pe = JSON.parse(response.data[0].PE);
        const object_scout = JSON.parse(response.data[0].scout);
        await SetFetchData({
          shirt: object,
          PE: object_pe,
          scout: object_scout,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
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
    const [ScoutImage,SetScoutImage] = useState(Scoutdata.path)
    const [ColorSelect,SetColorSelect] = useState("")
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
const [SNamePositionClass_Scout, SetSNamePositionClass_Scout] = useState({
  fullname_right: "hidden",
  fullname_left: "hidden",
});


  useEffect(() => {
    fetch_image();
  }, []);
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
  useEffect(()=>
    {
      SetScoutImage(Scoutdata.path)
      const colorofscout = `${Scoutdata.SName.color_border}_${Scoutdata.SName.cloth}_${Scoutdata.SName.color}`;
      console.log(colorofscout)
      SetColorSelect(colorofscout)
    },[Scoutdata.SName])
  
  return (
    <>{Scoutdata.Selected &&
      <div className="container_form" style={{alignItems:'center'}}>


        <div className="body_shirt">


          <div className="shirt_design">
            <img className="shirt_img" src={ScoutImage} alt="" />
            <div className="grid_dot">
            </div>
            <div className="grid_name" style={{bottom:'29rem'}}>
              <div className="on_right">
                
                <div
                  className={SNamePositionClass_Scout.fullname_right}
                  style={{ color: Scoutdata.SName.color ,marginTop:'-0.5rem',marginRight:'-0.5rem',
                    backgroundColor:Scoutdata.SName.cloth}}
                >
                  <div style={{borderStyle:'solid',borderWidth:'4px',
                    borderColor:Scoutdata.SName.color_border,fontSize:'0.7rem',
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

export default ShirtBill_scout;
