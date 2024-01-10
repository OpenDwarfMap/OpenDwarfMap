import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './Component/Map';
import HistoricalFiguresList from './Component/HistoricalFiguresList';
import HistoricalFigureDetail from "./Component/HistoricalFigureDetail";
import './styles.scss'

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/historical_figures/page/:pagination" element={<HistoricalFiguresList />} />
          <Route path="/historical_figure/:hfId" element={<HistoricalFigureDetail />} />
        </Routes>
      </Router>
    );
}
export default App;