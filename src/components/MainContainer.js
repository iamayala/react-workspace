import React, { useState, useEffect } from "react";
import Copy from "./Copy";
import List from "./List";
import Subscription from "./Subscription";

function MainContainer() {
	const [currentPage, setCurrentPage] = useState("sub");
	const [subData, setSubData] = useState("");
	const [dbMessage, setDbMessage] = useState("");
	const [subscriptions, setSubscriptions] = useState([]);

	const submitHandler = (data) => {
		setCurrentPage("copy");
		setSubData(data);
	};

	const handleCreateSub = async (data) => {
		console.log("posted data => " + JSON.stringify(data));
		try {
			const re = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			};

			const response = await fetch(
				`http://127.0.0.1:3001/create/subscription`,
				re
			);
			const res = await response.json();
			if (res.status === 200) {
				fetchSubscriptions();
				setCurrentPage("list");
			} else if (res.status === 400) {
				setDbMessage("Something went wrong!!");
			}
		} catch (error) {
			console.log(error);
			alert("Error" + error);
		}
	};

	const fetchSubscriptions = async () => {
		try {
			const re = {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			};

			const response = await fetch(
				`http://127.0.0.1:3001/fetch/subscriptions`,
				re
			);
			const res = await response.json();
			if (res.status === 200) {
				setSubscriptions(res.data);
				// setCurrentPage("list");
			}
		} catch (error) {
			console.log(error);
			alert("Error" + error);
		}
	};

	useEffect(() => {
		fetchSubscriptions();
	}, []);

	const navigate = (page) => {
		setCurrentPage(page);
	};

	if (currentPage === "sub") {
		return <Subscription submitHandler={submitHandler} navigate={navigate} />;
	}
	if (currentPage === "copy") {
		return (
			<Copy
				subData={subData}
				handleCreateSub={handleCreateSub}
				dbMessage={dbMessage}
				navigate={navigate}
				subscriptions={subscriptions}
			/>
		);
	}
	if (currentPage === "list") {
		return <List subscriptions={subscriptions} navigate={navigate} />;
	}
}

export default MainContainer;
