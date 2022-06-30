import React, { useState } from "react";
import Maps from "./Maps";
import SearchBox from "./SearchBox";
function App() {
	const [selectPositon, setSelectPosition] = useState(null);
	return (
		<div
			style={{
				display: "flex",
				width: "100vw",
				height: "100vh",
				flexDirection: "row",
			}}
		>
			<div style={{ width: "50vw", height: "100%" }}>
				<Maps newPosition={selectPositon} />
			</div>
			<div style={{ width: "50vw", height: "100vh" }}>
				<SearchBox
					selectPositon={selectPositon}
					setSelectPosition={setSelectPosition}
				/>
			</div>
		</div>
	);
}

export default App;
