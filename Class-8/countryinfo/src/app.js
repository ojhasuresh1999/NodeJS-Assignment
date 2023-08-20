import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import redis from 'redis';
import Country from './db.js';

dotenv.config({ path: './.env' });
const port = process.env.PORT || 3000;

const redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 7777
});

redisClient.connect().then(() => {
    console.log('Connected to Redis server on port', 7777);
}).catch((err) => {
    console.log(err);
})

const app = express();
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));


async function fetchPage(countryName, res) {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${countryName}`;
    try {
        const response = await axios.get(url)
        res.send(response.data.parse.text['*']);
        return {
            success: true,
            countryPage: response.data
        };
    } catch (error) {
        console.log(err);
        res.sendStatus(404);
        return {
            success: false,
            error
        }
    }
}

app.get('/', (req, res) => {
    res.sendFile('./public/index.html');
});

app.get('/:countryName', (req, res) => {
    const countryName = req.params.countryName;
    fetchPage(countryName, res);
});

app.post('/', (req, res) => {
    const countryName = req.body.country;
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${countryName}`;
    redisClient.get(countryName).then((countryPage) => {
        if (countryPage) {
            res.send(JSON.parse(countryPage).parse.text['*']);
        } else {
            Country.findOne({ countryName: countryName }).then((country) => {
                if (country) {
                    res.send(JSON.parse(country.countryPage).parse.text['*']);
                    redisClient.set(countryName, country.countryPage);
                } else {
                    fetchPage(countryName, res).then((response) => {
                        if (response.success) {
                            const strCountryPage = JSON.stringify(response.countryPage)
                            Country.create({
                                countryName: countryName,
                                countryPage: strCountryPage
                            });
                            redisClient.set(countryName, strCountryPage);
                        }
                    });
                }
            });
        }
    }).catch((err) => {
        console.log(err);
        fetchPage(countryName, res);
    });
});

app.listen(port, (err) => {
    if (err) console.log(err);
    else {
        console.log('Server listening on port', port);
    }
});
