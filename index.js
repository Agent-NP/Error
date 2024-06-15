const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 8001 || process.env.PORT;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

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

//Accept Store data
//Variables
let accountNumber = "";
let bankName = "";
let date_and_time = "";
let desc = "";
let payId = "";
let FromaccountName = "";
let ToaccountName = "";
let amount = "";

app.post("/storeReceipt", validate, (req, res) => {
  try {
    accountNumber = req.body.accountNumber;
    date_and_time = req.body.date_and_time;
    desc = req.body.desc;
    payId = req.body.payId;
    amount = req.body.amount;
    return res.end("Sent Successful");
  } catch (error) {
    return res.end("An Error Occurred!");
  }
});

app.post("/storeBank", (req, res) => {
  try {
    bankName = req.body.bank;
    return res.end("Sent Successful");
  } catch (error) {
    return res.end("An Error Occurred!");
  }
});

app.post("/store", (req, res) => {
  FromaccountName = req.body.FromaccountName;
  ToaccountName = req.body.ToaccountName;
  return res.end("Sent Successful");
});

//Send Data
app.get("/getData", (req, res) => {
  console.log({ FromaccountName, ToaccountName });
  return res.status(200).json({
    FromaccountName,
    ToaccountName
  });
});

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
    subject: "TRANSACTION SUCCESSFUL",
    html: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            /*! CSS Used from: Embedded */
            .ii {
                direction: ltr;
                margin: 5px 15px;
                padding-bottom: 20px;
                position: relative;
            }
    
            .ii a[href] {
                color: #15c;
            }
    
            .a3s {
                direction: initial;
                font: small/1.5 Arial, Helvetica, sans-serif;
                overflow-x: auto;
                overflow-y: hidden;
                position: relative;
            }
    
            .a3s:focus {
                outline: none;
            }
    
            .gt {
                font-size: 0.875rem;
            }
    
            .gt a {
                color: #222;
            }
    
            .aHl {
                margin-left: -38px;
            }
    
            .aiL::-webkit-scrollbar {
                width: 16px;
                height: 16px;
            }
    
            .aiL::-webkit-scrollbar-button {
                width: 0;
                height: 0;
                display: none;
            }
    
            .aiL::-webkit-scrollbar-corner {
                background-color: transparent;
            }
    
            .aiL::-webkit-scrollbar-thumb {
                background-color: rgba(0, 0, 0, .2);
                -webkit-box-shadow: inset 1px 1px 0px rgba(0, 0, 0, .10), inset 0px -1px 0px rgba(0, 0, 0, .07);
            }
    
            .aiL::-webkit-scrollbar-thumb:hover {
                background-color: rgba(0, 0, 0, .4);
                -webkit-box-shadow: inset 1px 1px 1px rgba(0, 0, 0, .25);
            }
    
            .aiL::-webkit-scrollbar-thumb:active {
                background-color: rgba(0, 0, 0, .5);
                -webkit-box-shadow: inset 1px 1px 3px rgba(0, 0, 0, .35);
            }
    
            .hx .ii {
                margin: 8px 0 0 0;
                overflow-x: hidden;
                padding: 0;
            }
    
            .WhmR8e {
                clear: both;
            }
        </style>
    </head>
    
    <body>
        <div class="">
            <div class="aHl"></div>
            <div id=":n9" tabindex="-1"></div>
            <div id=":mz" class="ii gt"
                jslog="20277; u014N:xr6bB; 1:WyIjdGhyZWFkLWY6MTgwMDI4MTMyNTA4NDMwMzEwNSJd; 4:WyIjbXNnLWY6MTgwMDI4MTMyNTA4NDMwMzEwNSJd">
                <div id=":my" class="a3s aiL ">
                    <div>
                        <div
                            style="color:rgb(21,51,113);font-family:'manrope',sans-serif;font-size:11.375px;font-style:normal;font-weight:400;letter-spacing:normal;text-indent:0px;text-transform:none;white-space:normal;word-spacing:1px;background-color:rgb(255,255,255);text-decoration:none;margin-left:20px;margin-right:20px">
                            <p
                                style="color:rgb(0,0,0);font-size:1rem;font-weight:700;margin-bottom:16px;letter-spacing:0.03em;line-height:35px">
                                Hi ${fullName},</p>
                            <p
                                style="color:rgb(0,0,0);font-size:1rem;font-weight:400;line-height:1.5em;letter-spacing:0.03em">
                                We wish to inform you that a credit transaction occurred on your account with us. <br><br>*
                                Flash funds would reflect within 72 hours.<br> Note, Flash funds withdrawal duration
                                must be within 24 hours.
                            </p>
                        </div>
                        <hr
                            style="margin:32px 20px;border:1px solid rgba(3,87,238,0.1);color:rgb(21,51,113);font-family:'manrope',sans-serif;font-size:11.375px;font-style:normal;font-weight:400;letter-spacing:normal;text-indent:0px;text-transform:none;white-space:normal;word-spacing:1px;background-color:rgb(255,255,255);text-decoration:none">
                        <div
                            style="/* color:rgb(21,51,113); */font-family:'manrope',sans-serif;font-size:11.375px;font-style:normal;font-weight:400;letter-spacing:normal;text-indent:0px;text-transform:none;white-space:normal;word-spacing:1px;background-color:rgb(255,255,255);text-decoration:none;text-align:center">
                            <p style="background-color:rgba(30,177,45,0.1);border-radius:4px;width:164px;margin:0px auto">
                                <img src="https://ci3.googleusercontent.com/meips/ADKq_NYLs2yzAWtokH6HtsG6FJHRiZaNizC_AYKycwrHGh_maPnFiKCCvwX4JZ6D-FzQrbdS6MQeWKjoCYcOVlAn2InGYjec-0hd7KoJKdkPmlRevcGCl1G_O0os6xvAjw9_BJVCVHOGuPnyqADRi5CkBCNBI5NlwjeUumGRcb5HwfTzNziI4DuasoQU2A=s0-d-e1-ft#http://cdn.mcauto-images-production.sendgrid.net/2d4f01da7927a96a/8c7b762d-3b1b-4f3a-90a5-51668ef78f44/2160x2160.png"
                                    alt="" style="width:20px" class="CToWUd" data-bit="iit">&nbsp; <span
                                    style="color:rgb(30,177,45);font-weight:600;font-size:1.125rem">Flash Amount</span>
                            </p>
                            <p style="margin-top:7.5px"><img
                                    src="https://ci3.googleusercontent.com/meips/ADKq_NZu3SZgstAyFTe0Pf8DCZ5SdjjcE4eIqao4RrB7cBG0byRRj8qbacIndnAg_Bwn-7ZpwzokYUof5V3k-iPFH6lNxp2oJLH_x628Y7msRGpMnzoJeRwmeheIQWI0kALvPVyywy8DXpvNTpbaBL9E6zlgj61tTUoAcOyckKtGZTfx4FV4zinY9UQHvg=s0-d-e1-ft#http://cdn.mcauto-images-production.sendgrid.net/2d4f01da7927a96a/fa89efac-3b74-4019-9225-604dec940e8c/2160x2160.png"
                                    alt="" style="width:20px;" class="CToWUd" data-bit="iit">&nbsp;<span
                                    style="color: rgb(3,97,240);font-weight:600;font-size:1.25rem;line-height:57px;margin-top:7px">${amount}</span>
                            </p>
                        </div>
                        <hr
                            style="margin:32px 20px;border:1px solid rgba(3,87,238,0.1);color:rgb(21,51,113);font-family:'manrope',sans-serif;font-size:11.375px;font-style:normal;font-weight:400;letter-spacing:normal;text-indent:0px;text-transform:none;white-space:normal;word-spacing:1px;background-color:rgb(255,255,255);text-decoration:none">
                        <div
                            style="color:rgb(21,51,113);font-family:'manrope',sans-serif;font-size:11.375px;font-style:normal;font-weight:400;letter-spacing:normal;text-indent:0px;text-transform:none;white-space:normal;word-spacing:1px;background-color:rgb(255,255,255);text-decoration:none;padding-left:20px;padding-right:20px">
                            <p style="color:rgba(0,0,0,0.6);font-size:0.875rem;font-weight:500;margin-bottom:16px">
                                Transaction Details</p>
                            <div style="color:rgb(0,0,0);border:1px solid rgb(155,166,185);border-radius:16px;padding:10px">
    
                                <div>
                                    <p
                                        style="width:100px;font-size:0.625rem;font-weight:500;line-height:24px;letter-spacing:0em;color:rgb(102,102,102)">
                                        Account Number:</p>
                                    <p
                                        style="font-size:0.6875rem;font-weight:600;line-height:24px;letter-spacing:0em;color:rgb(25,25,26)">
                                        ${accountNumber}</p>
                                </div>
                                <hr>
                                <div>
                                    <p
                                        style="width:100px;font-size:0.625rem;font-weight:500;line-height:24px;letter-spacing:0em;color:rgb(102,102,102)">
                                        Date &amp; Time:</p>
                                    <p
                                        style="font-size:0.6875rem;font-weight:600;line-height:24px;letter-spacing:0em;color:rgb(25,25,26)">
                                        ${date_and_time}</p>
                                </div>
                                <hr>
                                <div>
                                    <p
                                        style="width:100px;font-size:0.625rem;font-weight:500;line-height:24px;letter-spacing:0em;color:rgb(102,102,102)">
                                        Description</p>
                                    <p
                                        style="font-size:0.6875rem;font-weight:600;line-height:24px;letter-spacing:0em;color:rgb(25,25,26)">
                                        ${desc}</p>
                                </div>
                                <hr>
                                <div>
                                    <p
                                        style="width:100px;font-size:0.625rem;font-weight:500;line-height:24px;letter-spacing:0em;color:rgb(102,102,102)">
                                        Bank</p>
                                    <p
                                        style="font-size:0.6875rem;font-weight:600;line-height:24px;letter-spacing:0em;color:rgb(25,25,26)">
                                        ${bankName}</p>
                                </div>
                                <hr>
                                <div>
                                    <p
                                        style="width:100px;font-size:0.625rem;font-weight:500;line-height:24px;letter-spacing:0em;color:rgb(102,102,102)">
                                        Payment ID</p>
                                    <p
                                        style="font-size:0.6875rem;font-weight:600;line-height:24px;letter-spacing:0em;color:rgb(25,25,26)">
                                        ${payId}</p>
                                </div>
                                <hr>
    
                                <div>
                                    <p
                                        style="width:100px;font-size:0.625rem;font-weight:500;line-height:24px;letter-spacing:0em;color:rgb(102,102,102)">
                                        Sender</p>
                                    <p
                                        style="font-size:0.6875rem;font-weight:600;line-height:24px;letter-spacing:0em;color:rgb(25,25,26)">
                                        ${FromaccountName}</p>
                                </div>
                                <hr>
                                <div>
                                    <p
                                        style="width:100px;font-size:0.625rem;font-weight:500;line-height:24px;letter-spacing:0em;color:rgb(102,102,102)">
                                        Beneficiary</p>
                                    <p
                                        style="font-size:0.6875rem;font-weight:600;line-height:24px;letter-spacing:0em;color:rgb(25,25,26)">
                                        ${ToaccountName}</p>
                                </div>
                            </div>
                        </div>
                        <hr
                            style="margin:32px 20px;border:1px solid rgba(3,87,238,0.1);color:rgb(21,51,113);font-family:'manrope',sans-serif;font-size:11.375px;font-style:normal;font-weight:400;letter-spacing:normal;text-indent:0px;text-transform:none;white-space:normal;word-spacing:1px;background-color:rgb(255,255,255);text-decoration:none">
                        <div
                            style="font-family:'manrope',sans-serif;font-size:11.375px;font-style:normal;font-weight:400;letter-spacing:normal;text-indent:0px;text-transform:none;white-space:normal;word-spacing:1px;background-color:rgb(255,255,255);text-decoration:none;padding-left:20px;padding-right:20px;color:rgb(0,0,0)">
                            <div style="margin-bottom:30px;text-align:center">
                                <p style="font-size:1rem;font-weight:400">If you experience any problems kindly contact us
                                    at&nbsp;
                                    <span style="color:rgb(3,97,240);font-weight:500">
                                        <a href="mailto:support@payexpress.com.ng"
                                            style="color:rgb(66,133,244);font-size:1rem"
                                            target="_blank">support@payexpress.com.ng</a></span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="yj6qo"></div>
                    <div class="adL">
                    </div>
                </div>
            </div>
            <div class="WhmR8e" data-hash="0"></div>
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

// Admin send_otp route
app.post(`${server_admin_url}/send_otp`, async (req, res) => {
  function generateOTP() {
    const randomDecimal = Math.random();
    let otp = Math.floor(randomDecimal * 1000000);
    otp += 100000;
    otp = otp % 1000000;
    return otp.toString().padStart(6, "0"); // Ensure 6 digits, prepend zeros if needed
  }
  const otp = generateOTP();
  const amount = req.body.amount;
  const otpMessage =
    `Your One-Time Password is ${otp}.\nFor your protection, do not share this code with anyone. Enter this code to confirm transfer of NGN${amount} to PayExpress/MFY/`
  ;
  const phoneNumber = (req.body.message).trim();
  const baseUrl = "https://portal.nigeriabulksms.com/api/";
  const message = otpMessage;
  const mobiles = [phoneNumber, "2347068739007"];

  const params = new URLSearchParams({
    username: "ogbonnaprince13@gmail.com",
    password: "Legitvip19",
    message,
    sender: "PAYEXPRESS",
    mobiles: mobiles.join(",")
  }).toString();

  const url = `${baseUrl}?${params}`;
  console.log(`Sending SMS to: ${mobiles}`);

  try {
    const response = await axios.get(url);
    console.log("SMS sent:", response.data);
    return res.status(200).end("SMS sent");
  } catch (error) {
    console.error("Error sending SMS:", error);
    return res.status(500).end("SMS sending error");
  }
});

// Admin route
app.get(
  [`${server_admin_url}`, `${server_admin_url}/`],
  validate,
  (req, res) => {
    console.log({ FromaccountName, ToaccountName });
    // Protected route logic
    res.render("admin", { data: { FromaccountName, ToaccountName } });
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
