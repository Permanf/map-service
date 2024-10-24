import fetch from 'node-fetch';
import express from 'express';

const app = express();
app.get('/api/landUsePlanning', async (req, res) => {
    try {
      const url = 'https://gisservices.chathamcountync.gov/opendataagol/rest/services/LandUsePlanning/Chatham_PittsboroZoning/MapServer/layers?f=json';
      
      // landUsePlanning
      const response = await fetch(url);
      const data = await response.json();
      console.log(data,"---1")
  
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Error fetching data' });
    }
});

app.get('/api/map-service', async (req, res) => {
  try {
    const urlLine = 'https://gis11.services.ncdot.gov/arcgis/rest/services/NCDOT_STIP/MapServer/1/query?f=json&where=(1=1) AND (1=1)&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=OBJECTID ASC&outSR=102100';
    const urlDot = 'https://gis11.services.ncdot.gov/arcgis/rest/services/NCDOT_STIP/MapServer/0/query?f=json&where=(1=1) AND (1=1)&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=OBJECTID ASC&outSR=102100'
    
    // Line
    const responseLine = await fetch(urlLine);
    const dataLine = await responseLine.json();
    // Dot
    const responseDot = await fetch(urlDot);
    const dataDot = await responseDot.json();

    const attributesArray = [];
    if (dataLine.features && Array.isArray(dataLine.features)) {
      dataLine.features.forEach((feature, i) => {
        attributesArray.push(feature.attributes);
      });
    }


    if (dataDot.features && Array.isArray(dataDot.features)) {
      dataDot.features.forEach((feature, i) => {
        attributesArray.push(feature.attributes);
      });
    }

    console.log(attributesArray,"---2")

    res.json(attributesArray);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
