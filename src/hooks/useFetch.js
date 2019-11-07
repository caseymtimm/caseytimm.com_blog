import React, { useState, useEffect } from "react"

export default function useFetch(url, defaultData) {
  const [data, updateData] = useState(defaultData)

  useEffect(async () => {
    const resp = await fetch(url)
    const json = await resp.json()
    updateData(json)
  }, [url])

  return data
}
