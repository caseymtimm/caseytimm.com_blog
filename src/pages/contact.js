import React from "react"
import Grid from "@material-ui/core/Grid"
import Img from "gatsby-image"

import Layout from "../components/layout"

const Contact = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <Grid container>
        <Grid item>
          <h1>Contact Me!</h1>
          <Img
            imgStyle={{ objectFit: "contain" }}
            fixed={data.strapiPicture.picture.childImageSharp.fixed}
          ></Img>
          <p>
            Casey Timm
            <br />
            Email: Casey.m.Timm@gmail.com
          </p>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Contact

export const pageQuery = graphql`
  query MyQuery {
    strapiPicture(id: { eq: "Picture_1" }) {
      id
      picture {
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`
