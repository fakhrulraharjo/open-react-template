import React from 'react'
import {Card,Box,Typography,CardContent} from '@mui/material'

interface props {
    name : string,
    phone : string,
    email : string
}

export const IdentityBox:React.FC<props> = ({name,phone,email}) => {
  return (
    <Card
    sx={{
        width : "90%"
    }}
    >
        <CardContent>
            <Box sx={{
                display : "flex",
                justifyContent : "space-evenly"
            }} >
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {`Name : ${name ? name : ""}`}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {`Phone : ${phone ? phone : ""}`}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {`E-Mail :  ${email ? email : ""}`}
            </Typography>
            </Box>
        </CardContent>
    </Card>
  )
}
