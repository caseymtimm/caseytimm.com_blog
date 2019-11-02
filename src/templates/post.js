import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"
import { Box, Typography } from "@material-ui/core"

const PostTemplate = ({ data }) => (
  <Layout>
    <Box display="flex" justifyContent="center">
      <Img fixed={data.strapiPost.Image.childImageSharp.fixed} />
    </Box>
    <Typography variant="h2">{data.strapiPost.Title}</Typography>
    by{" "}
    <Link to={`/authors/User_${data.strapiPost.user.id}`}>
      {data.strapiPost.user.username}
    </Link>
    <ReactMarkdown source={data.strapiPost.Content} />
  </Layout>
)

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
