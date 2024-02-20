import React from "react";
import Spinner from 'react-bootstrap/Spinner';


function LoadingPage () {
    return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
}

export default LoadingPage;