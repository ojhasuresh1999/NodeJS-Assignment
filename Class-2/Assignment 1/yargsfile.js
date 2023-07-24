const yargs = require('yargs')
const fs = require('fs')

let filename = yargs.argv.filename
let filenames = []

try{
    filenames = JSON.parse(fs.readFileSync('filenames.txt'))
    let value = filenames.find(element => element == filename)
    if(value === filename){
        console.log("File name already exist! Enter new filename");
        process.exit()
    } 
    
} catch(e) {
    // console.log(e)
}

filenames.push(filename)
console.log("filenames: ", filenames)

fs.writeFileSync('filenames.txt', JSON.stringify(filenames))

fs.writeFile(filename, 'You are Awesome', function (err) {
    if (err) throw error
    console.log("New File created successfully")
})