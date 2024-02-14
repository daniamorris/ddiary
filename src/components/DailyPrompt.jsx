import React from "react";
import data from "../data/prompts.json"

export default function DailyPrompt(params) {
    
    const myQuestions = data;
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    // use day to pull the prompt from data
    
    return (
        <>
        <h6>Todays Prompt:</h6>
        <h4>What's your favorite color?</h4>
        </>
    )
}