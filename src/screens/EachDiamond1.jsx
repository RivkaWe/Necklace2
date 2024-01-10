// import { Document, Page, pdfjs } from 'react-pdf';

// import { Link, useParams, useNavigate } from "react-router-dom";
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// function EachDiamond(){

//         return(
//         <div>
//             <h1>Diamond Details</h1>

//         <div style={{marginLeft:"27%"}}>
//       <Document file={ new URL('http://www.hasenfeld-stein.com/images/certificates/Q0526932.pdf')}>

//       </Document>
//             <p style={{marginLeft:"27%"}}>
//               Page 1 of 2
//             </p>
//           </div>
//         </div>
//     )
// }

// export default EachDiamond;

import { useCallback, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { pdfjs, Document, Page } from "react-pdf";
import { useNavigate } from "react-router-dom";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";
import { useParams, Link } from "react-router-dom";
// import './Sample.css';

import { PDFDocumentProxy } from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

//  PDFFile = string | File | null;

export default function EachDiamond() {
  // const [file, setFile] = useState('./sample.pdf');
  const { id } = useParams();
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();

  const onResize = useCallback((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  // function onFileChange(event: React.ChangeEvent): void {
  //   const { files } = event.target;

  //   if (files && files[0]) {
  //     setFile(files[0] || null);
  //   }
  // }


 const navigate=useNavigate()
  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }) {
    setNumPages(nextNumPages);
  }

  function handleClick (){
  navigate(-1)
  }

  return (
    <div className="Example">
      
        <Button
        onClick={handleClick}
          type="button"
          variant="primary"
          style={{ textDecoration: "none" }}
        >
          Go Back to Necklace
        </Button>

      <h1>Diamond Details</h1>

      <div className="cert-conta">
        {/* <div className="Example__container__load">
          <label htmlFor="file">Load from file:</label>{' '}
          <input onChange={onFileChange} type="file" />
        </div> */}
        <div className="cert-container" ref={setContainerRef}>
          <Document
            file={`https://www.hasenfeld-stein.com/images/certificates/${id}.pdf`}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            renderMode="canvas"
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
