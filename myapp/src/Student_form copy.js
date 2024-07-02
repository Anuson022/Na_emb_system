import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import Sriboonya from './Sriboonya'

function Student_form() {

    const stlying = {color:"red"}
    return (
        <div>
            <h1 align='center'>ระบบส่งข้อมูลสำหรับหน้าร้านเท่านั้น</h1>
            <h2 align='center' style={stlying}>ปักชื่อนักเรียน</h2>
            <div className='warpper'>
            <div className='container_school' align="center">
                <div className='grid_item1'>
                    <img src="/image_folder/Sriboonya.jpg" alt="" />
                    <p>โรงเรียนศรีบุญยานุสสรณ์</p>
                    <Link to='/sriboonya'><button>เลือก</button></Link>
                </div>
                <div className='grid_item2'>
                    <img src="/image_folder/Watdon.png" alt="" />
                    <p>โรงเรียนศรีวัดดอนไก่ดี</p>
                    <button>เลือก</button>
                </div>
                <div className='grid_item1'>
                    <img src="/image_folder/Watdon.png" alt="" />
                    <p>โรงเรียนศรีวัดดอนไก่ดี</p>
                    <button>เลือก</button>
                </div>
                <div className='grid_item1'>
                    <img src="/image_folder/Watdon.png" alt="" />
                    <p>โรงเรียนศรีวัดดอนไก่ดี</p>
                    <button>เลือก</button>
                </div>
                <div className='grid_item1'>
                    <img src="/image_folder/Watdon.png" alt="" />
                    <p>โรงเรียนศรีวัดดอนไก่ดี</p>
                    <button>เลือก</button>
                </div>
                <div className='grid_item1'>
                    <img src="/image_folder/Watdon.png" alt="" />
                    <p>โรงเรียนศรีวัดดอนไก่ดี</p>
                    <button>เลือก</button>
                </div>
                <div className='grid_item1'>
                    <img src="/image_folder/customize.png" alt="" />
                    <p>อื่นๆ(นอกเหนือจากนี้)</p>
                    <Link to='/custom_input'><button>เลือก</button></Link>
                </div>
            </div>
            </div>
        </div>
  )
}

export default Student_form