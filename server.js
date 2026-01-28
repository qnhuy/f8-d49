const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/cors')
const router = require('./routes/index')

const app = express()
const port = process.env.PORT || 3000

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api', router)
app.use((req, res) => {
  res.json({ message: `Cannot ${req.method} ${req.url}` })
})

app.listen(port, () => {
  console.log('listening on port ' + port)
})
