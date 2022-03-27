import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {CardActions,Modal} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

interface cardValue {
    description? : string,
    redeemLink? : string,
    startDate : Date,
    endDate : Date,
    id? : number,
    redeem? : boolean
}

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
  

export const Coupon:React.FC<cardValue> = ({description,redeemLink,startDate,endDate,id,redeem}) => {
    const [btnText, setBtnText] = React.useState<"redeem" | "expired" | "used">("redeem");
    const [modalText, setModalText] = React.useState<string>("Kupon berhasil digunakan!!");
    const [modalText2, setModalText2] = React.useState<string>("Kupon berhasil digunakan!!");

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let apiLink = process.env.NEXT_PUBLIC_API_URL ||  `http://ubuntulab`
    description = description || "Free OG"
    var getLink = id ? `/api/v2/assigncoupon/redeem/${id}` : `/api/v2/assigncoupon/redeem/1`
    var convstartDate = startDate ? new Date(startDate).toLocaleDateString() : "22/22/2022"
    var convendDate = endDate ? new Date(endDate).toLocaleDateString() : "22/22/2022"
    var now = new Date().toLocaleDateString()
    //if (redeem) setBtnText("used")
    React.useEffect(() => {
        if (new Date() > new Date(endDate) ) setBtnText("expired")
        if (!redeem) setBtnText("redeem")
        if (redeem) setBtnText("used")
    }, [redeem])
    
    const handleRedeem = () =>{
        console.log("clicked")
        if (!getLink) return 
        setBtnText("used")
        axios({baseURL: "http://ubuntulab:7790",url: getLink})
        .then(res => {
            setBtnText("used")
            let text = id ? id.toString() : ""
            setModalText(text)
            setModalText2("Masukkan kode beriku pada kolom catatan transaksi.")
            handleOpen()
            return
        })
        .catch(err => {
            //Error Handling
            setModalText("Error")
            setModalText2(err)
            handleOpen()
            return
        })
    }

    return (
        <>
              <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalText}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalText2}
            </Typography>
        </Box>
      </Modal>

                <Card sx={{ minWidth: 275,margin:"1%" }}>
          <CardContent>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {`${description}`}
            </Typography>
            <Typography variant="body2">
              {`${convstartDate} - ${convendDate}`}
            </Typography>
          </CardContent>
          <CardActions>
        <Button sx={{
            justifyContent : "center"
        }} 
        variant="contained"
        disabled={btnText == "redeem" ? false : true}
        fullWidth={true}
        onClick={handleRedeem}
        >{btnText.toUpperCase()}
        </Button>
          </CardActions>
        </Card>
        </>

      );
}
