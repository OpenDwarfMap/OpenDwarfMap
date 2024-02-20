import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './Component/Map';
import HistoricalFiguresList from './Component/HistoricalFiguresList';
import HistoricalFigureDetail from "./Component/HistoricalFigureDetail";
import SiteDetail from "./Component/SiteDetail";
import EventDetail from "./Component/EventDetail";
import EventCollectionDetail from "./Component/EventCollectionDetail";
import EntityDetail from "./Component/EntityDetail";
import './styles.scss'
import RootScreen from "./RootScreen";

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<RootScreen/>}>
              <Route path="/" element={<Map />} />
              <Route path="/historical_figures/page/:pagination" element={<HistoricalFiguresList />} />
              <Route path="/historical_figure/:hfId" element={<HistoricalFigureDetail />} />
              <Route path="/site/:id" element={<SiteDetail />} />
              <Route path="/event_collection/:id" element={<EventCollectionDetail />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/entity/:id" element={<EntityDetail />} />
          </Route>
        </Routes>
      </Router>
    );
}
export default App;