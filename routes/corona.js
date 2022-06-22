var express = require('express');
var router = express.Router();
const axios = require("axios");
/* GET home page. */
router.get('/', (req, res) => {

  res.render('corona', { title: 'Country Search' });
});

router.get('/:country', (req, res) => {
  let url = `https://coronavirus-19-api.herokuapp.com/countries?fbclid=IwAR12apyTstUwicIA8frJOFJfyHbwXrpU9TMMhWuYy1Rjj78Hzqb60f53YAs`;
  axios.get(url)
    .then(resp => {
      let searchQ = req.query.q;
      let myId = resp.data;  
          
      if (!(/^\d+$/.test(searchQ))) {
        let myAr = myId.filter(item => {
          return ((searchQ.toLowerCase() == item.country.toLowerCase()))
        });
        res.render('country', { _ar: myAr });


      }
      else {

              let myAr = myId.filter(item => {
                return ((searchQ < item.casesPerOneMillion))
              });
              res.render('country', { _ar: myAr });

            }

        });
      });

  



  module.exports = router;
