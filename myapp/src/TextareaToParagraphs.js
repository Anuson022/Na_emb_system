import React, { useEffect, useState,Component } from 'react';
import { useLocation } from 'react-router-dom';
import './css1.css'
import Shirt_graphic_cus_com from './Shirt_graphic_cus_com';
import axios from 'axios';

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
  const [FetchData,SetFetchData] = useState("test")
  const Fetch_graphic = async() => 
    {
      try {
        const response = await axios.get('http://localhost:5000/get_cusID', {
          params: {
            key1: 'value1',
            key2: 'value2'
          }
        });
        SetFetchData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    useEffect(() => {
      Fetch_graphic();
    }, []);
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

  const [Logo,Setlogo] = useState(
    {
      Logo_right:
      {school_name:"",image_path:""},
      Logo_left:
      {school_name:"",image_path:""}
    })
  const [Image,Setimage] = useState([])

  const [formdata_info, setformdata_info] = useState({
    info_data:"",
    parent_name:"",
    phone_number:"",
    status:"ยังไม่ตรวจสอบ",
  });

  const fetch_image = async () => {
    const res = await axios.post('http://localhost:5000/files');
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

  useEffect(() => {
    fetch_image();
  }, []);
  const [orders, setOrders] = useState([{ id: 1, value1: '', value2: '', value3: '',value4: '' }]);

  const handle_cuschange = (e) => {
    const { name, value } = e.target;
    setformdata_cus({
      ...formdata_cus,
      [name]: value,
    });
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
  document.body.classList.add('body_of_edit');
  return () => {
    document.body.classList.remove('body_of_edit');
  };}, []);

  return (
    <div className=''>

      <br />
      <form className='cus_insert'>
  <fieldset className=''>
  <legend style={{}}><h1>ข้อมูลสำหรับแสดงกราฟิค</h1></legend>
  <div className='Shirt_com'>
  <>
    <Shirt_graphic_cus_com setcheck_dot={setcheck_dot} checbox_dot={checbox_dot} 
    formdata={formdata} setformdata={setformdata} set_dot_position={set_dot_position} 
    dot_position_class={dot_position_class}
    Logo = {Logo} Setlogo = {Setlogo}
    Image = {Image} Setimage = {Setimage}
    formdata_info = {formdata_info}
    setformdata_info ={setformdata_info}
    />
    </>
  </div>
    </fieldset>
      </form>

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