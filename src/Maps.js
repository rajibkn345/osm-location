import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import place from "./placeholder.png";

const icon = L.icon({
	iconUrl: place,
	iconSize: [38, 38],
});

function ResetCenterView(props) {
	const { selectPosition } = props;
	const map = useMap();

	useEffect(() => {
		if (selectPosition) {
			map.setView(
				L.latLng(selectPosition?.lat, selectPosition?.lon),
				map.getZoom(),
				{
					animate: true,
				}
			);
		}
	}, [selectPosition, map]);

	return null;
}
const position = [51.505, -0.09];

const Maps = (props) => {
	const newPosition = props.newPosition;
	const locationSelection = [newPosition?.lat, newPosition?.lon];
	return (
		<MapContainer
			style={{ width: "100%", height: "100%" }}
			center={position}
			zoom={8}
			scrollWheelZoom={false}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=KjKEdNvV8jiz3Srw3HSW'
			/>
			{newPosition && (
				<Marker position={locationSelection} icon={icon}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			)}
			<ResetCenterView selectPosition={newPosition} />
		</MapContainer>
	);
};

export default Maps;
