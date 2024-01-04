import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Constants for original image dimensions
  const originalWidth = 1500;
  const originalHeight = 1500;

  const showPopup = (content) => {
    const popup = document.getElementById("popup");
    popup.innerHTML = "<p>" + content + "</p>";
    popup.style.display = "block";
  };

  const hidePopup = () => {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
  };

  const updateCoordinates = () => {
    const image = document.getElementById("responsive-image");
    
    const originalWidth = 1500;
    const originalHeight = 1500;
    const imageWidth = image.width;
    const imageHeight = image.height;
    console.log(`updated Coordinates`);
    fetch("data.csv")
      .then((response) => response.text())
      .then((csvData) => {
        const lines = csvData.trim().split("\n");
        const header = lines[0].split(",");

        const mapElement = document.querySelector('map[name="image-map"]');
        mapElement.innerHTML = "";

        for (let i = 1; i < lines.length; i++) {
          const columns = lines[i].split(",");

          const coordsX = parseFloat(columns[header.indexOf("coordsX")]);
          const coordsY = parseFloat(columns[header.indexOf("coordsY")]);
          const coordsZ = parseFloat(columns[header.indexOf("coordsZ")]);
          const content = columns[header.indexOf("title")];
          const percentageX = (coordsX / originalWidth) * 100;
          const percentageY = (coordsY / originalHeight) * 100;
          const percentageZ = (coordsZ / originalWidth) * 100;

          const pixelX = Math.round((percentageX / 100) * imageWidth);
          const pixelY = Math.round((percentageY / 100) * imageHeight);
          const pixelZ = Math.round((percentageZ / 100) * imageWidth);

          const area = document.createElement("area");
          area.setAttribute("coords", `${pixelX},${pixelY},${pixelZ}`);
          area.setAttribute(
            "href",
            `diamond/${columns[header.indexOf("Inventory")]}`
          );
          area.setAttribute("title", columns[header.indexOf("title")]);
          area.setAttribute("alt", columns[header.indexOf("alt")]);
          area.setAttribute("shape", "circle");
          area.addEventListener("mouseover", () => showPopup(content));
          area.addEventListener("mouseout", hidePopup);

          mapElement.appendChild(area);
        }
      })
      .catch((error) => console.error("Error reading CSV data:", error));
  };

  useEffect(() => {
    // Initial dimensions of the image
  
    const handleNavigation = () => {
      updateCoordinates();
    };

    window.addEventListener("resize", updateCoordinates);
    window.addEventListener("popstate", handleNavigation);
    window.addEventListener("pageshow", handleNavigation);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateCoordinates);
      window.removeEventListener("popstate", handleNavigation);
      window.removeEventListener("pageshow", handleNavigation);
    };
  }, [location.pathname, navigate]);

  // useEffect(() => {
  //   navigate((location) => {
  //     window.location.reload();
  //   });

  //   return () => {
  //     // Cleanup function if needed
  //   };
  // }, [navigate]);

  return (
    <div>
      <div className="top-container">
        <div className="image-container">
          <img
            src="necklacePlaceholder.jpg"
            alt="Your Image"
            useMap="#image-map"
            className="necklaceImage"
            id="responsive-image"
          />
          <map name="image-map" id="image-map">
            {/* Placeholder values are used here */}
            <area
              target="_blank"
              rel="noopener noreferrer"
              alt=""
              title=""
              href=""
              coords="0,0,0"
              shape="circle"
              onMouseOver=""
              // onMouseOut={() => hidePopup()}
            />
            <area
              target="_blank"
              rel="noopener noreferrer"
              alt=""
              title=""
              href=""
              coords="0,0,0"
              shape="circle"
              onMouseOver=""
              // onMouseOut={() => hidePopup()}
            />
            <area
              target="_blank"
              rel="noopener noreferrer"
              alt=""
              title=""
              href=""
              coords="0,0,0"
              shape="circle"
              onMouseOver=""
              // onMouseOut={() => hidePopup()}
            />
            <area
              target="_blank"
              rel="noopener noreferrer"
              alt=""
              title=""
              href=""
              coords="0,0,0"
              shape="circle"
              onMouseOver=""
              // onMouseOut={() => hidePopup()}
            />
          </map>

          <div className="centered">
            <div className="container">
              <p className="instructions">
                Click on any diamond to view the certificate.
              </p>
              <img
                src="FireCushion logo.jpg"
                width="200px"
                className="logo"
                alt="FireCushion"
              ></img>
              <ul>
                <li>
                  <h2>356.55 cts</h2>
                </li>
                <li>
                  <h2>D-H VV-SI</h2>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="popup" id="popup"></div>
    </div>
  );
};

export default HomePage;
