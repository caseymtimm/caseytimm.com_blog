import React, { useState, useContext } from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Button from "@material-ui/core/Button"
import GitHubIcon from "@material-ui/icons/GitHub"
import LinkedInIcon from "@material-ui/icons/LinkedIn"
import Divider from "@material-ui/core/Divider"
import HomeIcon from "@material-ui/icons/Home"
import FaceIcon from "@material-ui/icons/Face"
import { Link } from "@reach/router"
import Login from "../Login"
import { AuthContext } from "../authContext"

const flexContainer = {
  display: "flex",
  flexDirection: "row",
  padding: 0,
}

export default function HeaderLinks({ horizontal }) {
  const { authenticated, setAuthenticated, authBody, setAuthBody } = useContext(
    AuthContext
  )
  const [loginOpen, setLoginOpen] = useState(false)
  return (
    <>
      <Login open={loginOpen} setOpen={setLoginOpen} />
      <List
        style={horizontal ? flexContainer : {}}
        component="nav"
        aria-label="main mailbox folders"
      >
        <ListItem>
          <Button
            startIcon={<GitHubIcon />}
            href="https://github.com/caseymtimm/"
            color="transparent"
          >
            Github
          </Button>
        </ListItem>
        <ListItem>
          <Button
            startIcon={<LinkedInIcon />}
            href="https://www.linkedin.com/in/casey-timm-4b429089/"
            color="transparent"
          >
            LinkedIn
          </Button>
        </ListItem>
        <Divider />
        <ListItem>
          <Button startIcon={<HomeIcon />} color="transparent">
            <Link
              to="/smarthome"
              style={{
                textDecoration: "none",
                color: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              Smart Home
            </Link>
          </Button>
        </ListItem>
        <ListItem>
          {authenticated ? (
            <Button
              startIcon={<FaceIcon />}
              color="transparent"
              onClick={() => {
                setAuthBody({})
                setAuthenticated(false)
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              startIcon={<FaceIcon />}
              color="transparent"
              onClick={() => setLoginOpen(true)}
            >
              Login
            </Button>
          )}
        </ListItem>
      </List>
    </>
  )
}
