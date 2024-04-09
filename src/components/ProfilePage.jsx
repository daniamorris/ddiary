import React from "react";

export default function ProfilePage(params) {
	// myujounalId = params.jid;
	const myujounalId = "0";
    
    return (
        <div>
        	<p>This is a Profile Page for {myujounalId}</p>
			<ul>
				<li>list of entries (takes you to edit page)</li>
				<li>button to update profile</li>
				<li>profile update form</li>
				<li>totals</li>
			</ul>
        </div>
    )
}