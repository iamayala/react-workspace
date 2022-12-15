import moment from "moment";
import React, { useState } from "react";
import "../App.css";

function CreateTicket(props) {
	const [names, setNames] = useState("");
	const [date, setDate] = useState(null);
	const [price, setPrice] = useState(500);
	const [category, setCategory] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [tickettNumber, setTicketNumber] = useState("");
	const { submitHandler } = props;

	const handleSubmit = (event) => {
		event.preventDefault();

		if (names === "") {
			setErrorMessage("Please provide the name");
		} else {
			const data = {
				ticketNo: "T" + tickettNumber,
				passengerNames: names,
				departureDate: moment(date).format("YYYY-MM-DD"),
				ticketPrice: price,
				ticketClass: category === "BUSINESS" || category === null ? 1 : 0,
				ticketStatus: 1,
			};

			submitHandler(data);
		}
	};

	const handleOnChangeTicket = (e) => {
		if (e.match(/^[0-9]+$/) != null) {
			setTicketNumber(e);
		}
	};

	return (
		<div className="container">
			<div className="main">
				<form onSubmit={handleSubmit}>
					<h1>BOOKING FORM</h1>

					<div className="formDiv">
						<label>Ticket Number</label>
						<input
							required
							type="text"
							value={tickettNumber}
							maxLength={3}
							onChange={(e) => handleOnChangeTicket(e.target.value)}
						/>
					</div>

					<div className="formDiv">
						<label>Passenger Name</label>
						<input
							required
							type="text"
							onChange={(e) => setNames(e.target.value)}
						/>
					</div>

					<div className="formDiv">
						<label>Departure Date</label>
						<input
							required
							type="date"
							min="2022-12-15"
							onChange={(e) => setDate(e.target.value)}
						/>
					</div>

					<div className="formDiv">
						<label>Price</label>
						<input
							type="number"
							min="500"
							max="5000"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</div>

					<div className="formDiv">
						<label>Category</label>
						<select
							onChange={(e) => {
								setCategory(e.currentTarget.value);
							}}
						>
							<option value="BUSINESS">BUSINESS</option>
							<option value="ECONOMIC">ECONOMIC</option>
						</select>
					</div>

					<button type="submit" className="btn">
						Submit
					</button>

					<p className="error">{errorMessage}</p>
				</form>
			</div>
		</div>
	);
}

export default CreateTicket;
