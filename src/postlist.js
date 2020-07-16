import React from "react"
import { Grid } from "@material-ui/core"
import PostBox from "./postBox"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"

const POSTS = gql`
  {
    posts(sort: "id:desc", where: { Published: true }) {
      slug
      Title
      ShortText
      Image {
        url
      }
      Image_thumbnail {
        url
      }
    }
  }
`

const IndexPage = () => {
  const { loading, error, data } = useQuery(POSTS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
    <Grid container justify="center" spacing={2}>
      {data.posts.map((document, i) => {
        let { Title, ShortText, slug, Image, Image_thumbnail } = document
        return (
          <Grid key={Title + ShortText} item xs={12} lg={i % 3 === 0 ? 10 : 5}>
            <PostBox
              location={`/post/${slug}`}
              title={Title}
              shortText={ShortText}
              image={
                Image_thumbnail
                  ? `https://cms2.caseytimm.com${Image_thumbnail.url}`
                  : Image
                  ? `https://cms2.caseytimm.com${Image.url}`
                  : undefined
              }
            ></PostBox>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default IndexPage
