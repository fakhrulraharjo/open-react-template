import React, { useEffect, useState } from 'react'
import {Box,Modal,Typography} from '@mui/material'
import { SearchBar } from './SearchBar'
import {Coupon} from './Coupon'
import axios from 'axios'
import {IdentityBox} from './IdentityBox'



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export interface Coupon {
  ID: number;
  customer_id: number;
  coupon_id: number;
  description: string;
  start_date: Date;
  end_date: Date;
  redeem_status: boolean;
  redeem_time: Date;
  issued_date: Date;
}


export interface customer {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt?: any;
  name: string;
  email: string;
  phone: string;
  customer_coupons?: any;
  coupons: Coupon[];
}

interface props {
}

export const Redeem:React.FC<props> = ({}) => {
  const [data, setDate] = React.useState<customer>()
  const [searchInput, setSearchInput] = React.useState<string>("")
  const [click, setClick] = React.useState<boolean>(true)
  var couponList = data ? data?.coupons : []
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let apiLink = process.env.NEXT_PUBLIC_API_URL ||  `http://ubuntulab`
  var getDataUrl = apiLink ? `/api/v2/assigncoupon?key=customer&search=${searchInput}` : `/api/v2/assigncoupon/redeem/1`
  console.log(`API URL : ${process.env.NEXT_PUBLIC_API_URL}`)

  const handleSearchButton = (reason:any) =>{
    //console.log(reason)
    if (reason === 'clickaway') {
      return;
    }
    setClick(prevClick => !prevClick)
    axios({baseURL : "http://ubuntulab:7790",url: getDataUrl})
    .then(res => {
      //console.log(res.data)
      setDate(res.data)
      return
    })
    .catch(err => {
      console.log(err)
      setOpen(true)
      setDate(undefined)
      return
    })
  }

  useEffect(()=>{
    console.log("search")
    console.log(getDataUrl)

  },[click])

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>{
    console.log(event.target.value)
    setSearchInput(event.target.value)
  }

  return (
    <Box height="100vh" display="flex" flexDirection="column" sx={{
      justifyContent : "center",
      alignItems : "center"
    }} >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User Not Found
          </Typography>
        </Box>
      </Modal>

      <SearchBar
      searchButton={handleSearchButton}
      inputField={handleInputChange}
      />{data ? 
        <IdentityBox
        name={data.name}
        email={data.email}
        phone = {data.phone}
      /> :
      <></>
      }

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 5,
          bgcolor: 'background.paper',
          borderRadius: 1,
          width : "100%"
        }}
      >
      {data ?
      couponList.map((coupon,i,a) =>{

        return (
          <Coupon 
          key={i} 
          id={coupon.ID} 
          startDate={coupon.start_date}
          endDate={coupon.end_date} 
          description={coupon.description}
          redeem={coupon.redeem_status}
 
          />
        )
      }):
      <></>}
      </Box>
    </Box>
  )
}
