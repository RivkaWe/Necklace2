
import React, { useRef, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const MagnifiedImage = ({ imageSrc }) => {
  const transformWrapperRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      // Add click event listener to the image
      imageRef.current.addEventListener("click", handleImageClick);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("click", handleImageClick);
      }
    };
  }, []);

  const handleImageClick = (event) => {
    // Get the clicked coordinates relative to the image
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    // Do something with the clicked coordinates (e.g., navigate to a link)
    console.log("Clicked coordinates:", x, y);
  };

  return (
    <TransformWrapper
      options={{
        zoomAnimation: {
          springConstant: 0.4,
          animationTime: 300,
        },
      }}
      pan={{ disabled: false }}
      doubleClick={{ disabled: true }}
      pinch={{ disabled: true }}
      wheel={{ step: 30 }}
      ref={transformWrapperRef}
    >
      {(utils) => (
        <React.Fragment>
          <TransformComponent>
            <img
              src={imageSrc}
              alt="Your Image"
              style={{ width: "100%", height: "auto" }}
              ref={imageRef}
              onLoad={() => {
                utils.resetTransform();
              }}
            />
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
};

export default MagnifiedImage;
