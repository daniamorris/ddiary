import React, { useState} from "react";
import { useAuth } from "./use-auth-client";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import StarRateIcon from '@mui/icons-material/StarRate';
import CircleLoading from "./CircleLoading";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.overline,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Profile({registered, proid, points, nopro, yespro, setpro}) {
  const { principal, whoamiActor } = useAuth();
  let actor = whoamiActor;
  const cp = "Create";
  const up = "Update";
  const [currentPoints, setCurrentPoints] = useState(points);
  const showpoints = " You have " + currentPoints + " points!";
  const [loading, Setloading] = useState(false);
  const [profile, setProfile] = useState({
    userPrincipal: principal,
    alias: "",
});

  if (!proid == "" | null){
    displayMyProfile(proid);
  } else {
    console.log("we deleted the profile");
  }

  // const handleCreate = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   setProfile({
  //     userPrincipal: principal,
  //     email: data.get('email'),
  //     username: data.get('username'),
  //     alias: data.get('alias'),
  //     genre: data.get('genre'),
  //     artState: data.get('artState'),
  //     interests: data.get('interests')
  //   });
  //   createMyProfile({
  //     userPrincipal: principal,
  //     email: data.get('email'),
  //     username: data.get('username'),
  //     alias: data.get('alias'),
  //     genre: data.get('genre'),
  //     artState: data.get('artState'),
  //     interests: data.get('interests')
  //   });
  // }

  const handleUpdate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setProfile({
      userPrincipal: principal,
      alias: data.get('alias'),
    })
    updateMyProfile(proid, {
      userPrincipal: principal,
      alias: data.get('alias'),
    });
  }

  const handleDelete = (event) => {
    event.preventDefault();
    deleteMyProfile(proid);
  }

  async function createMyProfile(profile) {
    let profileId = await actor.createProfile(profile);
    setpro(profileId);
    yespro();
    displayMyProfile(profileId);
  }

  async function updateMyProfile(stringId, profile) {
    Setloading(true);
    let profileUpdated = await actor.updateProfile(stringId, profile);
    // let nowPoints = await actor.readPoints(parseInt(stringId));
    // setCurrentPoints(nowPoints);
    displayMyProfile(proid);
    Setloading(false);
  }  

  async function displayMyProfile(stringId) {
    const profileDisplayed = await actor.readProfile(stringId);
    // let nowPoints = await actor.readPoints(parseInt(stringId));
    // setCurrentPoints(nowPoints);
    const {0:{alias}} = profileDisplayed;
    document.getElementById("alias").value = alias;
  }  

  async function deleteMyProfile(stringId) {
    Setloading(true);
    const profileDeleted = await actor.deleteProfile(stringId);
    const alsoDeleted = await actor.deleteProPrinc(stringId);
    // const pointsDelete = await actor.deletePoints(parseInt(stringId));
    setProfile({
      userPrincipal: principal,
      alias: "",
    });
    document.getElementById("alias").value = "";
    // nopro();
    Setloading(false);
    setpro(null);
  }

return (
      <Container component="main" maxWidth="xs" sx={{backgroundColor: 'primary.light', borderRadius: 1.5, opacity: 0.7, marginBottom: 4}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mt: 3}}>
            Update Profile
          </Typography>
          {/* <Item id="mypoints"><StarRateIcon color="primary" sx={{ fontSize: 25, verticalAlign: '-8%'}}/>  {currentPoints && showpoints}</Item> */}
          {loading && <CircleLoading />}
          <Box component="form" noValidate onSubmit={handleUpdate} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  autoComplete="alias"
                  name="alias"
                  id="alias"
                  label="alias AKA"
                  autoFocus
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {registered ? up : cp} Profile
            </Button>
            {registered && 
              <Stack spacing={1}>
                <Item>Danger Zone</Item>
                <Item><Button variant="contained" color="error" onClick={handleDelete}>delete profile</Button></Item>
              </Stack>
            }
          </Box>
          <Box sx={{ height: 10}}></Box>
        </Box>
      </Container>
  );
}
