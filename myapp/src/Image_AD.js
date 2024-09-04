import { useState, useEffect } from 'react';
import axios from 'axios';
import './Image_AD.css';

function Image_AD() {
    const [FileImage, SetFileImage] = useState(null);
    const [FileName, SetFileName] = useState('');
    const [FileShow, SetFileShow] = useState([]);
    const [SearchLogo, SetSearchLogo] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const fetchFiles = async () => {
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

    const onFileUpload = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('file', FileImage);
            formData.append('name', FileName);
    
            await axios.post('/api/upload', formData);
            fetchFiles();
        } catch (error) {
            
        }

    };

    const onDeleteFile = async (id) => {
        await axios.delete(`/api/files/${id}`);
        fetchFiles();
    };

    const handleSearch = async (e) => {
        const search_name = e.target.value;
        setCurrentPage(1); // Reset to first page on search
        const res = await axios.post('/api/files', { search_name });
        SetFileShow(res.data);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = FileShow.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(FileShow.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
        <div style={{backgroundColor:'#6AB900',color:'white',padding:'0.1rem 1rem'}}><h2>อัพโหลดรูปภาพโลโก้</h2></div>
        <div className='AD_container'>

            <div className='Image_show'>
                <input type="text" className='search-input' style={{width:'100%'}} onChange={handleSearch} 
                placeholder="ค้นหา..."/>
                <div className='Image_grid'>
                    {currentItems.map((file) => (
                        <div className='Image_item' key={file.id}>
                            <img 
                                src={`/uploads/${file.path.split('/').pop()}`} 
                                alt={file.name} 
                            />
                            <br />
                            <label htmlFor="">{file.name}</label>
                            <br />
                            <button onClick={() => onDeleteFile(file.id)}>ลบรูปภาพ</button>
                        </div>
                    ))}
                </div>
                {/* Pagination */}

            </div>
            <div className='pagination'>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            <br />

        </div>
        <div className='Image_upload'>
                <form onSubmit={onFileUpload}>
                    <input className='search-input'
                        type="text" 
                        placeholder="โปรดใส่ชื่อไฟล์" 
                        value={FileName} 
                        onChange={onFileNameChange} 
                    />
                    <button type='submit'>อัพโหลด</button>
                    <div>
                        
                    </div>
                    <input style={{fontFamily:'RSU_regular',fontSize:'1.5rem'}} type="file" onChange={onFileChange} />
                    <br />
                    
                </form>
            </div>
        </>
    );
}

export default Image_AD;
