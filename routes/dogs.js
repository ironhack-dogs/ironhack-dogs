const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Dog = require("../models/Dog");
const Center = require("../models/Center");
const moment = require('moment');


// Create new dog

<<<<<<< HEAD
router.get("/new", (req, res, next) => {
  Center.findOne({'admin_id':req.user.id})
  .then(centerData => {
    res.render("dogs/new", {centerData});
  });
});

router.post("/new", (req, res, next) => {
  const { name, breed, gender, birthday, size, color, hair, description, center } = req.body;
  const  dog = new Dog({ name, breed, gender, birthday, size, color, hair, description,center });
  dog.save().then(dog => {
  
    res.redirect("/dogs");
  })
  .catch(e => next(e))
});


// Edit dog

router.get("/edit/:id", (req, res, next) => {
  Dog.findById(req.params.id)
  .then(dogData => {  
    dogData.formatedDate =  moment(dogData.birthday).format('YYYY-MM-DD');
    res.render("dogs/edit", {dogData});
  });
});

router.post("/edit/:id", (req, res, next) => {
    const { name, breed, gender, birthday, size, color, hair, description } = req.body;
    const updates = { name, breed, gender, birthday, size, color, hair, description};
    Dog.findByIdAndUpdate(req.params.id, updates).then(() => {
      res.redirect(`/dogs/${req.params.id}`);
    });
  });


// Dog index and Dog profile

=======
//Mostrar todos los perros
>>>>>>> e36e648f16fd79347f8421b5c71ce2a42e696235
router.get("/", (req, res, next) => {
  Dog.find().then(dogs => {
    res.render("dogs/index", { user: req.user, dogs });
  });
});

//Mostrar un perro en concreto
router.get("/:id", (req, res, next) => {
  Dog.findById(req.params.id)
    .populate("center")
    .then(dogData => {
      res.render("dogs/profile", { dogData });
    });
});

<<<<<<< HEAD
 
module.exports = router;
=======
//Filtrar busqueda de perros
router.post("/search", (req, res, next) => {
  const { breed, gender, size } = req.body;
  if (breed === "") {
    Dog.find({
      gender: gender,
      size: size
    }).then(dogs => res.render("dogs/index", { user: req.user, dogs }));
  } else {
    Dog.find({
      breed: breed,
      gender: gender,
      size: size
    }).then(dogs => res.render("dogs/index", { user: req.user, dogs }));
  }
});

// Crear un perro
router.get("/new", (req, res, next) => {
  Center.findOne({ admin_id: req.user.id }).then(centerData => {
    console.log(centerData);
    res.render("dogs/new", { centerData });
  });
});

router.post("/new", (req, res, next) => {
  const {
    name,
    breed,
    gender,
    birthday,
    size,
    color,
    hair,
    description,
    center
  } = req.body;
  const dog = new Dog({
    name,
    breed,
    gender,
    birthday,
    size,
    color,
    hair,
    description,
    center
  });
  dog
    .save()
    .then(dog => {
      res.redirect("/dogs");
    })
    .catch(e => next(e));
});

module.exports = router;
>>>>>>> e36e648f16fd79347f8421b5c71ce2a42e696235
