import React, { useState } from 'react';

const ImageSelector = () => {
  const [selectedImage, setSelectedImage] = useState('');

  const handleChange = (event) => {
    setSelectedImage(event.target.value);
  };

  return (
    <div>
<select value={selectedImage}>
  <option value="/image_folder/S_Shirt.png">
    <img src="/image_folder/S_Shirt.png" alt="S-Shirt" style={{ width: '100px', height: '100px' }} />
    S-Shirt
  </option>
  <option value="/image_folder/S_Shirt.png">
    <img src="/image_folder/S_Shirt.png" alt="S-Shirt" style={{ width: '100px', height: '100px' }} />
    S-Shirt
  </option>
</select>

      {selectedImage && (
        <div>
          <h2>Selected Image:</h2>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
