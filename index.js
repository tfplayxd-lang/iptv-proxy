const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
const url = req.query.url;

if (!url) {
return res.status(400).send('URL não informada');
}

try {
const response = await axios({
method: 'GET',
url,
responseType: 'stream',
headers: {
'User-Agent': 'Mozilla/5.0'
}
});

res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Content-Type', response.headers['content-type']);

response.data.pipe(res);

} catch (err) {
console.log(err.message);
res.status(500).send('Erro no proxy');
}
});

app.listen(process.env.PORT || 10000, () => {
console.log('Proxy rodando');
});
