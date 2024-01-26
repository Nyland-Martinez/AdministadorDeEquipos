'use client'
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


const NewPlayerPage = () => {

    const { Fragment } = require("react")

    const [name, setName] = useState("");
    const [position, setPosition] = useState("");

    const router = useRouter();

    const CreatePlayer = async (e) => {
        e.preventDefault();
        const data = {
        name: name,
        position: position.length > 0 ? position : null
    }
    console.log(data);
        try {
            const response = await axios.post("http://localhost:8000/api/players", data);
            const result = await response.data;
            console.log(result);
            setName("");
            setPosition("");
            router.push("/players/list")
            } catch (error) {
            console.log(error);
            (error);
        }
    };

    return (
        <Fragment>
            <Typography variant="h4" sx={{ mb: 4 }} >
                <Link href="/players/list">List </Link> 
                |
                <Link href="/players/addplayer">Add Player </Link>
            </Typography>
            <Paper elevation={2} sx={{ padding: 2 }}>
                <Typography variant="h4" sx={{ mb: 4 }} >
                    Add Player
                </Typography>
                <Stack direction="column" spacing={2}>
                    <Typography variant="h6" component="label" htmlFor="nameInput" >Player name:</Typography>
                        <TextField
                            type="text"
                            size="small"
                            autoComplete="off"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            helperText={name.length < 2 && name.length > 0 ? "Name must be at least 2 characters in length" : ""}
                            error={name.length < 2 && name.length > 0}
                        />
                    <Typography variant="h6" component="label" htmlFor="nameInput" >Preferred position:</Typography>
                        <TextField
                            type="text"
                            size="small"
                            fullWidth
                            autoComplete="off"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                    <Stack direction="row" spacing={2} justifyContent="center" >
                        
                        <Button 
                            type="submit"
                            variant="contained"
                            color="success"
                            sx={{ width: "fit-content" }}
                            disabled={name.length < 2}
                            onClick={CreatePlayer}>
                                ADD
                        </Button>
                        
                    </Stack>
                </Stack>
            </Paper>
        </Fragment>
    )
}

export default NewPlayerPage;