import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"
import { Typography, Container } from "@material-ui/core"

const PostTemplate = ({ data }) => {
  console.log(data.strapiPost)
  return (
    <Layout
      largeImage={
        data.strapiPost.Image !== "undefined"
          ? data.strapiPost.Image.childImageSharp.fluid
          : undefined
      }
      coverPrecent={25}
    >
      <Container flex>
        <Typography variant="h1" paragraph>
          {data.strapiPost.Title}
        </Typography>
        <Typography variant="subtitle">{data.strapiPost.ShortText}</Typography>
        <Typography paragraph variant="subtitle">
          by{" "}
          <Link to={`/authors/User_${data.strapiPost.user.id}`}>
            {data.strapiPost.user.username}
          </Link>
          {` at ${data.strapiPost.created_at}`}
          {data.strapiPost.updated_at !== data.strapiPost.created_at
            ? ` and updated at ${data.strapiPost.updated_at}`
            : ""}
        </Typography>
        <ReactMarkdown source={data.strapiPost.Content} />
        <br />
      </Container>
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
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      user {
        id
        username
      }
      updated_at(formatString: "MM-DD-YY HH:MM")
      created_at(formatString: "MM-DD-YY HH:MM")
    }
  }
`
