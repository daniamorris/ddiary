import React, { useEffect, useState } from "react";
import { Principal } from "@dfinity/principal";
import LoggedOut from "./LoggedOut";
import { useAuth, AuthProvider } from "./use-auth-client";
import LoggedIn from "./LoggedIn";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, Route, useParams } from "wouter";
import Header2 from "./Header2.jsx";
import Footer from "./Footer";
import Art from "./Art";
import Support from "./Support";
import Album from "./Album";
import Master from "./Master";
import PublicProfile from "./PublicProfile";
import Profile from "./Profile";
import PreHeader from "./PreHeader"
import PreSupport from "./PreSupport"
import SignInSide from "./SignInSide";
import PreMaster from "./PreMaster";
import Button from '@mui/material/Button';
import ListProfiles from "./ListProfiles";
import Test from "./Test";
import MediaCard from "./MediaCard";
import ImageDetail from "./ImageDetail";
import Account from "./Account";
import Uploads from "./Uploads";
// import {AssetManager} from '@dfinity/assets';
// import {HttpAgent} from '@dfinity/agent';


const defaultTheme = createTheme({
  palette: {
    background: {
      default: '#40003f',
    },
    primary: {
      light: '#e1bee7',
      main: '#6a1b9a',
      dark: '#4a148c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#b2dfdb',
      main: '#9c27b0',
      dark: '#004d40',
      contrastText: '#000',
    },
    accent: {
      main: '#4a148c',
    },
  },
});

function App() {
  const { isAuthenticated, identity, principal, whoamiActor } = useAuth();
  let actor = whoamiActor;
  const [hasProfile, setHasProfile] = useState(false);
  const [profileId, setProfileId] = useState();
  const [points, setPoints] = useState(100);
  const [hasAccount, setHasAccount] = useState(false);
  const [acoId, setAcoId] = useState();

//   const isLocal = !window.location.host.endsWith('ic0.app');
// const agent = new HttpAgent({
//     host: isLocal ? `http://127.0.0.1:${window.location.port}` : 'https://ic0.app', identity,
// });
// if (isLocal) {
//     agent.fetchRootKey();
// }

// const canisterId ='bd3sg-teaaa-aaaaa-qaaba-cai';
// // const canisterId = new URLSearchParams(window.location.search).get('canisterId') ?? /(.*?)(?:\.raw)?\.ic0.app/.exec(window.location.host)?.[1] ?? /(.*)\.localhost/.exec(window.location.host)?.[1];
// const assetManager = new AssetManager({canisterId, agent});


  // search
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
  //convert input text to lower case
  var lowerCase = e.target.value.toLowerCase();
  setInputText(lowerCase);
  };

  function nopro(){
    setHasProfile(false);
    // setProfileId();
  }

  function yespro(){
    setHasProfile(true);
  }

  function setpro(profileId){
    setProfileId(profileId);
  }

  function noacc(){
    setHasAccount(false);
    // setProfileId();
  }

  function yesacc(){
    setHasAccount(true);
  }

  function setacc(acoId){
    setAcoId(acoId);
  }

  async function addPoints(adding){
    // setPlus(adding);
    // console.log("adding this many points: " + adding);
    let newtotal = (parseInt(points)) + adding;
    // console.log("updating total points now to: " + newtotal);
    let proidNat = (parseInt(profileId));
    let mypoints = await actor.addPoints(proidNat, newtotal);
    getMyPoints(proidNat);
  }

  async function getMyProfileId(){
    let getProfileId = await actor.hasProfile(principal);
    if (!getProfileId == "" | null){
      // console.log("has a profile initializing points counter");
      setProfileId(getProfileId);
      // console.log("profile id is: " + profileId + " also " + getProfileId);
      setHasProfile(true);
      getMyPoints(parseInt(getProfileId));
    };
  }

  async function getMyPoints (profileId){
    let mypoints = await actor.readPoints(profileId);
    setPoints(mypoints);
  };

  async function getMyAccountId(){
    let returnAccount = await actor.hasAccount(principal);
    setAcoId(returnAccount);
    if (!returnAccount == ""){
      setHasAccount(true);
    };
  }

  if (isAuthenticated){
    console.log("we are authenticated now check for a profile");
    getMyProfileId(principal);
    getMyAccountId(principal);
  };

  return (
    <>      
      <header>
      {isAuthenticated ? <Header2 loginStatus = {isAuthenticated} input={inputText} shandle={inputHandler}/> : <PreHeader input={inputText} shandle={inputHandler}/>}
      </header>
      <main>
        {/* <Button variant="contained" onClick={handlePoints}>get points</Button> */}
        {/* <Route path="/">{isAuthenticated ? <LoggedIn /> : <LoggedOut />}</Route> */}
        {/* <Route path="/" component={SignInSide} /> */}
        {/* <Route path="/"><MediaCard image="squares11.jpg" title="love" desc="this"/></Route> */}
        {/* <Route path="/PublicProfile/:id" component={User} /> */}
        <Route path="/PublicProfile/:id">
          {params => <PublicProfile id={params.id} />}
        </Route>
        {/* <Route path="/"><Test id={profileId} registered={hasProfile} proid={profileId}/></Route> */}
        <Route path="/" component={Uploads} />
        {/* <Route path="/" component={ListProfiles} /> */}
        {/* <Route path="/" component={PublicProfile} /> */}
        {/* <Route path="/"><ImageDetail image="squares11.jpg" title="love" desc="this"/></Route> */}
        {/* <Route path="/Art"><Art input={inputText} readps={handleRead} adps={handleInc}/></Route> */}
        <Route path="/Art"><Art input={inputText} addPoints={addPoints} loginStatus = {isAuthenticated}/></Route>
        <Route path="/Support">{isAuthenticated ? <Support loginStatus = {isAuthenticated}/> : <PreSupport loginStatus = {isAuthenticated}/>}</Route>
        <Route path="/Master">{isAuthenticated ? <Master addPoints={addPoints} points={points}/> : <PreMaster loginStatus = {isAuthenticated}/>}</Route>
        <Route path="/PublicProfile"><PublicProfile id = {principal} registered={hasProfile} proid={profileId}/></Route>
        {/* <Route path="/ImageTest"><ImageTest id = {principal} registered={hasProfile} proid={profId}/></Route> */}
        <Route path="/Profile"><Profile registered={hasProfile} proid={profileId} points={points} nopro={nopro} yespro={yespro} setpro={setpro}/></Route>
        <Route path="/Account"><Account regAco={hasAccount} acoid={acoId} noacc={noacc} yesacc={yesacc} setacc={setacc}/></Route>
        <Route path="/Gallery"><Album id = {principal}/></Route>
        {/* <Route path="/Uploads"><Uploads id = {principal} registered={hasProfile} proid={profId}/></Route> */}
        {/* {isAuthenticated ? <LoggedIn /> : <LoggedOut />} */}
      </main>
      <Footer />
    </>
  );
}

export default () => (
  <AuthProvider>
    <ThemeProvider theme={defaultTheme}>
      {/* <UserProvider> */}
        <App />
      {/* </UserProvider> */}
    </ThemeProvider>
  </AuthProvider>
);
