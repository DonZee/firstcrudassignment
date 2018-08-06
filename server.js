let express = require('express');
let app = express();
let fs = require('fs');
const port = process.env.PORT || 8000;
let bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/users',function(req,res){
  let data = fs.readFileSync('./storage.json', 'utf8');
  let parsedData = JSON.parse(data);
  parsedData.push(req.body);
  fs.writeFileSync('./storage.json', JSON.stringify(parsedData));
  res.send('done');
});

app.get('/users',function(req,res){
  let data = fs.readFileSync('./storage.json', 'utf8');
  let parsedData = JSON.parse(data);
  res.json(parsedData);
});

app.get('users/:name',function(req,res){
  let data = fs.readFileSync('./storage.json', 'utf8');
  let parsedData = JSON.parse(data);
  let foundUser = parsedData.filter((item)=>{
    return item.name === req.params.name;
  });
    res.json(foundUser[0])
});

app.patch('users/:name',function(req,res){
  let data = fs.readFileSync('./storage.json', 'utf8');
  let parsedData = JSON.parse(data);
  let updatedData = parsedData.map((item)=>{
    if(item.name === req.params.name){
      return req.body;
    }else{
      return item;
    }
  });
    fs.writeFileSync('users/:name', JSON.stingify(updatedData));
    res.send('Updated');
});

app.delete('users/:nane',function(req,res){
  let data = fs.readFileSync('./storage.json', 'utf8');
  let parsedData = JSON.parse(data);
  let filteredData = parsedData.filter((item)=>{
    return item.name !== req.params.name
  });
  fs.writeFileSync('users/:name', JSON.stringify(filteredData));
  res.send('Deleted');
});





app.listen(port,function(){
  console.log('Listening on port ' + port)
});
