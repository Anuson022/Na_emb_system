import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const Image_input = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [files, setFiles] = useState([]);
    const [testImage, setTestImage] = useState(null);

    const fetchFiles = async () => {
        const res = await axios.get('/files');
        setFiles(res.data);
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const onFileNameChange = (event) => {
        setFileName(event.target.value);
    };

    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', fileName);

        await axios.post('/upload', formData);
        fetchFiles();
    };

    const onDeleteFile = async (id) => {
        await axios.delete(`/files/${id}`);
        fetchFiles();
    };

    const optionTest = [
      {
        value: "ไม่มี1",
        label: "ไม่มี2",
        image: "ไม่มี3",
      },
      ...files.map((item) => (
        {
          value: item.id,
          label: item.name,
          image: `/uploads/${item.path.split('/').pop()}`,
        }
      ))
    ];
    const CustomOption = (props) => {
      const { innerRef, innerProps, data } = props;
      return (
        <>
        <div ref={innerRef} {...innerProps} className="custom-option">
          <img src={data.image} alt={data.label} style={{ width: 20, height: 20, marginRight: 10, marginTop: 10 }} />
          {data.label}
        </div>
        </>
      );
    };
    const handleChange = (e) => {
      setTestImage(e.image);
    };
    return (
        <div>
            <h2>File Upload</h2>
            <input 
                type="text" 
                placeholder="Enter file name" 
                value={fileName} 
                onChange={onFileNameChange} 
            />
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload!</button>
            
            <h3>Uploaded Files</h3>
            <ul>
                {files.map((file) => (
                    <li key={file.id}>
                        <img 
                            src={`/uploads/${file.path.split('/').pop()}`} 
                            alt={file.name} 
                            width="100" 
                        />
                        {file.name}
                        <button onClick={() => onDeleteFile(file.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <div style={{ width: 300, margin: '0 auto', marginTop: 50 }}>
        <Select
          options={optionTest}
          components={{ Option: CustomOption }}
          placeholder="Select a fruit"
          onChange={handleChange}
        />
        <div>
          <img src={testImage} alt="" />
        </div>
      </div>
        </div>
    );
};

export default Image_input;
