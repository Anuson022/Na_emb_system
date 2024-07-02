import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';


const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [name,setname] = useState('')
  const [test_image, set_testimage] = useState(null);
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/images');
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handletext = (e) => {
    setname(e.target.value);
  };
  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }
    if (!name) {
        alert('Please insert name.');
        return;
      }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('image_name',name)
    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },

      });
      console.log(res.data);
      alert('File uploaded successfully');
      fetchImages(); // Refresh the list of images
    } catch (err) {
      console.error(err);
      alert('Error uploading file');
    }
  };
  const CustomOption = (props) => {
    const { innerRef, innerProps, data } = props;
    return (
      <div ref={innerRef} {...innerProps} className="custom-option">
        <img src={data.image} alt={data.label} style={{ width: 20, height: 20, marginRight: 10,marginTop: 10 }} />
        {data.label}
      </div>
    );
  };
  
        const option_test = []
        images.map((item) => {
            option_test.push({
                value: item.School_name,
                label: item.School_name,
                image: `http://localhost:5000${item.path}`
            });
        });
    
            
    
  const h_c = (e)  =>
    {
    set_testimage(e.image)
    }
  return (
    <div>
      <input
        id="fileInput"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button onClick={handleButtonClick}>Select File</button>
      <button onClick={handleFileUpload}>Upload</button>
      <input onChange={handletext} type="text" />
      <div style={{ width: 300, margin: '0 auto', marginTop: 50 }}>
      <Select
        options={option_test}
        components={{ Option: CustomOption }}
        placeholder="Select a fruit"
        onChange={h_c}
      />
        <div>
            <img src={test_image} alt="" />
        </div>


    </div>


      <div>
        {images.map((image) => (
            <div>
            <img
            key={image.id}
            src={`http://localhost:5000${image.path}`}
            alt="Uploaded"
            style={{ width: '200px', height: '100px', margin: '10px' }}
          />
          <p >{image.School_name}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
