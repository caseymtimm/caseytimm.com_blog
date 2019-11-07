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
import Img from "gatsby-image"
import useWindowSize from "@rooks/use-window-size"

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "dark",
      primary: orange,
    },
  })
)

const Layout = props => {
  let { children, largeImage, coverPrecent } = props
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
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
              aspectRatio
            }
          }
        }
      }
    }
  `)
  const { outerWidth } = useWindowSize()
  let image =
    typeof largeImage === "undefined"
      ? data.strapiLargeimages.picture.childImageSharp.fluid
      : largeImage

  console.log({
    outerWidth,
    coverPrecent,
    ratio: image.aspectRatio,
    height: `-${(outerWidth * (coverPrecent / 100)) / image.aspectRatio}px`,
  })
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {<Img style={{ marginTop: "100px" }} fluid={image} />}

        <Header
          brand={data.site.siteMetadata.title}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 50,
            color: theme.palette.background.default,
          }}
        />
        <Grid container spacing={3} alignItems="center" justify="center">
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Box justifyContent="center">
              <Container
                style={{
                  position: "relative",
                  zIndex: "3",
                  marginTop: `-${(outerWidth * (coverPrecent / 100)) /
                    image.aspectRatio}px`,
                }}
              >
                <Paper>{children}</Paper>
              </Container>
            </Box>
          </Grid>
          <Grid item xs={1} />
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
