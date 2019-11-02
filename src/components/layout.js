/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import { green, purple } from "@material-ui/core/colors"
import Header from "./header/header.js"
import "./layout.css"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import { Grid, Container, Box } from "@material-ui/core"
import LargeImage from "./header/LargeImage"

import classNames from "classnames"

import { makeStyles } from "@material-ui/core/styles"

const landingPageStyle = {
  container: {
    zIndex: "12",
    color: "#FFFFFF",
  },
  title: {
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none",
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0",
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
}

const useStyles = makeStyles(landingPageStyle)

const theme = createMuiTheme({
  spacing: 8,
  palette: {
    primary: purple,
    secondary: green,
  },
})

const Layout = ({ children, noRaise }) => {
  const classes = useStyles()
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      strapiLargeimages(current: { eq: true }) {
        id
        picture {
          childImageSharp {
            fixed {
              src
            }
          }
        }
      }
    }
  `)
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {
          <LargeImage
            image={data.strapiLargeimages.picture.childImageSharp.fixed.src}
          />
        }

        <Header
          brand={data.site.siteMetadata.title}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 400,
            color: "white",
          }}
        />
        <Grid container spacing={3} alignItems="center" justify="center">
          <Grid item xs={12}>
            <Box justifyContent="center">
              <div
                className={
                  typeof noRaise == "undefined" || noRaise == false
                    ? classNames(classes.main, classes.mainRaised)
                    : classNames(classes.main)
                }
              >
                <main>{children}</main>
              </div>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center" justify="center">
          <Grid item xs={4}>
            <Box display="flex" justifyContent="center" p={1} m={1}>
              © {new Date().getFullYear()} Casey Timm
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" justifyContent="center" p={1} m={1}>
              <Link to="/contact">Contact Me!</Link>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" justifyContent="center" p={1} m={1}>
              Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a> and{" "}
              <a href="http://strapi.io">Strapi</a>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
