import React, { useEffect, useState } from "react";
import { useAuth } from "./use-auth-client";
import shortName from "./names";
import { ColorRing } from 'react-loader-spinner';
import ProfilePage from "./ProfilePage";
import DailyPrompt from "./DailyPrompt";
import EntryForm from "./EntryForm";
import ProfileUpdateForm from "./ProfileUpdateForm"
import Profile from "./Profile";

const whoamiStyles = {
  border: "1px solid #1a1a1a",
  marginBottom: "1rem",
};

function LoggedIn() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileId, setProfileId] = useState();
  const { whoamiActor, logout, principal } = useAuth();
  const myalias = shortName;
  const [myAlias, setMyAlias] = useState(myalias);
  const [profile, setProfile] = useState({
    userPrincipal: principal,
    alias: myAlias
});

const handleClick = async () => {
  const whoami = await whoamiActor.whoami();
  setResult(whoami);
};

const firstTime = async () => {
  const getProfileId = await whoamiActor.hasProfile(principal);
  if (!getProfileId == "" | null){
    setProfileId(getProfileId);
    let welcomeback = "Welcome back " + profile.alias;
    setProfile({
      userPrincipal: principal,
      alias: profile.alias
    })
    setResult(welcomeback);
    setRegistered(true);
  } else {
    setLoading(true);
    let profileId = await whoamiActor.createProfile(profile);
    setProfileId(profileId);
    setLoading(false);
  }
};

  const getMyProfileId = async () => {
    setLoading(true);
    const getProfileId = await whoamiActor.hasProfile(principal);
    setResult(getProfileId);
    setLoading(false);
  };

  const getAddress = async () => {
    // const myaddress = await whoamiActor.getckBTCAddress(principal, subaccount=null);
    setLoading(true);
    const myaddress = await whoamiActor.getckBTCAddress();
    setResult(myaddress);
    setLoading(false);
  };

  const makeProfile = async () => {
    setLoading(true);
    const newprofileId = await whoamiActor.createProfile({
      userPrincipal: principal,
      alias: myalias
  });
    setProfileId(newprofileId);
    setResult(newprofileId);
    setLoading(false);
  };

  function setpro(profile){
    setProfile(profile);
    setMyAlias(profile.alias);
  }

  useEffect(() => {
    firstTime();
  }, []);

  return (
    <div className="container">
      {/* <h1>Internet Identity Client</h1> */}
      <h2>You are authenticated! {myalias} </h2>
      <DailyPrompt />
      <EntryForm id={profileId} prof={profile}/>
      {/* <p>Your profile id is: {profileId}</p> */}
      <p>To see how a canister views you, click this button!</p>
      <button
        type="button"
        id="whoamiButton"
        className="primary"
        onClick={handleClick}
      >
        Who am I?
      </button>
      <input
        type="text"
        readOnly
        id="whoami"
        value={result}
        placeholder="your Identity"
        style={whoamiStyles}
      />
      <button id="logout" onClick={logout}>
        log out
      </button>
      <ColorRing
        visible={loading}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
      <button id="getaddress" onClick={getAddress}>
        get my ckBTC address
      </button>
      <hr />
      <ProfileUpdateForm id={profileId} prof={profile} setpro={setpro}/>
      {/* <ProfilePage /> */}
    </div>
  );
}

export default LoggedIn;
