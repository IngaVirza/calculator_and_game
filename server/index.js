const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
  res.json({
    "date": "23.09.2021",
    "rate": "2.9"
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})