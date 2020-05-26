require('dotenv').config();

const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const cors = require('cors');
app.use(cors({
    origin: 'https://idlunch-14bd5.web.app/',
    credentials: true
}));


const cookieParser = require('cookie-parser');
app.use(cookieParser());

const utilisateurRouter = require("./api/utilisateurs/utilisateur.router");
const produitRouter = require("./api/produits/produit.router");
const fournisseurRouter = require("./api/fournisseurs/fournisseur.router");
const categorieRouter = require("./api/categories/categorie.router");

const privateKey = fs.readFileSync('/etc/letsencrypt/live/idlunch.wt1-2.ephec-ti.be/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/idlunch.wt1-2.ephec-ti.be/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/idlunch.wt1-2.ephec-ti.be/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
cert: certificate,
ca: ca
};

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(process.env.APP_PORT, () => {
  console.log('HTTPS Server running on port 3000');
});

app.use(express.json());

app.use("/v1/api/utilisateurs", utilisateurRouter);
app.use("/v1/api/produits", produitRouter);
app.use("/v1/api/fournisseurs", fournisseurRouter);
app.use("/v1/api/categories", categorieRouter);

//app.listen(process.env.APP_PORT, () =>{
  //  console.log("Server up and running : ", process.env.APP_PORT);
//});
