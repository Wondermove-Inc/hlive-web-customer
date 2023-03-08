import * as React from 'react';
import { HLiveMapLogo_Unselected, HLiveMapLogo_Selected } from 'src/assets/images/index';

const HereMap = ({ selectedCompany, mapCoordinatesList }) => {
  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null);

  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render the map sooner
   */
  React.useLayoutEffect(
    (props) => {
      //     // `mapRef.current` will be `undefined` when this hook first runs; edge case that
      if (!mapRef.current) return;
      const H = window.H;
      const platform = new H.service.Platform({
        apikey: 'xfywUXv4ASL07-UtiHWxg4ytKjGJJe6L3Vr3GL1kzmQ',
      });
      const defaultLayers = platform.createDefaultLayers();
      const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        center: { lat: 52.52, lng: 13.4 },
        zoom: 6,
        pixelRatio: window.devicePixelRatio || 1,
      });
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
      const ui = H.ui.UI.createDefault(hMap, defaultLayers);
      const unSelectIcon = new H.map.Icon(HLiveMapLogo_Unselected.src, {
        size: { w: 25, h: 25 },
      });
      const selectIcon = new H.map.Icon(HLiveMapLogo_Selected.src, {
        size: { w: 25, h: 25 },
      });
      let coordinates = mapCoordinatesList;
      if (Object.keys(selectedCompany).length !== 0) {
        coordinates =
          coordinates &&
          coordinates.map((data) => {
            //! to-do : id로 변경
            if (data.name == selectedCompany.name) {
              return new H.map.Marker({ lat: data.coordinates.lat, lng: data.coordinates.long }, { icon: selectIcon });
            } else {
              return new H.map.Marker({ lat: data.coordinates.lat, lng: data.coordinates.long }, { icon: unSelectIcon });
            }
          });
      } else {
        coordinates =
          coordinates &&
          coordinates.map((data) => {
            return new H.map.Marker({ lat: data.coordinates.lat, lng: data.coordinates.long }, { icon: unSelectIcon });
          });
      }
      coordinates.map((data) => {
        hMap.addObject(data);
      });

      // This will act as a cleanup to run once this hook runs again.
      // This includes when the component un-mounts
      return () => {
        hMap.dispose();
      };
    },
    [mapRef, selectedCompany, mapCoordinatesList],
  ); // This will run this hook every time this ref is updated

  return <div className="map" ref={mapRef} style={{ borderRadius: '10px', width: '360px', height: '140px' }} />;
};

export default HereMap;
