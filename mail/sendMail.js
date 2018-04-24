const transporter = require("./transporter");
const path = require("path");


const sendAwesomeMail = (to, from = "admin@madrid.com") => {
  transporter.sendMail({
    to, 
    from,
    subject: "hola que tal", 
    text: "hola que ase",
    html: `<b>holaquease</b>`
  })

};
module.exports = sendAwesomeMail;