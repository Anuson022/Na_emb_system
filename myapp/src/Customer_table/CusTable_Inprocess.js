import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import yes_no_Popup from "./yes_no_Popup";
import './CustomerTable.css'

const ITEMS_PER_PAGE = 5;
const Customer_table = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const [popup_delete, setpopup_delete] = useState(null);
  const [popup_view, setpopup_view] = useState({});

  const [showpopup_delete, setshowpopup_delete] = useState(false);
  const [showpopup_view, setshowpopup_view] = useState(false);

  const handleShowPopup_delete = (cus_id) => {
    setpopup_delete(cus_id);
    setshowpopup_delete(true);
  };
  const handleShowPopup_view = (cus_id,info,parent_name,phone_number,status) => {
    setpopup_view([cus_id,info,parent_name,phone_number,status]);
    console.log(data[0])

    setshowpopup_view(true);
  };
  const handleYes_delete = async() => {
    try {
      const response = await axios.post('/delete_cusdata', {popup_delete});
      setpopup_delete(response.data)
      fetching_data();
      //alert(popup_delete)
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    setshowpopup_delete(false);
  };
  const handleNo = () => {
    setshowpopup_delete(false);
    setshowpopup_view(false);
  };

  const Check_verify = (verify) => {return verify ? 'ยืนยันแล้ว' : 'ยังไม่ยืนยัน';}
  useEffect(() => {
    fetching_data(currentPage)
  }, [currentPage]);

  const fetching_data =async(page) =>
    {
      const search_value = '';
      const response = await axios.post('/search_cus1', {search_value}).then(response => {
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
      const response = await axios.post('/search_cus1', {search_value});
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
              <td className="td_nowarp"><button class="fa fa-info" aria-hidden="true" 
             onClick={() => handleShowPopup_view(item.cus_id,item.info,item.parent_name,item.phone_number,item.status)}></button></td>
              <td className="td_nowarp"><button onClick={() => handleClick(item.cus_id,item.info,item.parent_name,item.phone_number,item.status)}>Edit</button></td>
              <td className="td_nowarp"><button onClick={() => handleShowPopup_delete(item.cus_id)} >Delete</button></td>
            </tr>
          ))}
		</tbody>
	</table>
  <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
  <button onClick={handleNextPage} disabled={indexOfLastItem >= data.length}>Next</button>
      {showpopup_delete && (
        <div className="popup">
          <div className="popup-inner">
            <p>Do you want to proceed? {popup_delete}</p>
            <button onClick={handleYes_delete}>Yes</button>
            <button onClick={handleNo}>No</button>
          </div>
        </div>
      )}
      {showpopup_view && (
        <div className="popup">
          <div className="popup-inner">
            {popup_view.map((item) => (
              <div key={item}>
                <p>
                  {item}
                </p>
              </div>

          ))}

            <button onClick={handleNo}>No</button>
          </div>
        </div>
      )}
</div>
    );
}
export default Customer_table;