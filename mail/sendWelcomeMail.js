const transporter = require("./transporter");
const path = require("path");

const sendWelcomeMail = (to, from = "admin@madrid.com") => {
  transporter.sendMail({
    to,
    from,
    subject: "Bienvenido a Madrid Adopta",
    html: `<body style="font-family: 'Open Sans', sans-serif;font-size: 16px;">
    <header style="background-image: url(http://res.cloudinary.com/abdaio/image/upload/v1524566491/mascotas-header.jpg);background-size: cover;height: 400px;width: 100%;">
    <img src="http://res.cloudinary.com/dxsy5lr4t/image/upload/v1524590336/logo-solo.png" alt="logo" id="imgone" style="display: block;padding: 50px;float: left;">
    <img src="http://res.cloudinary.com/dxsy5lr4t/image/upload/v1524590336/logo-text.png" alt="logo" id="imgtwo" style="display: block;padding: 50px;float: right;">
    </header>
    <div id="content" style="max-width: 768px;height: 300px;margin: 0 auto;">
    <h1 style="text-align: center;font-weight: normal;color: #924992;">Bienvenido a Madrid Adopta</h1>
    <p>Tu solicitud ha sido procesada y has sido dado de alta, ya puedes crear tu centro haciendo click en
      <a href="http://localhost:3000/my-profile" style="font-weight: normal;color: #924992;">este enlace</a>
    </p>
    </div>
    <footer style="background-color: black;color: white;text-align: center;height: 100px;line-height: 100px;">
    <p>Copyright</p>
    </footer>
    </body>`
  });
};
module.exports = sendWelcomeMail;
