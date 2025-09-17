import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { jotterTheme } from "./jotterTheme"

export const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={ jotterTheme }>
            <CssBaseline />

            {children}
        </ThemeProvider>
    )
}
