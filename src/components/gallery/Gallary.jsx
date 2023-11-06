import React, { useEffect, useState } from "react";
import "./Gallery.css";

import image1 from "../../assets/images/image-1.webp";
import image2 from "../../assets/images/image-2.webp";
import image3 from "../../assets/images/image-3.webp";
import image4 from "../../assets/images/image-4.webp";
import image5 from "../../assets/images/image-5.webp";
import image6 from "../../assets/images/image-6.webp";
import image7 from "../../assets/images/image-7.webp";
import image8 from "../../assets/images/image-8.webp";
import image9 from "../../assets/images/image-9.webp";
import image10 from "../../assets/images/image-10.jpeg";
import image11 from "../../assets/images/image-11.jpeg";

const imageSources = [
  { id: 1, src: image1,  },
  { id: 2, src: image2,  },
  { id: 3, src: image3,  },
  { id: 4, src: image4,  },
  { id: 5, src: image5,  },
  { id: 6, src: image6,  },
  { id: 7, src: image7,  },
  { id: 8, src: image8,  },
  { id: 9, src: image9,  },
  { id: 10, src: image10,  },
  { id: 11, src: image11,  },
  // Add more images here
];

const Gallery = () => {
  const [images, setImages] = useState(imageSources);
  const [selectedImages, setSelectedImages] = useState([]);
  const [featuredImage, setFeaturedImage] = useState();
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);

  const handleHoverImage = (id) => {
    console.log("hoverId", id);
    setHoveredImage(id);
  };

  const handleUnhoverImage = () => {
    setHoveredImage(null);
  };
  const handleToggleCheckboxes = () => {
    setShowCheckboxes((prevState) => !prevState);
  };

  useEffect(() => {
    if (selectedImages.length > 0) {
      setShowDeleteBtn(true);
    } else {
      setShowDeleteBtn(false);
    }
  }, [selectedImages]);
  console.log({ selectedImages });
  const handleDeleteImages = () => {
    setImages((prevImages) =>
      prevImages.filter((img) => !selectedImages.includes(img.id))
    );
    setSelectedImages([]);
  };

  const handleSelectImage = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
      setShowCheckboxes();
    } else {
      setSelectedImages((prevSelected) => [...prevSelected, id]);
    }
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("imageId", id);
  };

  const handleDrop = (e, targetId) => {
    const sourceId = e.dataTransfer.getData("imageId");
    if (sourceId !== targetId) {
      const updatedImages = images.slice();
      const sourceIndex = updatedImages.findIndex(
        (img) => img.id === Number(sourceId)
      );
      const targetIndex = updatedImages.findIndex((img) => img.id === targetId);
      [updatedImages[sourceIndex], updatedImages[targetIndex]] = [
        updatedImages[targetIndex],
        updatedImages[sourceIndex],
      ];
      setImages(updatedImages);
    }
  };

  return (
    <>
      <div className="selectItemdeleteItem">
        <div className="selectItem">
          {selectedImages.length > 0 && (
            <h4>{`${selectedImages.length}  Selected Item`}</h4>
          )}
        </div>
        <div>
          {showDeleteBtn && (
            <div className="controls">
              <button
                className="delectebuttonitem"
                onClick={handleDeleteImages}
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="gallery">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`image ${
              selectedImages.includes(image.id) ? "selected" : ""
            } ${index == 0 ? "firstImage" : ""} `}
            onDragStart={(e) => handleDragStart(e, image.id)}
            onDrop={(e) => handleDrop(e, image.id)}
            onDragOver={(e) => e.preventDefault()}
            onMouseEnter={() => handleHoverImage(image.id)}
            onMouseLeave={handleUnhoverImage}
          >
            {selectedImages.includes(image.id) && (
              <input
                type="checkbox"
                className="checkboxitem"
                checked={selectedImages.includes(image.id)}
                onChange={() => handleSelectImage(image.id)}
              />
            )}
            <div className="overlay">
              <input
                type="checkbox"
                className="checkboxitem"
                checked={selectedImages.includes(image.id)}
                onChange={() => handleSelectImage(image.id)}
              />
            </div>
            <img
              src={image.src}
              alt={`Image ${image.id}`}
              draggable="true"
              onClick={() => handleSelectImage(image.id)}
            />
          </div>
        ))}
        <div className="addImage">
          <img src="https://cdn-icons-png.flaticon.com/128/3342/3342137.png" />
          <div className="add">Add Image</div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
