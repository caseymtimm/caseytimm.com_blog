import React from "react"
import { Link, graphql, Image } from "gatsby"
import Layout from "../components/layout"
import withWidth from "@material-ui/core/withWidth"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { Grid } from "@material-ui/core"

const useStyles = makeStyles({
  card: {
    //width: 250,
  },
  media: {
    height: 100,
  },
})

const IndexPage = ({ data, width }) => {
  const classes = useStyles()
  return (
    <Layout>
      <Grid container justify="center" spacing={2}>
        {data.allStrapiPost.edges.map((document, i) => {
          console.log(document.node.Image.childImageSharp)
          return (
            <Grid item xs={i % 3 == 0 ? 11 : 5}>
              <Card className={classes.card}>
                <CardActionArea>
                  <Link
                    to={`/${document.node.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <CardMedia
                      component={Image}
                      className={classes.media}
                      image={document.node.Image.childImageSharp.fixed.src}
                      title={document.node.Title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {document.node.Title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {document.node.ShortText}
                      </Typography>
                    </CardContent>
                  </Link>
                </CardActionArea>
              </Card>
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
              fixed {
                src
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
