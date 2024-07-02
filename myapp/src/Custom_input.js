import axios from "axios";
import { useState } from "react";

const Custom_input = () => {

    const [input_data,setinput] = useState(
        {
            school_name: "",
            firstname: "",
            lastname: "",
            year: "",
            type: "",
            field_name: "",
            silk_color: "",
            dotShirt: "",
            dotShirt_amount: "",
            dotCollar: "",
            dotCollar_amount: "",
            sameside: "",
            amount: "",
            parent_name: "",
            phone_number: "",
            que_order: "",
            Status: ""
        });
    const [checkbox_dot_c,setcheckbox_c] = useState(false)
    const [checkbox_dot_s,setcheckbox_s] = useState(false)

    const handlechange1 = (goto) =>
        {
            setinput({...input_data,[goto.target.name]: goto.target.value});
        }
    const handlechange_dot_c = ()=>
        {setcheckbox_c(!checkbox_dot_c)}
    const handlechange_dot_s = ()=>
        {setcheckbox_s(!checkbox_dot_s)}
    const insert_data = async(event)=>
        {
            try
            {
                await axios.post("http://localhost:5000/send_customdata",input_data);
                await setinput(
                    {
                        school_name: "",
                        firstname: "",
                        lastname: "",
                        year: "",
                        type: "",
                        field_name: "",
                        silk_color: "",
                        dotShirt: "",
                        dotShirt_amount: "",
                        dotCollar: "",
                        dotCollar_amount: "",
                        sameside: "",
                        amount: "",
                        parent_name: "",
                        phone_number: "",
                        que_order: "",
                        Status: ""
                    })   
                    console.log(input_data) 
            }
            catch (error) {
                console.error('Error submitting data:', error);
            }
        }
        const Shirt_design = () =>
            {
                return (
                    <div class="container_shirt">
                    <img src="image_folder/shirt.png" alt="" />
                    <div class="grid_container">
                        <div class="grid1"><textarea value={(input_data.school_name).split('\n').filter(line => line.trim() !== '')}></textarea><p>อนุสรณ์ อั๋นประเสริฐ</p></div>
                        <div class="grid2">{input_data.firstname+" "+input_data.lastname}</div>
                    </div>
                    </div>
                    )
            }
    return (
        <div>
            <h1 align='center'>กรุณากรอกรายละเอียด</h1>
            <div className="warpper_input">
            <div className="input_class">

      <div className="school_style">
      <label>school_name</label>
      <br />
      <textarea name="school_name" value={input_data.school_name} onChange={handlechange1}></textarea>
      <br />
      </div>

      <label>firstname</label>
      <br />
      <input name="firstname" value={input_data.firstname} onChange={handlechange1} />
      <br />
      
      <label>lastname</label>
      <br />
      <input name="lastname" value={input_data.lastname} onChange={handlechange1} />
      <br />
      
      <label>silk_color</label>
      <br />
      <input name="silk_color" value={input_data.silk_color} onChange={handlechange1} />
      <br />
      
      <div>
      <label htmlFor="checkbox">Dot on shirt </label>
      <input type="checkbox" checked={checkbox_dot_s} onChange={handlechange_dot_s}></input>
      {checkbox_dot_s?
            <div>
        <label> Dot position </label>
        <select name="dotShirt" value={input_data.dotShirt} onChange={handlechange1}>
        <option value="None"> Choose position </option>
        <option value="onSchool">Dot on school name</option>
        <option value="onName">Dot on name</option>
        </select>

        <label> Dot amount </label>
        <select name="dotShirt_amount" value={input_data.dotShirt_amount} onChange={handlechange1}>
        <option value="None"> Choose amount </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        </select>
      <br />
            </div>:
      <br />}
        </div>

      <div>
      <label htmlFor="checkbox">Dot shirt collar </label>
      <input type="checkbox" checked={checkbox_dot_c} onChange={handlechange_dot_c}></input>
      {checkbox_dot_c?
            <div>
        <label> Dot position </label>
        <select name="dotCollar" value={input_data.dotCollar} onChange={handlechange1}>
        <option value="None"> Choose position </option>
        <option value="leftside">shirt collar left</option>
        <option value="rightside">shirt collar right</option>
        </select>

        <label> Dot amount </label>
        <select name="dotCollar_amount" value={input_data.dotCollar_amount} onChange={handlechange1}>
        <option value="None"> Choose amount </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        </select>
      <br />
            </div>:
      <br />}
        </div>

      <label>1 or 2 side</label>
      <br />
        <select name="sameside" value={input_data.sameside} onChange={handlechange1}>
        <option value="None"> Choose amount </option>
        <option value="1 side">1 side(sameside with school name)</option>
        <option value="2 side">2 side(not sameside with school name)</option>
        </select>
      <br />
      
      <label>amount</label>
      <br />
      <input name="amount" value={input_data.amount} onChange={handlechange1} />
      <br />
      
      <label>parent_name</label>
      <br />
      <input name="parent_name" value={input_data.parent_name} onChange={handlechange1} />
      <br />
      
      <label>phone_number</label>
      <br />
      <input name="phone_number" value={input_data.phone_number} onChange={handlechange1} />
      <br />
      <Shirt_design/>
      <button type="button" onClick={insert_data}>submit</button>
            </div>
            </div>
        </div>
    );
}
export default Custom_input;