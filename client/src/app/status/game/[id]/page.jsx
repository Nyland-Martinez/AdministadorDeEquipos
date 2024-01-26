'use client'
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";



const GameStatusPage = () => {

    const { id } = useParams();

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

    const updatePlayerStatus = async (item, value) => {
        try {
            const data = { ...item };
            data.status[id - 1] = value;
            const response = await axios.put(`http://localhost:8000/api/players/${item._id}`, data);
            const result = await response.data;
            console.log(result);
            setPlayers((prevValue) => {
                const idx = players.findIndex((itm) => itm._id === data._id);
                prevValue[idx] = data;
                return ([...prevValue]);
            });
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getPlayers();
    }, [])


    return (
        <Fragment>
            <Typography variant="h3">
                Player Status - Game {id}
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
                <Typography variant="h4">
                    <Link href="/status/game/1">Game 1</Link>
                </Typography>
                <Typography variant="h4">
                    <Link href="/status/game/2">Game 2</Link>
                </Typography>
                <Typography variant="h4">
                    <Link href="/status/game/3">Game 3</Link>
                </Typography>
            </Stack>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{backgroundColor: "purple"}}>
                        <TableRow>
                            <TableCell align="center" sx={{ color: "white"}}>Player name</TableCell>
                            <TableCell align="center" sx={{ color: "white"}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: "whitesmoke"}}>
                        {
                            players.map((item, idx) => {
                                return (
                                    <TableRow key={idx}>
                                        <TableCell align="center">{item.name}</TableCell>
                                        <TableCell align="center">
                                            <Stack direction="row" spacing={2} justifyContent="center">
                                                <Button
                                                    variant={item.status[id - 1] === "Playing" ? "contained" : "outlined"}
                                                    color="success"
                                                    onClick={() => updatePlayerStatus(item, "Playing")}
                                                >
                                                    Playing
                                                </Button>
                                                <Button
                                                    variant={item.status[id - 1] === "NotPlaying" ? "contained" : "outlined"}
                                                    color="error"
                                                    onClick={() => updatePlayerStatus(item, "NotPlaying")}
                                                >
                                                    Not Playing
                                                </Button>
                                                <Button
                                                    variant={item.status[id - 1] === "Undecided" ? "contained" : "outlined"}
                                                    color="warning"
                                                    onClick={() => updatePlayerStatus(item, "Undecided")}
                                                >
                                                    Playing
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

export default GameStatusPage;