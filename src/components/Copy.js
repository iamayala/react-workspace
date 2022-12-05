import moment from "moment";
import React, { useState } from "react";
import "../App.css";

function Copy(props) {
	const { subData, handleCreateSub, dbMessage, subscriptions } = props;
	const [copies, setCopies] = useState(1);
	const [total, setTotal] = useState(subData.cost);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = {
			...subData,
			cost: total,
			copies,
		};
		// date, names, copies, np_id
		handleCreateSub(data);
	};

	const InfoItem = ({ title, info }) => {
		return (
			<div className="infoDiv">
				<label>{title}</label>
				<p>{info}</p>
			</div>
		);
	};
	return (
		<div className="container">
			<div className="main">
				<form onSubmit={handleSubmit}>
					<h1>SUBSCRIPTION INFO</h1>
					<InfoItem
						title="Date"
						info={moment(subData.date).format("YYYY-MM-DD")}
					/>
					<InfoItem
						title="Code"
						info={`SUB${(
							subscriptions[subscriptions.length - 1].code + 2
						).toLocaleString("en-US", {
							minimumIntegerDigits: 3,
							useGrouping: false,
						})}
						`}
					/>
					<InfoItem title="Subscriber" info={subData.names} />
					<InfoItem title="Newspaper" info={subData.newspaper} />
					<InfoItem title="Total Cost" info={`RWF ${total}`} />

					<div className="infoDiv">
						<label>Copies</label>
						<input
							type="number"
							value={copies}
							onChange={(e) => {
								if (e.target.value >= 1) {
									setTotal(e.target.value * subData.cost);
									setCopies(e.target.value);
								}
							}}
						/>
					</div>

					<button type="submit" className="btn">
						Confirm
					</button>

					<p className="error">{dbMessage}</p>
				</form>
			</div>
		</div>
	);
}

export default Copy;
