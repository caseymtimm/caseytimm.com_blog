import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

const Contact = ({ data, setImage }) => {
  setImage(
    "https://cms2.caseytimm.com/uploads/fb75842ee6d7454e9121abb1896e5612.jpg"
  )
  return (
    <Grid container>
      <Grid item>
        <Typography variant="h1">Contact Me!</Typography>
        <Typography variant="subtitle1">
          Casey Timm
          <br />
          Email: casey.m.timm@gmail.com
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Contact
