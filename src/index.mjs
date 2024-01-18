import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
  {id: 1, username:"jabir", displayName: "Jabir"},
  {id:2, username:"Kullow", displayName:"Kullow"},
  {id:3, username:"fade", displayName:"Fathe"},
  {id:4, username:"jason", displayName:"Jason"},
  {id:5, username:"henry", displayName:"Henry"},
  {id:6, username:"tina", displayName:"Tina"},
  {id:7, username:"marilyn", displayName:"Marilyn"}];

app.get('/', (req, res) => {
  res.send('<h3>Welcome home</h3>')
});
app.get('/api/users', (req, res) => {
  console.log(req.query);
  res.send(mockUsers)
});

app.get('/api/users/:id', (req, res) => {
  
  const parsedId = parseInt(req.params.id);
  
  if (isNaN(parsedId)) 
    return res.status(400).send({msg: "bad request"});

  const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

app.get('/api/products', (req,res) => {
  res.send([{id:123, name:"Tomato", price:345},])
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
});

