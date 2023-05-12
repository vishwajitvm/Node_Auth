const express = require("express");
const Router = express.Router();
const homeSchema = require("../model/homeSchema");

//Routes
Router.get("/", (req, res) => {
  res.render("register", {
    title: "Node Authentication",
    password: "",
    email: "",
  });
});

Router.get("/dashboard", async (req, res) => {
    const userdetails = req.query.result;
    const result = userdetails;
    res.render("dashboard", { result });
  });
     
//Register User
Router.post("/register", async (req, res) => {
  try {
    const { name, number, email, password, cpassword } = req.body;

    if (password === cpassword) {
      const userData = new homeSchema({
        name,
        number,
        email,
        password,
      });

      //Unique email check
      const useremail = await homeSchema.findOne({ email: email });
      if (useremail) {
        res.render("register", {
          title: "",
          password: "",
          email: `${useremail.email} is already taken`,
        });
      } else {
        await userData.save();
        res.render("register", {
          title:
            "Congratulations! Your registration has been successfully completed. Welcome to our community!",
          password: "",
          email: "",
        });
      }
    } else {
      res.render("register", {
        title: "",
        password: "Invalid password or password confirmation does not match!!",
        email: "",
      });
    }
  } catch (error) {
    res.render("register", {
      title: `Something went wrong while saving userdata into MongoDB`,
      password: "",
      email: "",
    });
  }
});

//Login User
Router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    //auth
    homeSchema
      .findOne({ email: email, password: password })
      .then((result) => {
        if (result) {
          console.log("Login successful. Email:", result.email);
          const userdetails = result;
          res.redirect(`/dashboard?result=${userdetails}`);
        } else {
            res.render("register", {
                title: "",
                password: "Wrong Credentials",
                email: "",
              });
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  });
  

module.exports = Router;
