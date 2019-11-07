import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import Hidden from "@material-ui/core/Hidden"
import Drawer from "@material-ui/core/Drawer"
import Menu from "@material-ui/icons/Menu"
import { Link } from "gatsby"
import HeaderLinks from "./HeaderLinks"

import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import { List, ListItem } from "@material-ui/core"

const useStyles = makeStyles({
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    "@media (min-width: 576px)": {
      maxWidth: "540px",
    },
    "@media (min-width: 768px)": {
      maxWidth: "720px",
    },
    "@media (min-width: 992px)": {
      maxWidth: "960px",
    },
    "@media (min-width: 1200px)": {
      maxWidth: "1140px",
    },
    minHeight: "50px",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "nowrap",
  },

  transparent: {
    backgroundColor: "transparent !important",
    boxShadow: "none",
    paddingTop: "25px",
    color: "#FFFFFF",
  },
})

export default function Header(props) {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const { brand, changeColorOnScroll } = props
  const trigger = useScrollTrigger({ threshold: changeColorOnScroll.height })

  return (
    <AppBar className={trigger ? "" : classes.transparent}>
      <Toolbar className={classes.container}>
        <List>
          <ListItem>
            <Button color="transparent">
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  whiteSpace: "nowrap",
                }}
              >
                {brand}
              </Link>
            </Button>
          </ListItem>
        </List>

        <Hidden smDown implementation="css">
          <HeaderLinks horizontal />
        </Hidden>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <HeaderLinks />
        </Drawer>
      </Hidden>
    </AppBar>
  )
}
