import React, { useState } from 'react';
import axios from 'axios';
import './css1.css'

const DynamicInputGrid = () => {
  const [inputs, setInputs] = useState([{ id: 1, value1: '', value2: '', value3: '',value4: '' }]);

  const addInput = () => {
    setInputs([...inputs, { id: inputs.length + 1, value1: '', value2: '', value3: '',value4: '' }]);
  };

  const removeInput = (id) => {
    setInputs(inputs.filter(input => input.id !== id));
  };

  const handleChange = (id, name, value) => {
    setInputs(inputs.map(input => {
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

  const handleSubmit = () => {
    axios.post('/data_tester', inputs)
      .then(response => {
        console.log('Data sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  };

  return (
    <>
      <fieldset className='order_sum'>
        <legend><h1>สรุปรายการ</h1></legend>
        <table>
      <tr>
        <th style={{textAlign:'left'}}>รายการ</th>
        <th style={{textAlign:'center'}}>จำนวน</th>
        <th style={{textAlign:'center'}}>ราคา/หน่วย</th>
        <th style={{textAlign:'center'}}>จำวนเงิน</th>
      </tr>

      {inputs.map((input, index) => (
        <tr key={input.id} className='grid_order'>
          <td className='order_info'>
          <textarea style={{width:'100%'}}
            type="text"
            value={input.value1}
            onChange={(e) => handleChange(input.id, 'value1', e.target.value)}
          /></td>
          <td className='quantity'>
          <input style={{textAlign:'center'}}
            type="text"
            value={input.value2}
            onChange={(e) => handleChange(input.id, 'value2', e.target.value)}
          /></td>
          <td className='price'>
          <input style={{textAlign:'center'}}
            type="text"
            value={input.value3}
            onChange={(e) => handleChange(input.id, 'value3', e.target.value)}
          /></td>
          <td className='price_sum'>
          <input style={{textAlign:'center'}}
            type="text"
            value={input.value4}
            onChange={(e) => handleChange(input.id, 'value4', e.target.value)}
          /></td>
          <td>
            <button onClick={() => removeInput(input.id)}>ลบรายการ</button>
            </td>
        </tr>
      ))}
    </table>

      </fieldset>

    <button onClick={addInput}>Add Input</button>
    <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default DynamicInputGrid;
