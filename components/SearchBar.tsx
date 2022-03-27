import React from 'react'
import {Button,Stack,TextField} from '@mui/material';

interface props {
    searchButton : any
    inputField: any
}

export const SearchBar:React.FC<props> = ({searchButton,inputField}) => {
  return (
    <Stack spacing={2} direction="row">
    <TextField 
    id="outlined-basic" 
    label="Outlined" 
    variant="outlined" 
    onChange={inputField}
    />
    <Button 
    onClick={() => searchButton()}
    variant="contained"
    >Search
    </Button>
    </Stack>
    )
}
