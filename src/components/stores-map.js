import React, { Component } from 'react';
import { connect } from 'react-redux';

import MarkerClusterer from '../vendor/marker-clusterer.js';

const mapStateToProps = (state) => ({
  stores: state.stores,
});

const mapDispatchToProps = (dispatch) => ({
});


class StoresMap extends Component {
    constructor() {
        super();
        this.myRef = React.createRef();
        this.map = null;
        this.markers = [];
      }
      
      componentDidMount() {
        const styleNode = document.createElement('style');
        styleNode.textContent = `
            :host {
              position: relative;
            }
            .map {
              position: relative;
              width: 100%;
              height: 100%;
            }
            .gm-bundled-control {
                bottom: 69px!important;
                right: 28px!important;
            }
            .gm-bundled-control > div > div {
                width: 28px!important;
                height: 55px!important;
            }
            .gm-bundled-control > div > div > div {
                width: 24px!important;
                margin: 0 3px!important;
            }
            .gm-bundled-control button {
                width: 28px!important;
                height: 27px!important;
            }
            .gm-bundled-control button img {
                height: 12px!important;
                width: 11px!important;
                margin: 8px!important;
            }
        `;
        this.myRef.current.appendChild(styleNode);
  
        
        this.mapElement = document.createElement('div');
        this.mapElement.classList = 'map';
        
        this.myRef.current.appendChild(this.mapElement);
        window.initGoogleMap = this.init.bind(this);
    
        const googleMapsJsNode = document.createElement('script');
        googleMapsJsNode.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCRTnC96aFUTP62mNuxDBUoHcLvR35MLOI&callback=initGoogleMap';
        this.myRef.current.appendChild(googleMapsJsNode);
    }

    bindEvents() {
      // this.map.addListener('dragend', this.dispatchUpdatedCoords.bind(this));
      // this.map.addListener('zoom-update', this.dispatchUpdatedCoords.bind(this));
    }

    init() {
        var myLatLng = {lat: 48.074766, lng: 7.574985};
        var silverStyle = [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.business",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dadada"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#c9c9c9"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            }
        ];
        
        this.map = new window.google.maps.Map(this.mapElement, {
            center: myLatLng,
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            styles: silverStyle,
            zoom: 4,
            zoomControl: true,
            zoomControlOptions: {
                style: window.google.maps.ZoomControlStyle.SMALL
            }
        });

        

        this.bindEvents();
    }

    setMarkers() {
        if(!this.map) {
            return;
        }

        this.markers = this.stores.filter((store) => store.visible).map( store => {
            return new window.google.maps.Marker({
                map: this.map,
                position: {lat: Number(store.lat), lng: Number(store.lng)},
                title: store.post_title
            });
        });

        this.markerCluster = new MarkerClusterer(this.map, this.markers, {
            gridSize: 40,
            styles: [{
                url: 'https://media.yoox.biz/ytos/resources/BALMAIN/Images/icons/pinmap-cluster.svg',
                width: 35,
                height: 35
            }]
        });
    }

    resetMarkers() {
      if(this.markerCluster) {
        this.markerCluster.clearMarkers();
      }

      this.markers.map((marker) => {
          marker.setMap(null);
      });
        
      this.markers = [];
    }

    // dispatchUpdatedCoords() {
    //   dispatch({
    //     type: 'UPDATE_COORDS',
    //     coords: {
    //       center: {
    //         lat: this.map.center.lat(),
    //         lng: this.map.center.lng()
    //       },
    //       ne: {
    //         lat: this.map.getBounds().getNorthEast().lat(),
    //         lng: this.map.getBounds().getNorthEast().lng()
    //       },
    //       sw: {
    //         lat: this.map.getBounds().getSouthWest().lat(),
    //         lng: this.map.getBounds().getSouthWest().lng()
    //       }
    //     }
    //   });   
    // }

    render() {
      this.stores = this.props.stores;
      
      this.resetMarkers();
      this.setMarkers();
      
      return (<div className="mapWrapper" ref={this.myRef}></div>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoresMap);