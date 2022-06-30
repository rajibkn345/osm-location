import React, { useState } from "react";
import { OutlinedInput, Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import placeIcon from "./placeholder.png";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const SearchBox = (props) => {
	const { setSelectPosition } = props;
	const [searchText, setSearchText] = useState("");
	const [listPlace, setListPlace] = useState([]);
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<div style={{ display: "flex" }}>
				<div style={{ flex: 1 }}>
					<OutlinedInput
						style={{ width: "100%" }}
						value={searchText}
						onChange={(e) => {
							setSearchText(e.target.value);
						}}
					/>
				</div>
				<div
					style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
				>
					<Button
						variant='contained'
						size='large'
						color='success'
						onClick={() => {
							const params = {
								q: searchText,
								format: "json",
								addressdetails: 1,
								polygon_geojson: 0,
							};
							const queryString = new URLSearchParams(params).toString();
							const requestOptions = {
								method: "GET",
								redirect: "follow",
							};
							fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
								.then((response) => response.text())
								.then((result) => {
									setListPlace(JSON.parse(result));
								})
								.catch((err) => console.log("err: ", err));
						}}
					>
						Search
					</Button>
				</div>
			</div>
			<div>
				<List>
					{listPlace.map((item) => {
						return (
							<div key={item?.place_id}>
								<ListItem
									button
									onClick={() => {
										setSelectPosition(item);
									}}
								>
									<ListItemButton>
										<ListItemIcon>
											<img
												alt='placeIcon'
												src={placeIcon}
												width={"38px"}
												height={"38px"}
											/>
										</ListItemIcon>
										<ListItemText primary={item?.display_name} />
									</ListItemButton>
								</ListItem>
							</div>
						);
					})}
				</List>
			</div>
		</div>
	);
};

export default SearchBox;
