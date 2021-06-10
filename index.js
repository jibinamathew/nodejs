const http = require('http');
const port = process.env.PORT || 4000

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  const msg = 'Hello Node 12345!\n'
  const image = <img src=${user.https://static.india.com/wp-content/uploads/2015/11/089-414x246.jpg}/>
  res.end(msg);
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});


