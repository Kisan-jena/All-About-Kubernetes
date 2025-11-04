import express from "express";

const app = express();
const port = 5173;

app.get('/', (req, res) => {
  res.json({
    messsage: "hello form a container",
    service: 'hello-node',
    pod: process.env.POD_NAME,
    time: new Date().toISOString()
  });
});

app.get('/ready', (req, res) => res.status(200).send('ready'))

app.get('/healthy', (req, res) => res.status(200).send('ok '));

app.listen(port, () => {
  console.log("app is ruuning on port 5173")
})