import React, { useState } from "react";
import { useAuth } from "./use-auth-client";
import { ColorRing } from 'react-loader-spinner';

export default function EntryForm({id, prof}) {
	const { whoamiActor} = useAuth();
	const [result, setResult] = useState("");
	const [loading, setLoading] = useState(false);
	const myname = prof.alias;
	// var now = new Date(now.getFullYear(), 0, 0);
	let mytime = 5;
	const [entry, setEntry] = useState({
		jid: id,
		title: "",
		content: "",
		time: mytime,
	});
	const [entryId, setEntryId] = useState("");
	const handleAnother = (event) => {
		event.preventDefault();
		document.getElementById("title").value = "";
		document.getElementById("content").value = "";
		setEntryId("")
		setEntry({
			jid: id,
			title: "",
			content: "",
			time: mytime,
		})
	}
	const another = <button name="another" onClick={handleAnother}>Create Another Entry</button>;

	const handleEntry = async () => {
		setLoading(true);
		let whoami = await whoamiActor.createEntry(entry);
		setResult(whoami);
		setLoading(false);
	  };

	  const handleCreate = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		setEntry({
			jid: data.get('jid'),
			title: data.get('title'),
			content: data.get('content'),
			time: 0,
		});
		createMyEntry({
			jid: data.get('jid'),
			title: data.get('title'),
			content: data.get('content'),
			time: 0,
		});
	}
	  const handleUpdate = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		setEntry({
			jid: data.get('jid'),
			title: data.get('title'),
			content: data.get('content'),
			time: 0,
		});
		updateMyEntry(entryId, {
			jid: data.get('jid'),
			title: data.get('title'),
			content: data.get('content'),
			time: 0,
		});
	}

	async function createMyEntry(entry) {
		setLoading(true);
		let entryId = await whoamiActor.createEntry(entry);
		setLoading(false);
		// setpro(profileId);
		// yespro();
		setEntryId(entryId);
		displayMyEntry(entryId);
	}

	async function displayMyEntry(entryId) {
		const entryDisplayed = await whoamiActor.readEntry(entryId);
		// let nowPoints = await actor.readPoints(parseInt(stringId));
		// setCurrentPoints(nowPoints);
		console.log(entryDisplayed);
		const {0: {jid},0: {title}, 0:{content}, 0:{time}} = entryDisplayed;
		document.getElementById("jid").value = jid;
		document.getElementById("title").value = title;
		document.getElementById("content").value = content;
		document.getElementById("time").value = time;
	  }  
 
	async function updateMyEntry(entryId, entry) {
		setLoading(true);
		let updating = await whoamiActor.updateEntry(entryId, entry);
		setLoading(false);
		// setpro(profileId);
		// yespro();
		displayMyEntry(entryId);
	}	  

    return (
        <div>
        	{/* <p>This is an entry Form for {myname}</p> */}
        	{/* <p>My profile id is {id}</p> */}
			{/* <input
				type="text"
				readOnly
				id="whoami"
				value={result}
				placeholder="entry id number"
				// style={whoamiStyles}
			/> */}
			<ColorRing
				visible={loading}
				height="80"
				width="80"
				ariaLabel="color-ring-loading"
				wrapperStyle={{}}
				wrapperClass="color-ring-wrapper"
				colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
			/>
        	<form noValidate onSubmit={!entryId ? handleCreate : handleUpdate}>
				<input type="hidden" id="jid"  name="jid" value={id}></input>
				<input type="text" id="title"  name="title" placeholder="title"></input>
				<label htmlFor="content">spill the beans... {myname}</label>
				<textarea id="content" name="content" rows="4" cols="20" placeholder="content"></textarea>
				<input type="hidden" id="time" name="time" value={mytime}></input>
				<button name="submit" value="submit">{!entryId ? "Create" : "Update"}
				</button>
        	</form>
			{entryId && another}
        </div>
    )
}