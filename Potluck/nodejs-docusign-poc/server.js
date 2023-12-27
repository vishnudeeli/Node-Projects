const express = require('express');
const bodyParser = require('body-parser');
const connection= require('./db')
const PDFDocument = require('pdfkit');
const fs = require('fs');
const cors = require('cors'); 
const path = require("path");
//const demoDocsPath = "D:/nodeJs/nodejs-docusign-poc/pdfs/user_${userId}.pdf"
var userIds = ['1','2','3','4','5'];
// Loop through the user IDs and generate embed tags
for (var i = 0; i < userIds.length; i++) {
  var userId = userIds[i];
  var demoDocsPath = `D:/Potluck/nodejs-docusign-poc/pdfs/user_${userId}.pdf`;
}

const docusign = require("docusign-esign");
const dotenv = require("dotenv");
dotenv.config();

const session = require("express-session");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret:"dfetsghs34864",
  resave:true,
  saveUninitialized:true
}));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



app.post('/users', (req, res) => {
  const { name, email, company, job_description, project, role } = req.body;

  const insertQuery = `INSERT INTO users (name, email, company, job_description, project, role) 
                       VALUES (?, ?, ?, ?, ?, ?)`;

  const selectQuery = `SELECT * FROM users WHERE id = ?`;

  connection.query(insertQuery, [name, email, company, job_description, project, role], (err, results) => {
    if (err) {
      console.error('Error saving user details: ', err);
      res.status(500).json({ error: 'Error saving user details' });
      return;
    }

    const userId = results.insertId;

    connection.query(selectQuery, [userId], (err, user) => {
      if (err) {
        console.error('Error retrieving user details: ', err);
        res.status(500).json({ error: 'Error retrieving user details' });
        return;
      }
res.setHeader(
  
    'Content-Type', 'application/json'
  )
      generatePDF(user[0], userId)
        .then(() => {
          res.json({ success: true, userId });
        })
        .catch((err) => {
          console.error('Error generating PDF: ', err);
          res.status(500).json({ error: 'Error generating PDF' });
        });
    });
  });
});

app.get('/users', (req, res) => {
  const selectQuery = `SELECT * FROM users`;

  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error retrieving users: ', err);
      res.status(500).json({ error: 'Error retrieving users' });
      return;
    }

    res.json(results);
  });
});

app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;

  const selectQuery = `SELECT * FROM users WHERE id = ?`;

  connection.query(selectQuery, [userId], (err, results) => {
    if (err) {
      console.error('Error retrieving user details: ', err);
      res.status(500).json({ error: 'Error retrieving user details' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user = results[0];
    res.json(user);
  });
});

app.get('/pdfs', (req, res) => {
  connection.query('SELECT pdf_data FROM pdfs', (err, results) => {
    if (err) {
      console.error('Error fetching PDFs from database: ', err);
      res.status(500).json({ error: 'Error fetching PDFs' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'PDFs not found' });
      return;
    }

    const pdfDataList = results.map((result) => result.pdf_data);

    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfDataList);
  });
});


app.get('/pdfs/:userId', (req, res) => {
  const userId = req.params.userId;

  connection.query('SELECT pdf_data FROM pdfs WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching PDF from database: ', err);
      res.status(500).json({ error: 'Error fetching PDF' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'PDF not found' });
      return;
    }

    const pdfData = results[0].pdf_data;

    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfData);
  });
});


app.get('/userpdfs', (req, res) => {
  const selectQuery = `SELECT pdfs.user_id,users.name, pdfs.pdf_data
                       FROM users
                       INNER JOIN pdfs ON users.id = pdfs.user_id`;

  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error retrieving user PDFs: ', err);
      res.status(500).json({ error: 'Error retrieving user PDFs' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'No PDFs found' });
      return;
    }

    // Create an array to hold the response objects
    const pdfs = [];

    // Iterate over the results and extract the name and pdf_data
    for (const result of results) {
      const pdf = {
        id: result.user_id,
        name: result.name,
        pdfData: result.pdf_data.toString('base64') // Convert the Buffer to base64 string
      };
      pdfs.push(pdf);
    }

    // Send the response as JSON with the array of PDFs
    res.json(pdfs);
  });
});

function generatePDF(user, userId) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
doc.pipe(fs.createWriteStream(`D:/NodejsApps/nodejs-docusign-poc/pdfs/user_${userId}.pdf`));
//D:\NodejsApps\nodejs-docusign-poc\pdfs

// Left-align user details
doc.font('Helvetica-Bold').fontSize(22).text('Offer Letter', { align: 'center', underline: true }).moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(14).text('Name:', { continued: true }).font('Helvetica').text(` ${user.name}`).moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(14).text('Email:', { continued: true }).font('Helvetica').text(` ${user.email}`).moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(14).text('Company:', { continued: true }).font('Helvetica').text(` ${user.company}`).moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(14).text('Job Description:', { continued: true }).font('Helvetica').text(` ${user.job_description}`).moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(14).text('Project:', { continued: true }).font('Helvetica').text(` ${user.project}`).moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(14).text('Role:', { continued: true }).font('Helvetica').text(` ${user.role}`).moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(14).text(`                      `).moveDown(1.5);
doc.font('Helvetica-Bold').fontSize(14).text('Date:', { continued: true }).font('Helvetica-Bold').text('                                                               Signature : ').moveDown(0.5);
doc.end();

    const buffers = [];
    doc.on('data', (chunk) => {
      buffers.push(chunk);
    });

    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);

      // Save the PDF into the MySQL database
      const insertPDFQuery = `INSERT INTO pdfs (user_id, pdf_data) VALUES (?, ?)`;
      connection.query(insertPDFQuery, [userId, pdfBuffer], (err) => {
        if (err) {
          console.error('Error saving PDF to database: ', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}



//for Authentication
async function checkToken(request){
  if(request.session.access_token && Date.now() < request.session.expires_at){
      console.log("re-using access token",request.session.access_token);
  }
  else{
      console.log("generating new access token");
  }
  let dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(process.env.BASE_PATH);
  //To use JWT from the Node.js SDK, make the following call
  const results = await dsApiClient.requestJWTUserToken(
      process.env.INTEGRATION_KEY, 
      process.env.USER_ID,
       "signature",
        fs.readFileSync(path.join(__dirname,"private.key")), 
        3600
        );
        console.log(results.body);
        request.session.access_token=results.body.access_token;
        request.secure.expires_at = Date.now()+(results.body.expires_in - 60)*1000;
  
}

//https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=07459d3d-8ac1-4998-a546-d72a80cfe5b0&redirect_uri=http://localhost:3000/


  function makeEnvelope(name,email){
  
    let docPdfBytes;
    // read file from a local directory
    // The read could raise an exception if the file is not available!
    docPdfBytes = fs.readFileSync(path.resolve(demoDocsPath));
  
    // create the envelope definition
    let env = new docusign.EnvelopeDefinition();
    env.emailSubject = 'Please sign this document';
  
    // add the documents
    let doc1 = new docusign.Document()
      , doc1b64 = Buffer.from(docPdfBytes).toString('base64')
      ;
  
    doc1.documentBase64 = doc1b64;
    doc1.name = 'Document for signing'; // can be different from actual file name
    doc1.fileExtension = 'pdf';
    doc1.documentId = '3';
  
    // The order in the docs array determines the order in the envelope
    env.documents = [doc1];
  

    let signer1 = docusign.Signer.constructFromObject({
       email: email,
       name: name, 
        clientUserId: process.env.CLIENT_USER_ID,
        recipientId: userId
        //userId:userId    
    });
    
    
    let signHere1 = docusign.SignHere.constructFromObject({
          anchorString: '/sn1/',
          anchorYOffset: '10', anchorUnits: 'pixels',
          anchorXOffset: '20'})
      ;
  
    // Tabs are set per recipient / signer
    let signer1Tabs = docusign.Tabs.constructFromObject({
      signHereTabs: [signHere1]});
    signer1.tabs = signer1Tabs;
  
    // Add the recipient to the envelope object
    let recipients = docusign.Recipients.constructFromObject({
      signers: [signer1]});
    env.recipients = recipients;
  
    // Request that the envelope be sent by setting |status| to "sent".
    // To request that the envelope be created as a draft, set to "created"
    env.status = 'sent';
  
    return env;
}

function getEnvelopesApi(request)
{
    let dsApiClient = new docusign.ApiClient();
    dsApiClient.setBasePath(process.env.BASE_PATH);
    dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + request.session.access_token);
    return new docusign.EnvelopesApi(dsApiClient);
}

function makeRecipientViewRequest(name,email) {
    

  let viewRequest = new docusign.RecipientViewRequest();


  viewRequest.returnUrl = "http://localhost:3000/success";
  viewRequest.authenticationMethod = 'none';
  viewRequest.userName = name;
  viewRequest.email = email;
  
  viewRequest.clientUserId = process.env.CLIENT_USER_ID;

  return viewRequest
}

app.post("/submit",async(request,response)=>{
  await checkToken(request);
 let envelopesApi = getEnvelopesApi(request);
      
      let envelope = makeEnvelope(request.body.name,request.body.email)
  
      let results = await envelopesApi.createEnvelope(
          process.env.ACCOUNT_ID, {envelopeDefinition: envelope});
  console.log("envelope results",results);

  // Create the recipient view, the Signing Ceremony
let viewRequest = makeRecipientViewRequest(request.body.name,request.body.email);
// Call the CreateRecipientView API
// Exceptions will be caught by the calling function
results = await envelopesApi.createRecipientView(process.env.ACCOUNT_ID, results.envelopeId,
  {recipientViewRequest: viewRequest});
  response.redirect(results.url);
 console.log("view results",results);

//console.log ({envelopeId: envelopeId, redirectUrl: results.url});
//console.log("received form data", request.body);
//response.send("received");
});



app.get("/",async (request, response)=>{
  await checkToken(request);
response.sendFile(path.join(__dirname,"main.html"));
});

//D:/DocusignProject/docusign-app/src/app/pdf-list/pdf-list.component.html

app.get("/success",(request,response)=>{
  response.send("success");
});