import React, { useEffect, useState } from "react";
import { backend } from "../declarations/backend";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function ListEntries(params) {
  let actor = backend; 
  const [entries, setEntries] = useState([["0", {
    jid: "",
    title: "",
    content: "",
    //engaged: Feedback;
    time: 5
    }]]);	 

  // const userlink = "/ProfilePage/" + [entries[0],[entries[1].jid]]; //this will only work in the map

	const getEntries = async () => {
		const entryList = await actor.listEntries();
		setEntries(entryList);
	};

  useEffect(() => {
    getEntries();
  }, []);

    return (
		<Box sx={{ width: '100%', maxWidth: 360, bgcolor: "#f8d4fb" }}>
      {/* <p>This is a list of entries</p> */}
      <nav aria-label="list of entries">
      <List>
      {entries.map(entry =>
        <ListItem key={entry[0]} disablePadding>
          <ListItemButton component="a" href={"/Entry/" + [entry[0]]}>
            <ListItemText primary={[entry[1].title]} />
          </ListItemButton>
        </ListItem>
      )}
      </List>
      </nav>
    </Box>
    )
}