import React from "react";
import DailyPrompt from "./DailyPrompt";
import EntryForm from "./EntryForm";

export default function CreateEntry(params) {
    
    return (
        <div>
        	<p>This is a Create Entry Page</p>
			<ul>
				<li>todays prompt</li>
				<li>entry form</li>
				<li>submit/edit button</li>
			</ul>
			{/* <DailyPrompt /> */}
			{/* <EntryForm /> */}
        </div>
    )
}