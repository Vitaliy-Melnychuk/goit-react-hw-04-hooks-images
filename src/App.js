import React, { useState, useEffect } from 'react';
import {Modal} from './components/Modal/Modal';
import {ImageGallery} from './components/ImageGallery/ImageGallery';
import {Searchbar} from './components/Searchbar/Searchbar';
import {Button} from './components/Button/Button';
import {MyLoader} from './components/Loader/Loader';
import s from './App.module.css';

function App() {
  const [selectedImage, setSelectedImage] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [arrayImage, setArrayImage] = useState([]);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState('idle');

  useEffect( () => {
    if (page) {
      fetch(`https://pixabay.com/api/?key=24030089-eaaf496be91aa9ac1c5e468a6&q=${searchValue}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(res => res.json())
      .then(res => setArrayImage(res.hits))
      .then(() => setStatus('resolved'))
      .catch(err => {
        console.log(err);
      });
    }
  }, [searchValue, page]);

  const formSubmitHandler = (inputValue) => {
    if (inputValue.trim() !== '') {
      setSearchValue(inputValue);
      setPage(1);
      setStatus('pending');
      return;
    }
    alert('Введіть текс для пошуку');
  };

  const onClickButton = () => {
    setStatus('pending');
    setPage(prevState => prevState + 1);
  };

  const handleSelectImage = data => setSelectedImage(data);

  const closeModal = () => setSelectedImage('');

  return (
    <div className={s.App}>
      <Searchbar onSubmit={formSubmitHandler}/>
      {status === 'pending' && <MyLoader/>}
      {status === 'resolved' && <ImageGallery images={arrayImage} onSelect={handleSelectImage}/>}
      {(status === 'resolved' && arrayImage.length === 12) && <Button onClick={onClickButton}/>}
      {selectedImage && <Modal image={selectedImage} onClose={closeModal}/>}
    </div>
  );
}

export default App;