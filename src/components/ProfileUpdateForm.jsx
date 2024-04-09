import React, { useState } from "react";
import { useAuth } from "./use-auth-client";
import { ColorRing } from 'react-loader-spinner';

export default function ProfileUpdateForm({id, prof, setpro}) {
	const { whoamiActor, principal} = useAuth();
	const [loading, setLoading] = useState(false);
	const [newAlias, setNewAlias] = useState(prof.alias);

	const handleUpdate = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		setpro({
		  userPrincipal: principal,
		  alias: newAlias,
		})
		updateMyEProfile(id, {
		  userPrincipal: principal,
		  alias: newAlias,
		});
	  }

	// updateProfile: (text, record {alias:text; userPrincipal:principal}) → () 
	async function updateMyEProfile(profileId, profile) {
		setLoading(true);
		let updating = await whoamiActor.updateProfile(profileId, profile);
		setLoading(false);
		// setpro(profileId);
		// yespro();
		// displayMyEntry(entryId);
	}	

    // update the profile alias

    
    return (
        <div>
        	<p>This is a Profile Update Form</p>
			<ColorRing
				visible={loading}
				height="80"
				width="80"
				ariaLabel="color-ring-loading"
				wrapperStyle={{}}
				wrapperClass="color-ring-wrapper"
				colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
			/>
        	<form noValidate onSubmit={handleUpdate}>
        		{/* <input type="text" id="alias" name="alias" placeholder={prof.alias}></input> */}
				<input 
				type="text" id="alias" name="alias"
				value={newAlias} // ...force the input's value to match the state variable...
				onChange={e => setNewAlias(e.target.value)} // ... and update the state variable on any edits!
				// placeholder={newAlias}
				/>
				<button name="submit" value="submit">Update my Alias
				</button>
        	</form>
        </div>
    )
}