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

  let hvac = useFetch("http://cms.caseytimm.com/hubitat/hvac", {
    "DeviceWatch-DeviceStatus": "loading",
    coolingSetpoint: "loading",
    deviceAlive: "loading",
    deviceTemperatureUnit: "F",
    heatingSetpoint: "loading",
    humidity: "loading",
    maxCoolingSetpoint: "loading",
    maxHeatingSetpoint: "loading",
    minCoolingSetpoint: "loading",
    minHeatingSetpoint: "loading",
    resumeProgram: "loading",
    schedule: "loading",
    supportedThermostatFanModes: "loading",
    supportedThermostatModes: "loading",
    temperature: "loading",
    thermostat: "loading",
    thermostatFanMode: "loading",
    thermostatMode: "loading",
    thermostatOperatingState: "loading",
    thermostatSetpoint: "loading",
  })

  return (
    <Layout>
      <Typography variant="h1">My Smart Home</Typography>
      <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Divider />
      </Container>
      <Typography variant="h2">Lights</Typography>
      <Typography>
        Currently I have {lights.count} lights and {lightson.count} are on!
      </Typography>
      <Typography variant="h2">Thermostat</Typography>
      <Typography>
        My thermostat is set to {hvac.thermostatMode} with a setpoint of{" "}
        {hvac.thermostatMode === "heat"
          ? hvac.heatingSetpoint
          : hvac.coolingSetpoint}
        °{hvac.deviceTemperatureUnit}
      </Typography>
      <Typography>
        It is currently {hvac.temperature}°{hvac.deviceTemperatureUnit} with a
        relative humidity of {hvac.humidity}%
      </Typography>
    </Layout>
  )
}

export default Smarthome
