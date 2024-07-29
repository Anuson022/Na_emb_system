import React, { useEffect, useState,useNavigate } from 'react';
import './customer_form.css'
import Shirt_graphic from './Shirt_graphic';
import Shirt_graphic_cus_const from './Shirt_graphic_cus_const';
import { Link } from 'react-router-dom'
import axios from 'axios';

function Student_form() {


    return (
      <>
      <div >
        <Shirt_graphic_cus_const />
        
      </div>
      </>
    );
}

export default Student_form

/*                    
            <div className='form_container'>
                <div className='input_container'>
<form onSubmit={handle_submit} >
                        <div className='form_input'>
                        <p>กรุณากรอกข้อมูล</p>
                        <br />
                        <div>
                        <label htmlFor="">รายละเอียด</label>
                        <textarea 
                        name="info_data" 
                        id="" 
                        placeholder='สิ่งที่ต้องการปัก...'
                        value={formdata.info_data}
                        onChange={handleChange}
                        ></textarea>
                        </div>

                        <div>
                        <label htmlFor="">ชื่อผู้สั่ง</label>
                        <input type="text" name="parent_name" id="" 
                        value={formdata.parent_name} onChange={handleChange}/>
                        </div>
                        
                        <div>
                        <label htmlFor="">เบอร์โทร</label>
                        <input type="text" name="phone_number" id="" 
                        value={formdata.phone_number} onChange={handleChange}/>
                        </div>

                        <div>
                        </div>
                        
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                        </div>
                    </form>
                                    </div>

            </div>*/