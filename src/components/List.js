import moment from "moment";
import React, { useState } from "react";
import "../App.css";

function List(props) {
	const { tickets, navigate, cancelHandler, message, error } = props;
	const [results, setResults] = useState([]);
	const [query, setQuery] = useState("");
	const [active, setActive] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const handleSearch = (e) => {
		setQuery(e.target.value);
		const query = e.target.value;
		const res = tickets.filter((item) =>
			item.ticketNo.toLowerCase().includes(query)
		);
		setResults(res);
	};

	const ListItem = ({ item }) => {
		return (
			<tr>
				<td>{item?.ticketNo}</td>
				<td>{item?.passengerNames}</td>
				<td>{moment(item?.departureDate).format("DD/MM/YYYY")}</td>
				<td>
					{Math.round(moment(item?.departureDate) - moment().startOf("day")) /
						86400000}
				</td>
				<td>{item?.ticketPrice} RWF</td>
				<td>{item?.ticketClass === 1 ? "BUSINESS" : "ECONOMIC"}</td>
				<td>{item?.ticketStatus === 1 ? "ACTIVE" : "CANCELLED"}</td>
				<td>
					{item?.ticketStatus === 1 && (
						<button
							className="action-btn"
							onClick={() => {
								setActive(item);
								setShowModal(true);
							}}
						>
							Cancel
						</button>
					)}
				</td>
			</tr>
		);
	};

	const Modal = ({ onExit, onCancel }) => {
		return (
			<div className="modal">
				<div className="modal-box">
					<h1>Before you cancel!</h1>
					<p>
						Are you sure you want to cancel this ticket? Note that this action
						can not be undone.
					</p>
					<div>
						<button className="modal-btn bg-success" onClick={onExit}>
							EXIT
						</button>
						<button className="modal-btn bg-danger" onClick={onCancel}>
							CANCEL
						</button>
					</div>
				</div>
			</div>
		);
	};

	const handleCancel = () => {
		const data = {
			ticketNo: active.ticketNo,
			ticketStatus: 0,
		};
		cancelHandler(data);
		setShowModal(false);
		setActive(null);
	};

	return (
		<div className="container">
			{showModal && (
				<Modal
					onExit={() => {
						setShowModal(false);
						setActive(null);
					}}
					onCancel={() => handleCancel(active)}
				/>
			)}
			<div className="list">
				{message && <div className="toast-message">{message}</div>}
				{error && <div className="toast-error">{error}</div>}
				<div className="listHeader">
					<h1>TICKET LIST</h1>
					<div className="listHeaderNew">
						<button className="new-btn" onClick={() => navigate("sub")}>
							+
						</button>
						<input
							type="text"
							placeholder="Ticket Number..."
							value={query}
							onChange={(e) => handleSearch(e)}
						/>
					</div>
				</div>
				<table>
					<tr className="th">
						<td>Ticket #</td>
						<td>Passenger</td>
						<td>Departure Date</td>
						<td>Days Left</td>
						<td>Price</td>
						<td>Category</td>
						<td>Status</td>
						<td>Action</td>
					</tr>
					{query === ""
						? tickets.map((item, index) => {
								return <ListItem item={item} key={index} />;
						  })
						: results.map((item, index) => {
								return <ListItem item={item} key={index} />;
						  })}
				</table>
			</div>
		</div>
	);
}

export default List;
