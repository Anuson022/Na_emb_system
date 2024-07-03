import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

import './Customer_table.css'

const ITEMS_PER_PAGE = 5;
const Customer_table = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
  const Check_verify = (verify) => {return verify ? 'ยืนยันแล้ว' : 'ยังไม่ยืนยัน';}
  useEffect(() => {
    fetching_data(currentPage)
  }, [currentPage]);

  const fetching_data =async(page) =>
    {
      const search_value = '';
      const response = await axios.post('http://localhost:5000/search_cus1', {search_value}).then(response => {
      setData(response.data);
        // Extract column headers from the data keys
        /*if (response.data.length > 0) {
          setColumns(Object.keys(response.data[0]));
        }*/
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      })
      .finally
      {
      };
    }
  const handleSearch = async (e) => {
    setSearchTerm(e.target.value)
    const search_value = e.target.value
    try {
      const response = await axios.post('http://localhost:5000/search_cus1', {search_value});
      setData(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
    const navigate = useNavigate();
    
    const handleClick = (cus_id,info,parent_name,phone_number,status) => {
      const cus_data = {cus_id,info,parent_name,phone_number,status}
      navigate('/test-com', { state: { cus_data } });
    };

    return (
      
<div class="container_customer_table">
  <div>
  <button >Go to Test Component</button>

  <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
      />
  </div>
	<table>
		<thead className="table_head">
			<tr>
            <th>รหัสลูกค้า</th>
            <th>รายละเอียด</th>
            <th>ชื่อผู้สั่ง</th>
            <th>เบอร์โทร</th>
            <th>สถานะ</th>
            <th>Actions</th>
            <th>Actions</th>
            <th>Actions</th>
			</tr>
		</thead>
		<tbody className="table_body">
        {currentItems.map((item) => (
            <tr key={item.cus_id}>
              <td className="td_nowarp">{item.cus_id}</td>
              <td className="info_text">{item.info}</td>
              <td className="td_nowarp">{item.parent_name}</td>
              <td className="td_nowarp">{item.phone_number}</td>
              <td className="info_text">{item.status}</td>
              <td className="td_nowarp"><button class="fa fa-info" aria-hidden="true"></button></td>
              <td className="td_nowarp" onClick={() => handleClick(item.cus_id,item.info,item.parent_name,item.phone_number,item.status)}><button>Edit</button></td>
              <td className="td_nowarp"><button>Delete</button></td>
            </tr>
          ))}
		</tbody>
	</table>
  <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
  <button onClick={handleNextPage} disabled={indexOfLastItem >= data.length}>Next</button>

</div>
    );
}
export default Customer_table;