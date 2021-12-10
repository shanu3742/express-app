const express = require('express')
const cors =require('cors')
var axios = require('axios');
// const fetch = require('node-fetch');





const app = express()

const port =process.env.PORT||3001



//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var books = []

// function getdata(data){
//   console.log(data)
// }




 app.post('/create',async function(req, res) {
  const newBook = {
    BookID: req.body.bookID,
    Title: req.body.bookTitle,
    Author: req.body.bookAuthor,
  };
  // const result = await newBook
  books.push('shanu')
  console.log(newBook.BookID)
 
 
// getdata(newBook.BookID)

  // books.push(newBook);

  
const myData3 = (data) => {
  axios(
      'https://dashboards.eccenca.com/api/queries/' + newBook.BookID +'/results/' + data.job.query_result_id + '.json',
      {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Key X9kOSIuKSxSKGwZF3VT9H606cpnhzt4XTFdnoluE',
        },
      }
    ).then(
      response => {
          const data = response.data;
          console.log(data. query_result.data.rows)
          app.get('/api',(req,res) => {
              res.json({ message: JSON.stringify(data. query_result.data.rows) });
              
          })
         
          return data
        }
    ).catch(function (error) {
      
    });;
  
}



const myData = (data) => {
  axios('https://dashboards.eccenca.com/api/jobs/' + data.job.id, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Key X9kOSIuKSxSKGwZF3VT9H606cpnhzt4XTFdnoluE',
      },
    }).then(
      response => {
          const data = response.data;
          console.log(data)
         
          return data
        }
    ).then(myData3).catch(function (error) {
      console.log(error);
    });
  
  }

var data = JSON.stringify({
"parameters": {
  "ingredient": "<ccg:ing-sausages>",
  "cuisine": "FRENCH"
},
"max_age": 0
});

var config = {
method: 'post',
url: 'https://dashboards.eccenca.com/api/queries/'+ newBook.BookID +'/results',
headers: { 
  'Authorization': 'Key X9kOSIuKSxSKGwZF3VT9H606cpnhzt4XTFdnoluE', 
  'Content-Type': 'application/json'
},
data : data
};

axios(config)
.then(response => {
  const data = response.data;
  return data
}).then(myData)
.catch(function (error) {
console.log(error);
});


  
});
console.log(books)

    


// console.log(result)

app.listen(port,() =>console.log('hey listing to the port'))

