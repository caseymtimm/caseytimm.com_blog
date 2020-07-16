import React, { useState } from "react"
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles"
import { orange } from "@material-ui/core/colors"
import Header from "./header/header.js"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import { Grid, Container, Box, Typography } from "@material-ui/core"
import Helmet from "react-helmet"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import { Router, Link, Location } from "@reach/router"
import PostList from "./postlist"
import Post from "./post"
import Contact from "./contact"
import Smarthome from "./smarthome"
import AuthProvider from "./authContext"

const IMAGE = gql`
  {
    caseytimmComHeader {
      Header {
        url
      }
    }
  }
`

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "dark",
      primary: orange,
    },
  })
)

const client = new ApolloClient({
  uri: "https://cms2.caseytimm.com/graphql",
  request: (operation) => {
    const token = JSON.parse(localStorage.getItem("authBody"))
    operation.setContext({
      headers: {
        authorization:
          token && token.data && token.data.jwt
            ? `Bearer ${token.data.jwt}`
            : "",
      },
    })
  },
})

const Wrapper = (props) => (
  <AuthProvider>
    <ApolloProvider client={client}>
      <App props={props} />
    </ApolloProvider>
  </AuthProvider>
)

function App(props) {
  const { loading, error, data } = useQuery(IMAGE)
  const { coverPrecent } = props
  const [image, setImage] = useState()

  const height = 200
  return (
    <>
      <Helmet></Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <Location>
              {({ location }) => {
                const imagesrc =
                  typeof image === "undefined" || location.pathname === "/"
                    ? !loading && !error
                      ? `http://cms2.caseytimm.com${data.caseytimmComHeader.Header.url}`
                      : undefined
                    : image
                return (
                  <img
                    style={{
                      marginTop: "100px",
                      width: "100%",
                    }}
                    alt="Title"
                    src={imagesrc}
                  />
                )
              }}
            </Location>
          </Grid>
        </Grid>

        <Header
          brand={"Casey Timm's Blog"}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 50,
            color: theme.palette.background.default,
          }}
        />
        <Grid
          container
          spacing={3}
          alignItems="center"
          justify="center"
          direction="row"
        >
          <Container
            style={{
              position: "relative",
              zIndex: "3",
              marginTop: `-${height * (coverPrecent / 100)}px`,
            }}
          >
            <Grid item xs={12}>
              <Paper>
                <Router>
                  <PostList path="/" />
                  <Post path="/post/:slug" setImage={setImage} />
                  <Contact path="/contact" setImage={setImage} />
                  <Smarthome path="/smarthome" />
                </Router>
              </Paper>
            </Grid>
          </Container>
        </Grid>
        <Grid container spacing={3} alignItems="center" justify="center">
          <Grid item xs={4}>
            <Box display="flex" justifyContent="center" p={1} m={1}>
              <Typography>© {new Date().getFullYear()} Casey Timm</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" justifyContent="center" p={1} m={1}>
              <Typography>
                <Link to="/contact">Contact Me!</Link>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" justifyContent="center" p={1} m={1}>
              <Typography>
                Built with
                <a href="https://reactjs.org/">{`React`}</a>
                {" and "}
                <a href="http://strapi.io">{`Strapi`}</a>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  )
}

export default Wrapper
