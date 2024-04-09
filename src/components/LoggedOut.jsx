import React, { useEffect, useState } from "react";
import { useAuth } from "./use-auth-client";
// import { backend } from "../declarations/backend";
import DailyPrompt from "./DailyPrompt";
import ListEntries from "./ListEntries";
import ProfilePagePublic from "./ProfilePagePublic";
import Entry from "./Entry";
import Container from '@mui/material/Container';
import FancyCard from "./FancyCard";
import { Link, Route, useParams } from "wouter";

function LoggedOut() {
  // let actor = backend;
  const { login } = useAuth();
  // const [result, setResult] = useState("");
  // const [entries, setEntries] = useState({
  //   jid: "",
  //   title: "",
  //   content: "",
  //   //engaged: Feedback;
  //   time: 5
  // });
  // console.log(entries);
  // const working2 = [{id : "27", title : "pink"}, {id : "26", title : "pinker"}, {id : "25", title : "Purple it is"}, ]; 


  // const getEntries = async () => {
  //   // const entryList = await Backend.listEntries();
  //   const entryList = await actor.listEntries();
  //   let [arrId, [id, {jid, title, content, time}]] = entryList;
  //   // let [entryID] = entryList[0][0];
  //   // let {jid, title, content} = entryList[0][1];
  //   // console.log(time);
  //   console.log(arrId);
  //   console.log(id);
  //   console.log(jid);
  //   console.log(title);
  //   console.log(content);
  //   console.log(time);
  //   // console.log(entryID);
  //   // console.log(jid);
  //   // setEntries(entryList);
  // };

  // useEffect(() => {
  //   getEntries();
  // }, []);

  return (
    <Container maxWidth="sm">

      <div className="container">
      <h1>Internet Identity Client</h1>
      <h2>What you seek is beyond the click</h2>
      <p>To log in, click this button!</p>
      <button type="button" id="loginButton" onClick={login}>
        Log in
      </button>

    <DailyPrompt />
    <ListEntries />
    <hr />
    {/* <ProfilePagePublic /> */}
    <Route path="/Entry/:id">
          {params => <Entry id={params.id} />}
        </Route>
    {/* <FancyCard /> */}
    </div>
    </Container>
  );
}

export default LoggedOut;
