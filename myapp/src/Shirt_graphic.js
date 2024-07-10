import React, { useEffect, useState } from "react";

const render_h1 = (text) => {
  return text.split("\n").map((line, index) => <h1 key={index}>{line}</h1>);
};
const render_dot1 = (dot_type, dot_amount) => {
  var dot_star = "";
  let dot_array = [];
  var font_size = {};
  if (dot_type === "dot") {
    dot_star = "•";
    font_size = { fontSize: "1.875rem" };
  }
  if (dot_type === "star") {
    dot_star = "★";
    font_size = { fontSize: "1.7rem" };
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
          <h1 key={index} className={"dot" + re_index} style={font_size}>
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
  if (dot_type === "dot") {
    dot_star = "•";
    font_size = {
      fontSize: "1.7rem",
      marginTop: -20,
      marginBottom: -5,
      textAlign: "center",
    };
  }
  if (dot_type === "star") {
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
    <h1 className={"dot_school"} style={font_size}>
      {dot_array}
    </h1>
  );
};
const render_dot_name = (dot_type, dot_amount) => {
  var dot_star = "";
  let dot_array = [];
  var font_size = {};
  if (dot_type === "dot") {
    dot_star = "•";
    font_size = {
      fontSize: "1.7rem",
      marginTop: -20,
      marginBottom: -5,
      textAlign: "center",
    };
  }
  if (dot_type === "star") {
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
    <h1 className={"dot_name"} style={font_size}>
      {dot_array}
    </h1>
  );
};

function Shirt_graphic() {
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
  const handlecheckbox_dot = (event) => {
    setcheck_dot(event.target.checked);
    if (event.target.checked === true) {
      setformdata((prevFormdata) => ({
        ...prevFormdata,
        dot: {
          ...prevFormdata.dot,
          type: "dot",
          position: "onschool_shirt",
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
  const handle_text = (e) => {
    const { name, value } = e.target;
    setformdata((prevData) => ({
      ...prevData,
      text_right: {
        ...prevData.text_right,
        [name]: value,
      },
      text_left: {
        ...prevData.text_left,
        [name]: value,
      },
    }));
  };
  const handledot = (event) =>
    {
      const { name, value } = event.target;
      setformdata((prevFormdata) => ({
        ...prevFormdata,
        dot: {
          ...prevFormdata.dot,
          [name]: value,
        }
      }));
    }
    const handledot_position = (event) =>
      {
        const { name, value } = event.target;
        setformdata((prevFormdata) => ({
          ...prevFormdata,
          dot: {
            ...prevFormdata.dot,
            [name]: value,
          }
        }));
        if(event.target.value === 'onschool_shirt')
          {
            set_dot_position(data_position =>(
              {...data_position,
                onschool:"onschool",
                onname:"hidden",
                dot_left:"hidden",
                dot_right:"hidden"}))
          }
        if(event.target.value === 'onname_shirt')
          {
            set_dot_position(data_position =>(
              {...data_position,
                onschool:"hidden",
                onname:"onname",
                dot_left:"hidden",
                dot_right:"hidden"}))
          }
        if(event.target.value === 'right_collar')
          {
            set_dot_position(data_position =>(
              {...data_position,
                onschool:"hidden",
                onname:"hidden",
                dot_left:"hidden",
                dot_right:"dot_right"}))
          }
        if(event.target.value === 'left_collar')
          {
            set_dot_position(data_position =>(
              {...data_position,
                onschool:"hidden",
                onname:"hidden",
                dot_left:"dot_left",
                dot_right:"hidden"}))
          }
      }
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
  return (<>

    <div className='container_form'>

      <div className='grid_input'>

        <div className='input_right'>
            <form onSubmit={''}>
            <h2>สิ่งที่ต้องการปักปักด้านขวา</h2>

            <div className='input_right_container'>
        
              <div className='textarea_input_right'>
                <textarea 
                value={formdata.text_right.textright_input} name='textright_input' onChange={handle_text} placeholder="สิ่งที่ต้องการปัก"
                />
              </div>
              <div className='color_container_right'>
                <input className='color_input_right' type="color" 
                value={formdata.text_right.color_right} name='color_right' onChange={handle_text}
                />
              </div>
            </div>
            <h2>สิ่งที่ต้องการปักปักด้านซ้าย</h2>
            <div className='input_left_container'>
        
              <div className='textarea_input_left'>
              <textarea 
                value={formdata.text_left.textleft_input} name='textleft_input' onChange={handle_text} placeholder="สิ่งที่ต้องการปัก"
                />
              </div>
              <div className='color_container_left'>
                <input className='color_input_left' type="color" 
                value={formdata.text_left.color_left} name='color_left' onChange={handle_text}
                />
              </div>
            </div>

            <div>
            <h2>จุด</h2>
            <input
            type="checkbox"
            checked={checbox_dot}
            onChange={handlecheckbox_dot}
            />

            {checbox_dot ? <div>
            <div className='dot_type'>
              {<p>{formdata.dot.type + formdata.dot.position+formdata.dot.amount_dot+formdata.dot.color_dot}</p>}
            <select name="type" onChange={handledot}>
            <option value="no_dot">จุดหรือดาว</option>
            <option value="dot">จุด</option>
            <option value="star">ดาว</option>
            </select>
            </div>

            <div className='dot_position'>
            <select name="position" onChange={handledot_position}>
            <option value="no_dot">ตำแหน่งของจุด</option>
            <option value="onschool_shirt">บนชื่อโรงเรียน</option>
            <option value="onname_shirt">บนชื่อนักเรียน</option>
            <option value="right_collar">บนปกขวา</option>
            <option value="left_collar">บนปกซ้าย</option>
            </select>
            </div>
            
            <div className='dot_amount'>
            <select name="amount_dot" onChange={handledot}>
            <option value="0">จำนวนจุด</option>
            <option value="1">1 จุด</option>
            <option value="2">2 จุด</option>
            <option value="3">3 จุด</option>
            </select>
            </div>

            <div className='dot_color' onChange={handledot}>
            <input type="color" name="color_dot" id="" />
            </div>
            </div>:''}
            </div>

            </form>
          </div>
          </div>

      <div className='body_shirt'>
        <h1>รูปแบบกราฟิค</h1>
        <div className='shirt_design' >
            <img src="image_folder/shirt.png" alt="" />
            <div className='grid_dot'>
                <div className={dot_position_class.dot_left}>
                {render_dot1(formdata.dot.type,formdata.dot.amount_dot)}
                  </div>
                <div className={dot_position_class.dot_right} style={{color:formdata.dot.color_dot}}>
                {render_dot1(formdata.dot.type,formdata.dot.amount_dot)}
                </div>
            </div>
            <div className='grid_name'>
                <div className="on_right">
                <div className={dot_position_class.onschool} style={{color:formdata.dot.color_dot}}>{render_dot_school(formdata.dot.type,formdata.dot.amount_dot)}</div>
                <div style={{color:formdata.text_right.color_right}}>{render_h1(formdata.text_right.textright_input)}</div>
                </div>
                
                <div className="on_left">
                <div className={dot_position_class.onname} style={{color:formdata.dot.color_dot}}>{render_dot_name(formdata.dot.type,formdata.dot.amount_dot)}</div>
                <div style={{color:formdata.text_left.color_left}}>{render_h1(formdata.text_left.textleft_input)}</div>
                  </div>
            </div>
            </div>
        </div>
        <div>
        </div>
    </div>
  </>);
}

export default Shirt_graphic;
