import React, { useState } from 'react';

const DataTable = () => {
  const [data] = useState([
    { id: 1, value1: "asffsa", value2: "1", value3: "20", value4: "20" },
    { id: 2, value1: "fasfas", value2: "1", value3: "20", value4: "20" }
  ]);

  return (
    <div>
      <h1>Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Value 1</th>
            <th>Value 2</th>
            <th>Value 3</th>
            <th>Value 4</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.value1}</td>
              <td>{item.value2}</td>
              <td>{item.value3}</td>
              <td>{item.value4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
