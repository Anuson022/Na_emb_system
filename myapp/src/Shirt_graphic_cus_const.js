import React, { useEffect, useState } from "react";
import Shirt_graphic_cus_com from './Shirt_graphic_cus_com';
function Shirt_graphic_cus() {
  const [formdata, setformdata] = useState({
    text_right: {
      textright_input: "",
      color_right: "#0000FF",
    },
    text_left: {
      textleft_input: "",
      color_left: "#0000FF",
    },
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

  useEffect(() => {
    var dot_star = ''
    var position = ''
    var amount = ''
    if (checbox_dot === true) {
      if(formdata.dot.type === 'dot')
        {dot_star = '•';}
      if(formdata.dot.type ==='star')
        {dot_star = '★';}
      if(formdata.dot.position === 'onschool_shirt')
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
    
        }
      if(formdata.dot.position === 'right_collar')
        {
    
        }
      if(formdata.dot.position === 'left_collar')
        {
    
        }
    }
    document.body.classList.add('body_of_edit');
    return () => {
      document.body.classList.remove('body_of_edit');
    };}, [formdata.dot, checbox_dot]);

  return (
    <>
    <Shirt_graphic_cus_com setcheck_dot={setcheck_dot} checbox_dot={checbox_dot} formdata={formdata} setformdata={setformdata} set_dot_position={set_dot_position} dot_position_class={dot_position_class} />
    </>
  )
}

export default Shirt_graphic_cus