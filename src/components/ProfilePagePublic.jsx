import React, { useEffect, useState } from "react";
import {createActor, backend} from "../declarations/backend";

export default function ProfilePagePublic(params) {
	let actor = backend;

	// myujounalId = params.jid;
	const myujounalId = "0";
	const [profile, setProfile] = useState({
		userPrincipal: "",
		alias: ""
	  });

	// let [{alias, ...rest}] = profile;

  

	const getProfile = async () => {
		const myProfile = await actor.readProfile(myujounalId);
		setProfile(myProfile);
		console.log(myProfile);
	};


	useEffect(() => {
		getProfile();
	  }, []);
	
	  return (
        <div>
        	<p>This is a Public Profile Page for {myujounalId}</p>
			<button id="logout" onClick={getProfile}>
				get profile
			</button>
			<ul>
				{/* <li>alias/author: {alias}</li> */}
				<li>totals</li>
				<li>list of entries</li>
			</ul>
			{/* <ListEntries entry={entries} list={working2}/> */}
        </div>
    )
}