import React from 'react';
import { createRoot } from 'react-dom/client';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import Map from './components/map';
 
const root = createRoot(document.getElementById('root'));
root.render(<Map />);