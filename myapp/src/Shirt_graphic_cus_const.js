import React, { useEffect, useState } from "react";
import Shirt_graphic_cus_com from './Shirt_graphic_cus_com';
import axios from "axios";
function Shirt_graphic_cus() {
  const [formdata, setformdata] = useState({
    SName: {
      fullname: "",
      color: "#0000FF",
      position_n:""
    },
    SSchool: {
      name: "",
      color1: "#0000FF",
      position_s:""
    },
    SLogo:
    {school_name:"",image_path:"",position_l:""},
    dot: {
      type: "",
      position: "",
      amount_dot: "",
      color_dot: "",
    },

  });

  const [checbox_dot,setcheck_dot] = useState(false)

  const [dot_position_class, set_dot_position] = useState({
    onschool: "hidden",
    onname: "hidden",
    dot_left: "hidden",
    dot_right: "hidden",
  });
  const [selectedLogo, setSelectedLogo] = useState(null);

  const [Image,Setimage] = useState([])

  const [formdata_info, setformdata_info] = useState({
    info_data:"",
    parent_name:"",
    phone_number:"",
    status:"ยังไม่ตรวจสอบ",
  });

  const fetch_image = async () => {
    const res = await axios.post('/api/files');
    Setimage(res.data);
};
  useEffect(() => {
    var dot_star = ''
    var position = ''
    var amount = ''
    if (checbox_dot === true) {
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
      if(formdata.dot.position === 'onname_shirt')
        {
          set_dot_position(data_position =>(
            {...data_position,
              onschool:"hidden",
              onname:"onname",
              dot_left:"hidden",
              dot_right:"hidden"}))
        }
      if(formdata.dot.position === 'right_collar')
        {
          set_dot_position(data_position =>(
            {...data_position,
              onschool:"hidden",
              onname:"hidden",
              dot_left:"hidden",
              dot_right:"dot_right"}))
        }
      if(formdata.dot.position === 'left_collar')
        {
          set_dot_position(data_position =>(
            {...data_position,
              onschool:"hidden",
              onname:"hidden",
              dot_left:"dot_left",
              dot_right:"hidden"}))
        }
    }
    document.body.classList.add('body_of_edit');
    return () => {
      document.body.classList.remove('body_of_edit');
    };}, [formdata.dot, checbox_dot]);

  useEffect(() => {
    fetch_image();
  }, []);

  useEffect(() => {
    if(formdata.SName.position_n === "name_right")
      {
        alert("test")
      }
    else if(formdata.SName.position_n === "name_left")
      {
        alert("test")
      }
  }, [formdata.SName]);


  const HandleSubmit = async(event) =>
    {
      const Combine_shirt = 
      {
        ...formdata,
        ...formdata
      }
      try {
        const responses = await axios.post("/cus_input",{Combine_shirt,formdata_info})
        console.log(responses.data)
      } catch (error) {
        alert(error)
      }
    }
  return (
    <>
    <Shirt_graphic_cus_com setcheck_dot={setcheck_dot} checbox_dot={checbox_dot} 
    formdata={formdata} setformdata={setformdata} set_dot_position={set_dot_position} 
    dot_position_class={dot_position_class}
    Image = {Image} Setimage = {Setimage}
    formdata_info = {formdata_info}
    setformdata_info ={setformdata_info}
    selectedLogo = {selectedLogo} setSelectedLogo = {setSelectedLogo}
    />
    <br />

    </>
  )
}

export default Shirt_graphic_cus