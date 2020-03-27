var express = require('express');
var router = express.Router();
var model_task = require('../model/model_task')
var isAuth= require('../middleware/AuthMiddleware');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tasks',isAuth.isAuth, function (req, res, next) {
  // model_task.find({}, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.json(data)
  //   }
  // })
  model_task.find({}).then(data=>{
    res.json(data)
  }).catch(errr=>{
    res.json(err)
  })
});

router.get('/tasks/:keyword',isAuth.isAuth, function (req, res, next) {
  const { keyword } = req.params;
  console.log(keyword);
  model_task.find({ $text: { $search: keyword } }).then((data) => {

    res.send(data)
  }).catch((err) => {
    res.send(err)
  })
})

router.post('/tasks', isAuth.isAuth,(req, res, next) => {
  console.log(req.body)
  var temp = {
    title: req.body.title,
    description: req.body.description,
    status: parseInt(req.body.status)
  }
  var data = new model_task(temp)
  data.save().then(() => {
    model_task.find({}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data)
      }
    })
  });
})
router.put('/tasks',isAuth.isAuth,(req, res, next)=>{

  var id = req.body._id;
  model_task.findById(id)
  .then(
    (data)=>{
      data.title= req.body.title;
      data.description = req.body.description;
      data.status = parseInt(req.body.status)
      data.save();
      res.send("Edit successfully!")
    }

  )
  .catch((err)=>{
    throw err;
  })
})
router.delete('/tasks/:id',isAuth.isAuth, async (req, res, next) => {

  var id = req.params.id;
  try{
    await model_task.findByIdAndRemove(id)
    const temp2 = await model_task.find({})
    res.send(temp2)
  }catch(e){
    res.send(e)
  }
  
  
  
  //res.send(req.params);
})
// router.delete('/tasks/:id', (req, res, next) => {

//   var id = req.params.id;
//   model_task.findByIdAndRemove(id)
//   .then(res => model_task.find({}))
//   .then(data =>{
//     res.send(data)
//   })
//   .catch(E=>{
//     throw E;
//   })
  
  
//   //res.send(req.params);
// })

module.exports = router;
