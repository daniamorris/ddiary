import React from "react";
import FancyCard from "./FancyCard";

export default function Entry(params) {
    
    return (
        <div>
        	<p>This is an Entry Page</p>
			<ul>
				<li>prompt</li>
				<li>title</li>
				<li>content</li>
				<li>author (linked to public profile)</li>
				<li>tipping options</li>
				<li>reactions</li>
				<li>	liked loved moved sad reactions</li>
				<li>reaction totals</li>
			</ul>
			{/* <FancyCard /> */}
        </div>
    )
}