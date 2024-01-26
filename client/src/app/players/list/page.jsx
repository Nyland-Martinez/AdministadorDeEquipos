'use client'
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";



const ListPlayerPage = () => {

    const [players, setPlayers] = useState([]);

    const getPlayers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/players");
            const result = await response.data;
            setPlayers(result);
        }
        catch (error) {
            console.log(error);
        }
    }

    const deletePlayer = async (player) => {
        const confirmeDelete = confirm(`Está a punto de elminar al jugador ${player.name}`);
        if (confirmeDelete) {
            try {
                const response = await axios.delete(`http://localhost:8000/api/players/${player._id}`);
                const result = await response.data;
                console.log(result);
                setPlayers((prevValue) => {
                    const filtered = prevValue.filter((item) => item._id !== player._id);
                    return ([...filtered]);
                });
            } catch (error) {
                console.log(error);
            }
        }
    }


    useEffect(() => {
        getPlayers();
    }, [])


    return (
        <Fragment>
            <Typography variant="h4" sx={{ mb: 4 }} >
                <Link href="/players/list">List </Link> 
                |
                <Link href="/players/addplayer">Add Player </Link>
            </Typography>
            

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{backgroundColor: "purple"}}>
                        <TableRow>
                            <TableCell align="center" sx={{ color: "white"}}>Team Name</TableCell>
                            <TableCell align="center" sx={{ color: "white"}}>Preferred Position</TableCell>
                            <TableCell align="center" sx={{ color: "white"}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: "whitesmoke"}}>
                        {
                            players.map((item, idx) => {
                                return (
                                    <TableRow key={idx}>
                                        <TableCell align="center">{item.name}</TableCell>
                                        <TableCell align="center">{item.position}</TableCell>
                                        <TableCell align="center">
                                            <Stack direction="row" spacing={2} justifyContent="center">
                                                <Button variant="contained" color="error" onClick={() => deletePlayer(item)}>
                                                    Delete
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
}

export default ListPlayerPage;