import { useRef, useLayoutEffect, forwardRef } from 'react';
import image_pin_location from '@images/image_pin_location.png';
import image_pin_selected from '@images/image_pin_selected.png';
import image_pin_unselected from '@images/image_pin_unselected.png';
import './styles.css';
import { height } from '@theme';

const styles = {
  map: {
    // width: '100%',
    height: height.map,
  },
};

export const DealershipMap = forwardRef(({ dealershipList, handleModalOpen, modalDealershipInfo }, ref) => {
  const mapRef = useRef(null);

  useLayoutEffect(() => {
    if (!mapRef.current) return;

    const H = window.H;
    const platform = new H.service.Platform({
      apikey: 'bdv9gxjAMcCJ9ucwLlbW4BNWcxqsuPldg8VEysdiNh0',
    });

    const defaultLayers = platform.createDefaultLayers();

    // setup a styled layer
    const engineType = H.Map.EngineType['HARP'];
    const style = new H.map.render.harp.Style(require('./hereMapTheme.json'));
    const vectorLayer = platform.getOMVService().createLayer(style, { engineType });

    // initialize a new map
    const hMap = new H.Map(mapRef.current, vectorLayer, {
      engineType,
      center: { lat: modalDealershipInfo?.position.coordinates[1] || 52.2, lng: modalDealershipInfo?.position.coordinates[0] || 21.0 },

      zoom: 9,
      pixelRatio: window.devicePixelRatio || 1,
      padding: { top: 300, right: 0, bottom: 0, left: 35 },
    });

    window.addEventListener('resize', () => hMap.getViewPort().resize());

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    const pin_location = new H.map.Icon(image_pin_location, { size: { w: 42, h: 45 } });
    const pin_selected = new H.map.Icon(image_pin_selected, { size: { w: 35, h: 42 } });
    const pin_unselected = new H.map.Icon(image_pin_unselected, { size: { w: 35, h: 42 } });
    // const defaultMarker = new H.map.Marker({ lat: 41.9, lng: 12.5 }, { icon: pin_location });
    // hMap.addObject(defaultMarker);

    dealershipList?.map((item, index) => {
      const dealerShipMarker = new H.map.Marker({ lat: item?.position.coordinates[1], lng: item?.position.coordinates[0] }, { icon: pin_unselected });
      dealerShipMarker.addEventListener('tap', () => {
        handleModalOpen(item);
        // mapRef.current
        hMap.setCenter({ lat: item?.lttuVal, lng: item?.lotuVal });
      });
      hMap.addObject(dealerShipMarker);

      // Clustering
      const dataPoints = new H.clustering.DataPoint(item?.position.coordinates[1], item?.position.coordinates[0]);
      const clusteredDataProvider = new H.clustering.Provider(dataPoints, {
        clusteringOptions: {
          eps: 32, // Maximum radius of the neighbourhood
          minWeight: 2, // minimum weight of points required to form a cluster
        },
      });
      const clusteringLayer = new H.map.layer.ObjectLayer(clusteredDataProvider);
      hMap.addLayer(clusteringLayer);
    });
    ref.current = hMap;
    // This will act as a cleanup to run once this hook runs again.
    return () => {
      hMap.dispose();
    };
  }, [mapRef, dealershipList]);

  return <div className="map" ref={mapRef} style={styles.map} />;
});
