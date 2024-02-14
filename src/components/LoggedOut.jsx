import React from "react";
import { useAuth } from "./use-auth-client";
import DailyPrompt from "./DailyPrompt";
import ListEntries from "./ListEntries";
import ProfilePagePublic from "./ProfilePagePublic";
import Entry from "./Entry";
import Container from '@mui/material/Container';
import FancyCard from "./FancyCard";

function LoggedOut() {
  const { login } = useAuth();

  return (
    <Container maxWidth="sm">
      <div className="container">
      <h1>Internet Identity Client</h1>
      <h2>What you seek is beyond the click</h2>
      <p>To log in, click this button!</p>
      <button type="button" id="loginButton" onClick={login}>
        Log in
      </button>
    {/* <DailyPrompt />
    <ListEntries />
    <hr />
    <ProfilePagePublic />
    <Entry />
    <FancyCard /> */}
    </div>
    </Container>
  );
}

export default LoggedOut;
