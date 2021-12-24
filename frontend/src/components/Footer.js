import React from 'react';
import { SkipPrevious, Shuffle, SkipNext, Repeat } from '@mui/icons-material';
import { Grid, Slider } from '@mui/material';
import "./Footer.css"

export default function Footer(props) {
  return (
    <div className="footer">
      <div className="footer__left">
        <img className="footer_albumLogo" src={props.image} alt="image" />
      </div>  
      <div className="footer__center">
      <Shuffle className="footer__green" />
      <SkipPrevious className="footer__icon" />
      <SkipNext className="footer__icon" />
      <Repeat className="footer__green" />
      </div>
    <div className="footer_right">
      <Grid container spacing={2}>
      <Grid item>
      <Grid item xs>
      <Slider aria-labelledby="continius-slider" />
    </Grid>
    </Grid> 
    </Grid>
    </div>
    </div>
  )
}
