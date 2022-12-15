import React, { useState, useEffect } from "react";
import List from "./List";
import CreateTicket from "./CreateTicket";

function MainContainer() {
	const [currentPage, setCurrentPage] = useState("list");
	const [tickets, setTickets] = useState([]);
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);

	const submitHandler = (data) => {
		handleCreateTicket(data);
	};

	const cancelHandler = async (data) => {
		try {
			const post = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			};

			const response = await fetch(`http://127.0.0.1:3001/ticket/update`, post);
			const res = await response.json();
			console.log(res);
			if (res.status === 200) {
				fetchTickets();
			} else if (res.status === 400) {
				setError("Something went wrong!");
				setTimeout(() => {
					setError(null);
				}, 3000);
			}
		} catch (error) {
			console.log(error);
			alert("Error" + error);
		}
	};

	const handleCreateTicket = async (data) => {
		try {
			const post = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			};

			const response = await fetch(`http://127.0.0.1:3001/ticket/create`, post);
			const res = await response.json();
			if (res.status === 200) {
				console.log(res);
				fetchTickets();
				setCurrentPage("list");
				setMessage(
					`Ticket Number ${data.ticketNo} has been issued successfully to passenger ${data.passengerNames}`
				);
				setTimeout(() => {
					setMessage(null);
				}, 3000);
			} else if (res.status === 400) {
				setError(`Ticket ${data.ticketNo} already exists`);
				setCurrentPage("list");
				setTimeout(() => {
					setError(null);
				}, 3000);
			}
		} catch (error) {
			console.log(error);
			alert("Error" + error);
		}
	};

	const fetchTickets = async () => {
		try {
			const re = {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			};

			const response = await fetch(`http://127.0.0.1:3001/ticket/list`, re);
			const res = await response.json();
			if (res.status === 200) {
				setTickets(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchTickets();
	}, []);

	const navigate = (page) => {
		setCurrentPage(page);
	};

	if (currentPage === "sub") {
		return <CreateTicket submitHandler={submitHandler} navigate={navigate} />;
	}

	if (currentPage === "list") {
		return (
			<List
				tickets={tickets}
				navigate={navigate}
				cancelHandler={cancelHandler}
				message={message}
				error={error}
			/>
		);
	}
}

export default MainContainer;
