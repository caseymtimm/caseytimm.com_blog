import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import CardActionArea from "@material-ui/core/CardActionArea"
import Typography from "@material-ui/core/Typography"
import { Link } from "gatsby"

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    height: 150,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
}))

export default ({ image, title, shortText, location }) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={image}
        title="Live from space album cover"
      />

      <CardActionArea component={Link} to={location}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {shortText}
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  )
}
