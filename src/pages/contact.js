import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Img from "gatsby-image"

import Layout from "../components/layout"

const Contact = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <Grid container>
        <Grid item>
          <Typography variant="h1">Contact Me!</Typography>
          <Img
            imgStyle={{ objectFit: "contain" }}
            fixed={data.strapiUser.Picture.childImageSharp.fixed}
          ></Img>
          <Typography variant="subtitle1">
            {data.strapiUser.FullName}
            <br />
            Email: {data.strapiUser.email}
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Contact

export const pageQuery = graphql`
  query largeimage {
    strapiUser(id: { eq: "User_1" }) {
      id
      email
      FullName
      Picture {
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`
