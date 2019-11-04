import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Button from "@material-ui/core/Button"
import GitHubIcon from "@material-ui/icons/GitHub"
import LinkedInIcon from "@material-ui/icons/LinkedIn"
import Divider from "@material-ui/core/Divider"

const headerLinksStyle = theme => ({
  list: {
    fontSize: "14px",
    margin: 0,
    paddingLeft: "0",
    listStyle: "none",
    paddingTop: "0",
    paddingBottom: "0",
    color: "inherit",
  },
  listItem: {
    float: "left",
    color: "inherit",
    position: "relative",
    display: "block",
    width: "auto",
    margin: "0",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      "&:after": {
        width: "calc(100% - 30px)",
        content: '""',
        display: "block",
        height: "1px",
        marginLeft: "15px",
      },
    },
  },
  listItemText: {
    padding: "0 !important",
  },
  navLink: {
    color: "inherit",
    position: "relative",
    padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    "&:hover,&:focus": {
      color: "inherit",
      background: "rgba(200, 200, 200, 0.2)",
    },
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 30px)",
      marginLeft: "15px",
      marginBottom: "8px",
      marginTop: "8px",
      textAlign: "left",
      "& > span:first-child": {
        justifyContent: "flex-start",
      },
    },
  },
  notificationNavLink: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    top: "4px",
  },
  registerNavLink: {
    top: "3px",
    position: "relative",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
  },
  navLinkActive: {
    color: "inherit",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  icons: {
    width: "20px",
    height: "20px",
    marginRight: "3px",
  },
  socialIcons: {
    position: "relative",
    fontSize: "20px !important",
    marginRight: "4px",
  },
  dropdownLink: {
    "&,&:hover,&:focus": {
      color: "inherit",
      textDecoration: "none",
      display: "block",
      padding: "10px 20px",
    },
  },
})

const useStyles = makeStyles(headerLinksStyle)

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />
}

export default function SimpleList() {
  const classes = useStyles()

  return (
    <div className={classes.list}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem className={classes.listItem}>
          <Button
            href="https://github.com/caseymtimm/"
            color="transparent"
            className={classes.navLink}
          >
            <GitHubIcon className={classes.icons} /> Github
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            href="https://www.linkedin.com/in/casey-timm-4b429089/"
            color="transparent"
            className={classes.navLink}
          >
            <LinkedInIcon className={classes.icons} /> LinkedIn
          </Button>
        </ListItem>
      </List>
    </div>
  )
}
