import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import withWidth from "@material-ui/core/withWidth"
import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import PostBox from "../components/postBox"

const useStyles = makeStyles({
  card: {
    height: 110,
    display: "flex",
  },
  content: {
    flex: "1 0 auto",
  },
  postImage: {
    wdith: 151,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
})

const IndexPage = ({ data, width }) => {
  const classes = useStyles()
  return (
    <Layout noRaise>
      <Grid container justify="center" spacing={2}>
        {data.allStrapiPost.edges.map((document, i) => {
          let { Title, ShortText } = document.node
          console.log(document.node)
          return (
            <Grid key={Title + ShortText} item xs={i % 3 === 0 ? 11 : 5}>
              <PostBox
                location={`/${document.node.id}`}
                title={Title}
                shortText={ShortText}
                image={document.node.Image.childImageSharp.fixed.src}
              ></PostBox>
            </Grid>
          )
        })}
      </Grid>
    </Layout>
  )
}

export default withWidth()(IndexPage)

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiPost {
      edges {
        node {
          Image {
            childImageSharp {
              fixed(background: "black", height: 110, quality: 100) {
                base64
                aspectRatio
                width
                height
                src
                srcSet
              }
            }
          }
          ShortText
          Title
          id
        }
      }
    }
  }
`
