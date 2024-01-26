import Link from "next/link";

const { AppBar, Container, Toolbar, Typography } = require("@mui/material")




const TopNav = () => {


    return (
        <AppBar position="static" style={{backgroundColor: "pink"}}>
            <Container maxWidth="xl" >
                <Toolbar disableGutters>
                    <Typography variant="h5" sx={{ marginRight: 4 }}>
                        <Link href={"/players/list"}>
                            Manage Players
                        </Link>
                    </Typography>
                    <Typography variant="h5">
                        <Link href={"/status/game/1"}>
                            Manage Players Status
                        </Link>
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
};

export default TopNav;