import {useState,useEffect} from 'react'
import axios from 'axios';
import './Image_AD.css'
function Image_AD() {
    const [FileImage, SetFileImage] = useState(null);
    const [FileName, SetFileName] = useState('');
    const [FileShow,SetFileShow] = useState([])
    const [SearchLogo,SetSearchLogo] = useState('')
    const fetchFiles = async (e) => {
        const res = await axios.post('/api/files');
        SetFileShow(res.data);
    };
    useEffect(() => {
        fetchFiles();
    }, []);

    const onFileChange = (event) => {
        SetFileImage(event.target.files[0]);
    };

    const onFileNameChange = (event) => {
        SetFileName(event.target.value);
    };

    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', FileImage);
        formData.append('name', FileName);

        await axios.post('/upload', formData);
        fetchFiles();
    };

    const onDeleteFile = async (id) => {
        await axios.delete(`/files/${id}`);
        fetchFiles();
    };
    const handleSearch = async (e) =>
        {
            const search_name = e.target.value
            console.log(search_name)
            const res = await axios.post('/api/files',{search_name});
            SetFileShow(res.data);
        }
  return (
    <>
    <div className='AD_container'>
        <div className='Image_upload'>
            <form onSubmit={onFileUpload}>
            <h2>อัพโหลดรูปภาพโลโก้</h2>
            <input 
                type="text" 
                placeholder="Enter file name" 
                value={FileName} 
                onChange={onFileNameChange} 
            />
            <input type="file" onChange={onFileChange} />
            <button type='submit'>Upload!</button>
            </form>
        </div>
        <div className='Image_show'>
            <label htmlFor="">Search</label>
            <input type="text" onChange={handleSearch} />
            <div className='Image_grid'>
            {FileShow.map((file) => (
                    <div className='Image_item' key={file.id}>
                        <img 
                            src={`/uploads/${file.path.split('/').pop()}`} 
                            alt={file.name} 
                        />
                        <br />
                        {file.name}
                        <br />
                        <button onClick={() => onDeleteFile(file.id)}>ลบรูปภาพ</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </>
  )
}

export default Image_AD