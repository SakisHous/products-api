const app = require('./index')
const PORT = 3000

app.listen(PORT, () =>{
  console.log(`Listening on PORT ${PORT}, http://localhost:${PORT}`)
})