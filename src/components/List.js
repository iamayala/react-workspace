import moment from "moment";
import React, { useState } from "react";
import "../App.css";

function List(props) {
	const { subscriptions, navigate } = props;
	const [results, setResults] = useState([]);
	const [query, setQuery] = useState("");

	const handleSearch = (e) => {
		setQuery(e.target.value);
		const query = e.target.value;
		const res = subscriptions.filter((item) =>
			item.name.toLowerCase().includes(query)
		);
		setResults(res);
	};

	// console.log(subscriptions);

	const ListItem = ({ item }) => {
		return (
			<tr>
				<td>{`SUB${(item.code + 1).toLocaleString("en-US", {
					minimumIntegerDigits: 3,
					useGrouping: false,
				})}
						`}</td>
				<td>{item.names}</td>
				<td>{item.name}</td>
				<td>{item.copy}</td>
				<td>{moment(item.date).format("DD/MM/YYYY")}</td>
				<td>
					<button className="action-btn">Edit</button>
					<button className="action-btn">Delete</button>
				</td>
			</tr>
		);
	};

	return (
		<div className="container">
			<div className="list">
				<div className="listHeader">
					<h1>NEWSPAPER SUBSCRIPTIONS</h1>
					<input
						type="text"
						placeholder="Search By Newspaper..."
						value={query}
						onChange={(e) => handleSearch(e)}
					/>
				</div>
				<table>
					<tr className="th">
						<td>Code</td>
						<td>Subscriber</td>
						<td>Newspaper</td>
						<td>Copies</td>
						<td>Date</td>
						<td>Action</td>
					</tr>
					{query === ""
						? subscriptions.map((item, index) => {
								return <ListItem item={item} key={index} />;
						  })
						: results.map((item, index) => {
								return <ListItem item={item} key={index} />;
						  })}
				</table>
				<button className="btn" onClick={() => navigate("sub")}>
					Add New Subscriber
				</button>
			</div>
		</div>
	);
}

export default List;
