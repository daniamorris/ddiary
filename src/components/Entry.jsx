import React, { useEffect, useState } from "react";
import { backend } from "../declarations/backend";
import { useAuth } from "./use-auth-client";
import FancyCard from "./FancyCard";

export default function Entry(params) {
	// const { whoamiActor } = useAuth();
	let actor = backend; 
	const entryID = params.id;
	// console.log(entryID);
	const [result, setResult] = useState("");
	const [entry, setEntries] = useState([{
		jid: "0",
		title: "Pink",
		content: "I like Pink",
		//engaged: Feedback;
		time: 5
		}]);	 
	const userlink = "/ProfilePage/" + [entry[0].jid];

	const getEntry = async () => {
		const myEntry = await actor.readEntry(entryID);
		setResult(myEntry);
		setEntries(myEntry);
		console.log(myEntry);
	  };

	  useEffect(() => {
		getEntry();
	  }, []);
	  
    return (
        <div>
        	<h1>{entry[0].title}</h1>
			<p>{entry[0].content}</p>
			{/* <ul>
				<li>prompt</li>
				<li>{entry[0].title}</li>
				<li>{entry[0].content}</li>
				<li>author (linked to public profile) {entry[0].jid}</li>
				<li>tipping options</li>
				<li>reactions</li>
				<li>liked loved moved sad reactions</li>
				<li>reaction totals</li>
			</ul> */}
			{/* <FancyCard /> */}
			{/* <button
				type="button"
				id="whoamiButton"
				className="primary"
				onClick={getEntry}
			>
				Get Entry
			</button>
			<input
			type="text"
			readOnly
			id="whoami"
			value={result}
			placeholder="entries"
			/> */}
        </div>
    )
}