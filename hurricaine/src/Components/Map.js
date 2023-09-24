import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoibW9oZG0yNjExIiwiYSI6ImNsbXdvNmM2MDEzYWEya3Z6MGFzaGp5NXUifQ.CcedzXAgZolCGGcztTdE5w';

export default class Map extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        lng: -93.85,
        lat: 38.52,
        zoom: 10
        };
        this.mapContainer = React.createRef();
    }
    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        const map = new mapboxgl.Map({
        container: this.mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
    });

    map.on('move', () => {
        this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
        });
        });
    }
    render() {
        const { lng, lat, zoom } = this.state;
        return (
        <div className='w-1/2'>
            <div>
                <div ref={this.mapContainer} className="map-container">
                    <div className="sidebar">
                        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                    </div>
                </div>
            </div>
        </div>
        );
        }
    }
