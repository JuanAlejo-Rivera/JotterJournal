import { Box, Toolbar } from "@mui/material"
import { NavBar, SideBar } from "../components";
import { useState } from "react";

const drawerWidth = 250;

export const JournalLayout = ({ children }) => {


    const [mobileOpen, setMobileOpen] = useState(false); 

    const handleOpenSidebar = () => setMobileOpen(true);   
    const handleCloseSidebar = () => setMobileOpen(false); 

    return (
        <Box sx={{ display: 'flex' }} className="animate__animated animate__fadeIn animate__faster">

            {/* navbar */}
            <NavBar drawerWidth={drawerWidth} onOpenSidebar={handleOpenSidebar}/>

            {/* sidebar */}
            <SideBar
                drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
                onClose={handleCloseSidebar}

            />
            <Box
                component='main'
                sx={{ flexGrow: 1, p: 3 }}
            >

                {/* Toolbar */}
                <Toolbar />

                {children}
            </Box>

        </Box>
    )
}
