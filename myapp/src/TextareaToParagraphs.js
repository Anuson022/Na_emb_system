import React, { useEffect, useState,Component } from 'react';
import { useLocation } from 'react-router-dom';
import './css1.css'
import axios from 'axios';

const render_h1 = (text) => {
  return (
    text.split('\n').map((line, index) => (<h1 key={index}>{line}</h1>))
  );
};
const render_dot1 = (dot_type,dot_amount) => {
  var dot_star =''
  let dot_array =[]
  var font_size ={}
  if(dot_type === 'dot')
    {dot_star = '•';font_size = {fontSize: "1.875rem",}}
  if(dot_type === 'star')
    {dot_star = '★';font_size = {fontSize: "1.7rem",}}
  if(dot_amount === '1')
    {dot_array = ['\u00A0', '\u00A0', dot_star];}
  if(dot_amount === '2')
    {dot_array = ['\u00A0', dot_star, dot_star];}
  if(dot_amount === '3')
    {dot_array = [dot_star, dot_star, dot_star];}
  return(<>
    {dot_array.map((item,index)=>
    { const re_index = dot_array.length - index;
      return <h1 key={index} className={'dot'+re_index} style={font_size}>{item}</h1>
    })}
    </>
    )
};
const render_dot_school = (dot_type,dot_amount) => {
  var dot_star =''
  let dot_array =[]
  var font_size ={}
  if(dot_type === 'dot')
    {dot_star = '•';font_size = {fontSize: "1.7rem",marginTop:-20,marginBottom:-5,textAlign: 'center'}}
  if(dot_type === 'star')
    {dot_star = '★';font_size = {fontSize: "1.2rem",marginTop:-15}}
  if(dot_amount === '1')
    {dot_array = ['\u00A0', dot_star, '\u00A0'];}
  if(dot_amount === '2')
    {dot_array = ['\u00A0', dot_star, dot_star];}
  if(dot_amount === '3')
    {dot_array = [dot_star, dot_star, dot_star];}
  return(<h1 className={'dot_school'} style={font_size}>{dot_array}</h1>)
};
const render_dot_name = (dot_type,dot_amount) => {
  var dot_star =''
  let dot_array =[]
  var font_size ={}
  if(dot_type === 'dot')
    {dot_star = '•';font_size = {fontSize: "1.7rem",marginTop:-20,marginBottom:-5,textAlign: 'center'}}
  if(dot_type === 'star')
    {dot_star = '★';font_size = {fontSize: "1.2rem",marginTop:-15}}
  if(dot_amount === '1')
    {dot_array = ['\u00A0', dot_star, '\u00A0'];}
  if(dot_amount === '2')
    {dot_array = ['\u00A0', dot_star, dot_star];}
  if(dot_amount === '3')
    {dot_array = [dot_star, dot_star, dot_star];}
  return(<h1 className={'dot_name'} style={font_size}>{dot_array}</h1>)
};

const TextareaToParagraphs = () => {
  const location = useLocation();
  const { cus_data } = location.state;
  const [formdata_cus, setformdata_cus] = useState({
    cus_id:cus_data.cus_id,
    info:cus_data.info,
    parent_name:cus_data.parent_name,
    phone_number:cus_data.phone_number,
    status:"ตรวจสอบแล้ว"
  });
  const [formdata, setformdata] = useState({
    
    text_right: 
      {
        textright_input: '',
        color_right: '#0000FF'
      },
    text_left:
      {
        textleft_input: '',
        color_left: '#0000FF'
      },
    dot:
    {
      type:"",
      position:"",
      amount_dot:"",
      color_dot:""
    },
  });
  const [orders, setOrders] = useState([{ id: 1, value1: '', value2: '', value3: '',value4: '' }]);

  const handle_cuschange = (e) => {
    const { name, value } = e.target;
    setformdata_cus({
      ...formdata_cus,
      [name]: value,
    });
  };
    const [checkbox_logo, setLogo] = useState(
      {
        logo_right: false,
        logo_left: false
      });
    const [checbox_dot,setcheck_dot] = useState(false)
    const [dot_position_class,set_dot_position] = useState(
      {
        onschool:"hidden",
        onname:"hidden",
        dot_left:"hidden",
        dot_right:"hidden"
      })
    const handlecheckbox_dot = (event) => {
      setcheck_dot(event.target.checked);
      if(event.target.checked === true)
        {
          setformdata((prevFormdata) => ({
            ...prevFormdata,
            dot: {
              ...prevFormdata.dot,
              type: 'dot',
              position:'onschool_shirt',
              amount_dot:'1',
              color_dot:'#0000FF'
            }
          }));
        }//auto input dot1
      else if(event.target.checked === false)
      {
        console.log(event.target.checked)
        setformdata((prevFormdata) => ({
          ...prevFormdata,
          dot: {
            ...prevFormdata.dot,
            type: '',
            position:'',
            amount_dot:'',
            color_dot:''
          }
        }));
      }//remove input dot1

    };
    const handle_logo = (event) => {
      const { name, checked } = event.target;
      setLogo((goto) => ({
        ...goto,
        [name]: checked,
      }));
    };
//order varible

  const addInput = () => {
    setOrders([...orders, { id: orders.length + 1, value1: '', value2: '', value3: '',value4: '' }]);
  };

  const removeInput = (id) => {
    setOrders(orders.filter(input => input.id !== id));
  };

  const handleDynamicInputGrid = (id, name, value) => {
    setOrders(orders.map(input => {
      if (input.id === id) {
        const updatedInput = { ...input, [name]: value };
        if (name === 'value2' || name === 'value3') {
          const sum = (parseFloat(updatedInput.value2) || 0) * (parseFloat(updatedInput.value3) || 0);
          updatedInput.value4 = sum.toString();
        }
        return updatedInput;
      }
      return input;
    }));
  };
//order varible
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
    const handle_submit = (e) =>
      {
        e.preventDefault();
      try {
        axios.post("http://localhost:5000/update_customdata",{formdata_cus,formdata,orders})
      } catch (error) {
        console.log(error)
      }

//console.log(result);
        
      }
/*
Admin_input
leftside array [["...","T.B.",],color]
rightside array [["...","T.B.",],color]
logo
dot_position

+
scout[type]
P.E uniform
order

parent_name get from user input
phone_number get from user input
que get from cusID
Paid :truefalse
Price: int*/


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
    <div className=''>
      <form className='cus_edit'>
      <fieldset>
      <legend style={{}}><h1>ข้อมูลลูกค้า</h1></legend>

<div className="customer_edit_content">

    <div className="grid_cus">

      <div className="grid_cus_item">
        <label htmlFor="cus_id">รหัสลูกค้า</label>
        <input
          type="text"
          name="cus_id"
          value={formdata_cus.cus_id}
          readOnly
        />
      </div>
      <div className="grid_cus_item">
        <label htmlFor="status">สถานะ</label>
        <select name="status" value={formdata_cus.status} onChange={handle_cuschange}>
        <option value={cus_data.status}>{cus_data.status}</option>
        <option value='ตรวจสอบแล้ว'>ตรวจสอบแล้ว</option>

        </select>
      </div>
    </div>

    <div className="grid_cus_item">
        <label htmlFor="info">รายละเอียด</label>
        <textarea
          name="info"
          value={formdata_cus.info}
          onChange={handle_cuschange}
        />
      </div>

    <div className="grid_cus">
    <div className="grid_cus_item">
        <label htmlFor="parent_name">ชื่อผู้สั่ง</label>
        <input
          type="text"
          id="parent_name"
          name="parent_name"
          value={formdata_cus.parent_name}
          onChange={handle_cuschange}
        />
      </div>
      <div className="grid_cus_item">
        <label htmlFor="phone_number">เบอร์โทร</label>
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
</fieldset>

      </form>
      <br />
      <form className='cus_insert'>
  <fieldset>
  <legend style={{}}><h1>ข้อมูลสำหรับแสดงกราฟิค</h1></legend>

    <div className='container_form'>

      <div className='grid_input'>

        <h1>กรุณากรอกรายละเอียด</h1>

        <div className='input_right'>
            <form onSubmit={handle_submit}>
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

            <button type="submit">TEST</button>
            </form>
          </div>
            <p>Selected Color: {formdata.text_right.color_right}</p>
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
    </fieldset>
      </form>
      <br />
      <form>
      <fieldset className='order_sum'>
        <legend><h1>สรุปรายการ</h1></legend>
        <table>
      <tr>
        <th style={{textAlign:'left'}}>รายการ</th>
        <th style={{textAlign:'center'}}>จำนวน</th>
        <th style={{textAlign:'center'}}>ราคา/หน่วย</th>
        <th style={{textAlign:'center'}}>จำวนเงิน</th>
      </tr>

      {orders.map((input, index) => (
        <tr key={input.id} className='grid_order'>
          <td className='order_info'>
          <textarea style={{width:'100%'}}
            type="text"
            value={input.value1}
            onChange={(e) => handleDynamicInputGrid(input.id, 'value1', e.target.value)}
          /></td>
          <td className='quantity'>
          <input style={{textAlign:'center'}}
            type="text"
            value={input.value2}
            onChange={(e) => handleDynamicInputGrid(input.id, 'value2', e.target.value)}
          /></td>
          <td className='price'>
          <input style={{textAlign:'center'}}
            type="text"
            value={input.value3}
            onChange={(e) => handleDynamicInputGrid(input.id, 'value3', e.target.value)}
          /></td>
          <td className='price_sum'>
          <input style={{textAlign:'center'}}
            type="text"
            value={input.value4}
            onChange={(e) => handleDynamicInputGrid(input.id, 'value4', e.target.value)}
          /></td>
          <td>
            <button onClick={() => removeInput(input.id)}>ลบรายการ</button>
            </td>
        </tr>
      ))}
    </table>

      </fieldset>
      </form>
    <button onClick={addInput}>Add Input</button>
    <button onClick={handle_submit}>Test_submit</button>


    </div>
    
  );
};

export default TextareaToParagraphs;

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