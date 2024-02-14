import React from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function ListEntries(params) {

	//import the entries data
    
    return (
		<Box sx={{ width: '100%', maxWidth: 360, bgcolor: "#f8d4fb" }}>
		<p>This is a list of entries</p>
		<nav aria-label="list of entries">
		<List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="entry 1" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="entry 2" />
            </ListItemButton>
          </ListItem>
        </List>
		</nav>
    </Box>

    )
}