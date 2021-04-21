import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import './App.css';
import React, { useState, useEffect } from "react";
import { Button, Badge } from "reactstrap";

function App() {

  const [rowData, setRowData] = useState([]);

  const columns = [
    { headerName: "Title", field: "title", sortable: true, filter: true },
    { headerName: "Author", field: "author", sortable: true, filter: true },
    { headerName: "Edition Count", field: "editionCount" },
    { headerName: "Book ID", field: "id" }
  ]

  useEffect(()=> {
    fetch("http://openlibrary.org/subjects/drama.json?published_in=2000")
      .then(res => res.json())
      .then(data => data.works)
      .then(works => 
        works.map(book => {
          return{
            title: book.title,
            author: book.authors[0].name,
            editionCount: book.edition_count,
            id: book.cover_id
          };
        })
      )
      .then(books => setRowData(books));
    }, []
  );

  return (
    <div
      className="container">
        <h1>Book Catalogue</h1>
        <p>
          <Badge color="success">{rowData.length}</Badge>
           Books published in 2000 in the Drama category
        </p>
        <div 
          className="ag-theme-balham"
          style={{
            height: "300px",
            width: "800px"
          }}
        >
        <AgGridReact 
          columnDefs={columns} 
          rowData={rowData}
          pagination={true}
          paginationPageSize={7}
        />
        <Button
          color="info"
          size="sm"
          className="mt-3"
          href="https://openlibrary.org/developer/api"
          target="_blank"
        >
          Go to Open Library API
        </Button>
        {/*Button reactstrap component accepts color prop (see Bootstrap color-"info"). 
          Size specifies size (sm lg), 
          Margin spacing utility provided by bootstrap (mt-3 where mt = margin top)
          href= hypertext ref
          target="_blank" makes linked URL open in new window */}
    </div>
    </div>

  );
}

export default App;
