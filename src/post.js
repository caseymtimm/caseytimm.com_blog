import React, { useEffect, useState, useContext } from "react"
import { Link } from "@reach/router"
import ReactMarkdown from "react-markdown"
import { Typography, Container } from "@material-ui/core"
import { gql } from "apollo-boost"
import { useQuery, useMutation } from "@apollo/react-hooks"
import MediaBox from "./mediabox"
import Moment from "react-moment"
import ReactMde from "react-mde"
import "react-mde/lib/styles/css/react-mde-all.css"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { AuthContext } from "./authContext"

const POST = gql`
  query Post($where: JSON) {
    posts(limit: 1, where: $where, sort: "id:desc") {
      ShortText
      slug
      Title
      id
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

const UPDATEPOST = gql`
  mutation($id: ID!, $content: String!) {
    updatePost(input: { where: { id: $id }, data: { Content: $content } }) {
      post {
        ShortText
        slug
        Title
        id
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
  }
`

const MarkdownViewer = ({ content }) => (
  <ReactMarkdown
    source={content}
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
)

const Post = ({ slug, setImage }) => {
  const { authenticated } = useContext(AuthContext)
  const { loading, error, data } = useQuery(POST, {
    variables: {
      where: {
        slug,
      },
    },
  })

  const [markdown, setMarkdown] = useState("")
  const [edit, setEdit] = useState(false)
  const [selectedTab, setSelectedTab] = React.useState("write")
  const [updatePost, { mutatedData }] = useMutation(UPDATEPOST)

  const post = data ? data.posts[0] : undefined

  useEffect(() => {
    if (data) {
      setImage(
        post.Image !== "undefined"
          ? `https://cms.caseytimm.com${post.Image.url}`
          : undefined
      )
      setMarkdown(post.Content)
    }
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

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="subtitle">{post.ShortText}</Typography>
            <Typography paragraph variant="subtitle">
              by{" "}
              <Link to={`/authors/User_${post.user.FullName}`}>
                {post.user.FullName}
              </Link>
              <br />
              <Moment format="MM/DD/YY HH:mm">{post.updated_at}</Moment>
            </Typography>
          </Grid>

          <Grid item>
            {authenticated && (
              <FormGroup>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!edit}
                  onClick={() => {
                    updatePost({
                      variables: { content: markdown, id: post.id },
                    })
                  }}
                >
                  Save
                </Button>
                <FormControlLabel
                  control={
                    <Switch
                      checked={edit}
                      onChange={e => {
                        setEdit(e.currentTarget.checked)
                      }}
                      value="Edit"
                    />
                  }
                  label="Edit"
                />
              </FormGroup>
            )}
          </Grid>
        </Grid>

        {authenticated && edit ? (
          <ReactMde
            value={markdown}
            onChange={setMarkdown}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={markdown =>
              Promise.resolve(<MarkdownViewer content={markdown} />)
            }
          />
        ) : (
          <MarkdownViewer content={post.Content} />
        )}
        <br />
      </Container>
      {/*</Layout>*/}
    </>
  )
}

export default Post
