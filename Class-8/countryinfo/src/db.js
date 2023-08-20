import mongoose from 'mongoose';

const uri = `mongodb://localhost:27017/edureka-nodejs`
const db = mongoose.connect(uri).then(() => {
    console.log('Successfully connected to MongoDB on port', 27017);
}).catch((err) => {
    console.log(err);
})

const countrySchema = new mongoose.Schema({
    countryName: String,
    countryPage: String
});

const Country = mongoose.model('Country', countrySchema);

export default Country;