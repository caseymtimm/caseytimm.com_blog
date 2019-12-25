import React, { useEffect } from "react"
import { Link } from "@reach/router"
import ReactMarkdown from "react-markdown"
import { Typography, Container } from "@material-ui/core"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import MediaBox from "./mediabox"
import Moment from "react-moment"

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
          <br />
          <Moment format="MM/DD/YY HH:mm">{post.updated_at}</Moment>
        </Typography>
        <ReactMarkdown
          source={post.Content}
          escapeHtml={false}
          renderers={{
            image: MediaBox,
            heading: ({ level, children }) => {
              switch (level) {
                case 1:
                  return <Typography variant="h4">{children}</Typography>
                case 2:
                  return <Typography variant="h5">{children}</Typography>
                case 3:
                  return <Typography variant="h6">{children}</Typography>
                case 4:
                case 5:
                case 6:
                default:
                  return <Typography variant="h6">{children}</Typography>
              }
            },
            paragraph: ({ children }) => (
              <Typography variant="body1">{children}</Typography>
            ),
          }}
        />
        <br />
      </Container>
      {/*</Layout>*/}
    </>
  )
}

export default Post
