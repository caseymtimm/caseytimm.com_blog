/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles"
import { orange } from "@material-ui/core/colors"
import Header from "./header/header.js"
import "./layout.css"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import { Grid, Container, Box } from "@material-ui/core"
import LargeImage from "./header/LargeImage"

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "dark",
      primary: orange,
    },
  })
)

const Layout = ({ children }) => {
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
            original {
              src
            }
          }
        }
      }
    }
  `)
  console.log(theme)
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {
          <LargeImage
            image={data.strapiLargeimages.picture.childImageSharp.original.src}
          />
        }

        <Header
          brand={data.site.siteMetadata.title}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 400,
            color: theme.palette.background.default,
          }}
        />
        <Grid container spacing={3} alignItems="center" justify="center">
          <Grid item xs={12}>
            <Box justifyContent="center">
              <Container style={{ position: "relative", zIndex: "3" }}>
                <Paper>{children}</Paper>
              </Container>
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
