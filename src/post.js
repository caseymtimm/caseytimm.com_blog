import React, { useEffect } from "react"
import { Link } from "@reach/router"
import ReactMarkdown from "react-markdown"
import { Typography, Container } from "@material-ui/core"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import MediaBox from "./mediabox"

const POST = gql`
  query Post($where: JSON) {
    posts(limit: 1, where: $where, sort: "id:desc") {
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

const Post = ({ slug, setImage }) => {
  const { loading, error, data } = useQuery(POST, {
    variables: {
      where: {
        slug,
      },
    },
  })

  const post = data ? data.posts[0] : undefined

  useEffect(() => {
    if (data)
      setImage(
        post.Image !== "undefined"
          ? `https://cms.caseytimm.com${post.Image.url}`
          : undefined
      )
  }, [data, setImage])

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
          {post.Title}
        </Typography>
        <Typography variant="subtitle">{post.ShortText}</Typography>
        <Typography paragraph variant="subtitle">
          by{" "}
          <Link to={`/authors/User_${post.user.FullName}`}>
            {post.user.FullName}
          </Link>
          {` at ${post.created_at}`}
          {post.created_at !== post.updated_at
            ? ` and updated at ${post.updated_at}`
            : ""}
        </Typography>
        <ReactMarkdown
          source={post.Content}
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
