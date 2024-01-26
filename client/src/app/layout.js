import { Inter } from 'next/font/google'
import './globals.css'
import TopNav from "@/components/navs/TopNav";
import { AppBar, Paper } from "@mui/material";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopNav />
        <AppBar />
        <Paper sx={{ margin: 2, padding: 2 }}>
          {children}
        </Paper>              
      </body>       
    </html>
  )
}