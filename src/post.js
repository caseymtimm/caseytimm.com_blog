import React, { useEffect } from "react"
import { Link } from "@reach/router"
import ReactMarkdown from "react-markdown"
import { Typography, Container } from "@material-ui/core"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import MediaBox from "./mediabox"

const POST = gql`
  query Post($post: ID!) {
    post(id: $post) {
      ShortText
      slug
      Title
      Image {
        url
      }
      Content
      user {
        FullName
      }
      created_at
      updated_at
    }
  }
`

const Post = ({ id, setImage }) => {
  const { loading, error, data } = useQuery(POST, {
    variables: { post: id },
  })

  useEffect(() => {
    if (data)
      setImage(
        data.Image !== "undefined"
          ? `https://cms.caseytimm.com${data.post.Image.url}`
          : undefined
      )
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <>
      {/*<Layout
      largeImage={
        data.Image !== "undefined"
          ? `https://cms.caseytimm.com${data.post.Image.url}`
          : undefined
      }
      coverPrecent={25}
    >*/}
      <Container flex>
        <Typography variant="h1" paragraph>
          {data.post.Title}
        </Typography>
        <Typography variant="subtitle">{data.post.ShortText}</Typography>
        <Typography paragraph variant="subtitle">
          by{" "}
          <Link to={`/authors/User_${data.post.user.FullName}`}>
            {data.post.user.FullName}
          </Link>
          {` at ${data.post.created_at}`}
          {data.post.created_at !== data.updated_at
            ? ` and updated at ${data.post.updated_at}`
            : ""}
        </Typography>
        <ReactMarkdown
          source={data.post.Content}
          escapeHtml={false}
          renderers={{ image: MediaBox }}
        />
        <br />
      </Container>
      {/*</Layout>*/}
    </>
  )
}

export default Post
