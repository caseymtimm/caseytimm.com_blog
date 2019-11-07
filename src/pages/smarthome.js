import React from "react"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import useFetch from "../hooks/useFetch"
import { Divider, Container } from "@material-ui/core"

const Smarthome = () => {
  let lights = useFetch("http://cms.caseytimm.com/hubitat/lights", {
    count: "loading",
  })
  let lightson = useFetch("http://cms.caseytimm.com/hubitat/lightson", {
    count: "loading",
  })

  return (
    <Layout>
      <Typography variant="h1">My Smart Home</Typography>
      <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Divider />
      </Container>
      <Typography>
        Currently I have {lights.count} lights and {lightson.count} are on!
      </Typography>
    </Layout>
  )
}

export default Smarthome
