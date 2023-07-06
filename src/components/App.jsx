// import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
//  import axios from "axios";
import { getImages } from "../services/getImages";
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import { Modal } from "./Modal/Modal";
import { Button } from "./Button/Button";
import { useState } from "react";
import { useEffect } from "react";
  

    const toastConfig = {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    };

    export const App =()=>{

    const [images, setImages] = useState([]);
    const [searchValue, setSearchValue]= useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ isOpen: false, imageURL: '' });
    const [page, setPage] = useState(1);
    const [showLoadMore, setShowLoadMore] = useState(true);

   
    const  handleFormSubmit = searchValue => {
      setPage(1);
      // setImages([]);
      setSearchValue(searchValue);
      }

      useEffect(()=>{
        const fetchImages = async ()=>{
        
          if ( !searchValue.trim() ) {return }
            setLoading(true);
            setError(null);
          try {
  
            const response = await getImages(searchValue, page);
            const images = response.data.hits;
            const totalPages = Math.ceil(response.data.totalHits / 12);
            const hasMoreImages = page < totalPages;
      
          if (page === 1) {
            setImages(images);
            setPage(1);
          } else {
            setImages(prevState => [...prevState, ...images]);
          }
            setShowLoadMore(hasMoreImages);
    
          if (images.length === 0) {
            toast.warn("Фото з таким іменем не існує", toastConfig);
          }
            } catch (error) {
              setError( error.message );
              toast.error(error.message, toastConfig);
            } finally {
              setLoading(false);
            }
          }

            fetchImages()

          }, [searchValue, page]);

    const onOpenModal =  imageURL => {
        setModal({
          isOpen: true,
          imageURL: imageURL,
        });
      };
  
    const onCloseModal = () => {
        setModal({
          isOpen: false,
          imageURL: '',
        });
      };
    

    const loadMoreImages = ()=>{
      setPage(prevState => prevState + 1)
   }

    return  <div >
              <Searchbar onSubmit={handleFormSubmit} />
                {error && <p>{error}</p>}
                {loading && ( <RotatingLines
                strokeColor=" #3f51b5"
                strokeWidth={5}
                animationDuration={0.75}
                width={96}
                visible={true}
              />
            )
          }
               {modal.isOpen && <Modal
               isOpen={modal.isOpen}
               imageURL={modal.imageURL}
               onCloseModal={onCloseModal}
             />
          }
              {images.length > 0 &&(
            <>
              <ImageGallery images={images}  onOpenModal={onOpenModal} />
              {showLoadMore && <Button onClick={loadMoreImages} text="Load More" />}
            </>
              ) 
          }
            </div>
    }


   
