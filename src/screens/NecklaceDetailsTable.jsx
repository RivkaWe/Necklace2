// CSVTable.js
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import {Table, Row, Col, Container} from 'react-bootstrap'
import Papa from 'papaparse';

const NecklaceDetailsTable = () => {
  const [tableData, setTableData] = useState([]);
  const [totalRow, setTotalRow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/dataDetails.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const text = new TextDecoder('utf-8').decode(result.value);

      Papa.parse(text, {
        complete: (result) => {
          const data = result.data;
          const headerRow = data[0];
          const totalRow = calculateTotalRow(data);

          setTotalRow(totalRow);
          setTableData([headerRow, ...data.slice(1)]);
        },
        header: true,
      });
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount

  const calculateTotalRow = (data) => {
    const totalRow = {};

    data.forEach((row) => {
      Object.keys(row).forEach((key) => {
        totalRow[key] = (totalRow[key] || 0) + parseFloat(row[key]) || 0;
      });
    });

    return totalRow;
  };

  return (

       
       <Container>
        <Link to = '/' style={{color:'white', textDecoration:'none'}}>
        <h2>Necklace Details</h2>
        </Link>
       
        <Row className='justify-content-center'>
            
      <Table className='table-striped w-auto'>
        <thead className='bg-light sticky-top top-0'>
          <tr>
            {tableData.length > 0 &&
              Object.keys(tableData[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
        {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.entries(row).map(([key, value], columnIndex) => (
                <td key={columnIndex}>
                  {columnIndex === 0 ? (
                    <Link style = {{backgroundColor:'transparent'}}to={`/diamond/${value}`}>{value}</Link>
                  ) : (
                    value
                  )}
                </td>
              ))}
            </tr>
          ))}
          {/* {totalRow && (
            <tr>
              {Object.values(totalRow).map((total, index) => (
                <td key={index}>{total}</td>
              ))}
            </tr>
          )} */}
        </tbody>
      </Table>
   
      </Row>
      </Container>

  );
};

export default NecklaceDetailsTable;
