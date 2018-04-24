const transporter = require("./transporter");
const path = require("path");

const sendAwesomeMail = (to, from = "admin@madrid.com") => {
  transporter.sendMail({
    to,
    from,
    subject: "hola que tal",
    html: `<body style="font-family: 'Open Sans', sans-serif;font-size: 16px;">
    <header height="600" style="background-image: url(dog_welcome.jpg);background-size: cover;height: 600px;width: 100%;">
      <img src="http://res.cloudinary.com/dxsy5lr4t/image/upload/v1524590336/Logo.png" alt="logo">
    </header>
    <div>
      <p>Tu solicitud ha sido procesada y has sido dado de alta, puedes crear tu centro haciendo click en el siguiente enlace:
        <a href=""></a>
      </p>
    </div>
    </body>`
  });
};
module.exports = sendAwesomeMail;
