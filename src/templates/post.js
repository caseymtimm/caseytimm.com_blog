import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"
import { Box, Typography, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  mainImage: {
    display: "flex",
    border: "0",
    borderRadius: "6px",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: "#555",
    width: "100%",
    backgroundColor: "#fff",
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    position: "relative",
    zIndex: "unset",
  },
})

const PostTemplate = ({ data }) => {
  const classes = useStyles()
  return (
    <Layout>
      <Grid container>
        <Grid xs="3" />
        <Grid xs="6">
          <Typography variant="h1" paragraph>
            {data.strapiPost.Title}
          </Typography>
          <Typography variant="subtitle">
            {data.strapiPost.ShortText}
          </Typography>
          <Typography variant="subtitle" paragraph>
            by{" "}
            <Link to={`/authors/User_${data.strapiPost.user.id}`}>
              {data.strapiPost.user.username}
            </Link>
          </Typography>
        </Grid>
        <Grid xs="3" />
        <Grid xs="12">
          <Box display="flex" justifyContent="center">
            <Img
              fixed={data.strapiPost.Image.childImageSharp.fixed}
              className={classes.mainImage}
            />
          </Box>
        </Grid>
        <Grid xs="1" />
        <Grid xs="10">
          <ReactMarkdown source={data.strapiPost.Content} />
        </Grid>
        <Grid xs="1" />
      </Grid>
    </Layout>
  )
}

export default PostTemplate

export const query = graphql`
  query PostTemplate($id: String!) {
    strapiPost(id: { eq: $id }) {
      Title
      ShortText
      Content
      Image {
        childImageSharp {
          fixed(width: 500) {
            base64
            width
            height
            src
            srcSet
          }
        }
      }
      user {
        id
        username
      }
    }
  }
`
