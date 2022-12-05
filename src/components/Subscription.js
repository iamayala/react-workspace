import moment from "moment";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../agents/api";
import "../App.css";

function Subscription(props) {
	const [newspapers, setNewspapers] = useState([]);
	const [activeNewspaper, setActiveNewspaper] = useState();
	const [names, setNames] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const { submitHandler } = props;

	const fetchNewspapers = async () => {
		try {
			const re = {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			};

			const response = await fetch(
				`http://127.0.0.1:3001/fetch/newspapers`,
				re
			);
			const res = await response.json();
			if (res.status === 200) {
				setNewspapers(res.data);
				setActiveNewspaper(res.data[0]);
			}
		} catch (error) {
			console.log(error);
			alert("Error" + error);
		}
	};

	useEffect(() => {
		fetchNewspapers();
	}, []);

	const handleSelect = (e) => {
		const id = e.target.value;
		const selected = newspapers.filter((item) => item.id === parseInt(id));
		setActiveNewspaper(selected[0]);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (names === "") {
			setErrorMessage("Please provide the name");
		} else {
			const data = {
				names,
				newspaper: activeNewspaper.name,
				cost: activeNewspaper.cost,
				date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
				np_id: activeNewspaper.id,
			};

			submitHandler(data);

			console.log(data);
		}
	};

	return (
		<div className="container">
			<div className="main">
				<form onSubmit={handleSubmit}>
					<h1>SUBSCRIPTION FORM</h1>

					<div className="formDiv">
						<label>Subscriber Names</label>
						<input type="text" onChange={(e) => setNames(e.target.value)} />
					</div>

					<div className="formDiv">
						<label>Newspaper</label>
						<select defaultValue="" onChange={(e) => handleSelect(e)}>
							{newspapers.map((item, index) => {
								return (
									<option value={item.id} key={index}>
										{item.name}
									</option>
								);
							})}
						</select>
					</div>

					<div className="formDiv">
						<label>Newspaper Cost</label>
						<input
							type="text"
							value={activeNewspaper ? activeNewspaper?.cost : 0}
							disabled
						/>
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

export default Subscription;
