import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import api from '../../utils/api.js';
import Place from '../place';

export default function Map() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    api.getPlaces()
      .then((places) => {
        places.forEach(function (item, i) {
          item.properties.id = i;
        });
        setPlaces(places);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [44.77664089179629, 41.71304326213374],
      zoom: 13,
    });

    function flyToItem(currentPlace) {
      map.flyTo({
        center: currentPlace.geometry.coordinates,
        zoom: 15,
      });
    };

    function createLocationList(places) {
      const titles = document.getElementsByClassName("item_title");

      Array.prototype.forEach.call(titles, (title) => {
        title.addEventListener("click", () => {
          for (const place of places) {
            if (title.id === `link-${place.properties.id}`) {
              flyToItem(place);
              createPopUp(place);
            }
          }

          const activeItem = document.getElementsByClassName("active");
          if (activeItem[0]) {
            activeItem[0].classList.remove("active");
          }
          title.parentNode.classList.add("active");
        });
      })
    };

    function createPopUp(currentPlace) {
      const popUps = document.getElementsByClassName("mapboxgl-popup");
      // Check if there is already a popup on the map and if so, remove it
      if (popUps[0]) popUps[0].remove();

      new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat(currentPlace.geometry.coordinates)
        .setHTML(
          `<h3>${currentPlace.properties.name}</h3>
          <h4>${currentPlace.properties.address}</h4>`
        )
        .addTo(map);
    };

    function addMarkers(places) {
      for (const marker of places) {
        const el = document.createElement("a");
        el.id = `marker-${marker.properties.id}`;
        el.href = `#${marker.properties.id}`;
        el.className = "marker";

        new mapboxgl.Marker(el, { offset: [0, -23] })
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);

        el.addEventListener("click", (e) => {
          flyToItem(marker);
          createPopUp(marker);
          const activeItem = document.getElementsByClassName("active");
          e.stopPropagation();
          if (activeItem[0]) {
            activeItem[0].classList.remove("active");
          }
          const listing = document.getElementById(`${marker.properties.id}`);
          listing.classList.add("active");
        });
      }
    };

    map.on('load', () => {
      map.addSource('places', {
        type: 'geojson',
        data: {
          'success': true,
          'type': 'FeatureCollection',
          'features': places
        }
      });
      createLocationList(places);
      addMarkers(places);
    });
  });

  return (
    <div>
      <div className="sidebar">
        <div className="heading">
          <h1>Tbilisi specialty coffee</h1>
        </div>
        <ul id="listings" className="listings">
          {places.map((place) => (
            <Place
              key={place._id}
              place={place.properties}
            />
          ))}
        </ul>
      </div>
      <div id="map" className="map"></div>
    </div>
  )
}
