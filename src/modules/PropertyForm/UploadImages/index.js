import React, {useState} from 'react';
import {useDropzone} from "react-dropzone";

const UploadImages = ({onMoveToPrevStep, onSubmitForm}) => {
  const [images, setImages] = useState([]);
  const [featuredImage, setFeaturedImage] = useState('');

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    multiple: true,
    maxFiles: 4,
    onDrop: acceptedFiles => {
      const uploads = acceptedFiles.map(file => {
        return {
          id: Math.floor(Math.random() * 10000),
          path: file.path,
          metaData: {type: file.type, size: file.size},
          preview: URL.createObjectURL(file),
        };
      });
      setImages(uploads);
    },
  });

  const onSetFeaturedImage = (e, id) => {
    if (e.target.checked) {
      setFeaturedImage(id)
    } else {
      setFeaturedImage('')
    }
  };

  const handleSubmit = () => {
    onSubmitForm(images)
  };

  return (
    <div className='flex-grow-1 d-flex flex-column justify-content-center'>

      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <div className='bg-light border-info d-flex align-items-center justify-content-center'
             style={{minWidth: 400, minHeight: 150}}>
          Drag and drop files here
        </div>
      </div>

      {images.length > 0 &&
      <div className='d-flex align-items-center flex-wrap mt-3'>
        {images.map((file, index) => (
          <div className='w-50 p-2 text-center' key={index}>
            <img src={file.preview} alt='uploads' height={100} width={100}/>
            <div className='mt-2'>
              <input type="checkbox" checked={featuredImage === file.id}
                     onChange={(e) => onSetFeaturedImage(e, file.id)}/>
              <label className='ml-2'>Set as Featured image</label>
            </div>
          </div>
        ))}
      </div>}
      <div className='d-flex align-items-center justify-content-between mt-3'>
        <button className='bg-light rounded border-0 py-1 px-2' onClick={onMoveToPrevStep}>Go Back</button>
        <button className='bg-primary text-white rounded border-0 py-1 px-2' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default UploadImages;