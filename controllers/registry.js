const express = require('express');
const app = express();
const router = express.Router();
const Registry = require('../models/registry.js')

// Make custom middleware to check for session/logged in user
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

// New route is connected to create. Create has the functionalilty
router.get('/new', (req, res)=>{
    res.render('new.ejs')
});

// EDIT
router.get('/:id/edit', (req, res) => {
  Registry.findById(req.params.id, (error, foundRegistry) => {
    res.render('edit.ejs', {
      registry: foundRegistry,

    })
  })
})

// DELETE
router.delete('/:id', (req, res) => {
  registry.findByIdAndRemove(req.params.id, (err, deletedRegistry) => {
    res.redirect('/registry')
  })
})

// SHOW
//longhand way
router.get('/registry/:id', (req, res) => {
  Registry.findById(req.params.id, (error, foundRegistry) => {
      res.render('show.ejs', {
        registry: foundRegistry,
      })
    })
  }
)

// UPDATE
// router.put('/:id', (req, res) => {
//   Registry.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true },
//     (error, updatedModel) => {
//       res.redirect('/registry')
//     }
//   )
// })

// CREATE
router.post('/registry', (req, res) => {
  Registry.create(req.body, (error, createdRegistry) => {
    console.log(error);
    res.redirect('/registry')
  })
})

// INDEX
router.get('/', (req, res) => {
  Registry.find({}, (error, allRegistry) => {
    res.render('index.ejs', {
      registry: allRegistry,

    })
  })
})

// // Drop DB Route
// router.get(
//   '/dropdatabase/cannotundo/areyoursure/reallysure/okthen',
//   (req, res) => {
//     Registry.collection.drop()
//     res.send('You did it! You dropped the database!')
//   }
// )

module.exports = router;
