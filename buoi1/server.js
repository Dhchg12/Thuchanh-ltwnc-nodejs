import express from 'express'
import 'dotenv/config'
import myDateTime from './date'
import getURL from './getURL'
import viewEngine from './viewEngine'

const app = express()
const port=process.env.PORT

viewEngine(app);

// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

app.listen(port, () =>{
    console.log('Example app listening on post ${port}')
})

// Tạo route để hiển thị thời gian
app.get('/date', (req, res) => {
    const currentDateTime = myDateTime();  // Gọi hàm myDateTime từ module date
    res.send(currentDateTime);
});

// Route /geturl
app.get('/geturl', (req, res) => {
    const path = getURL.getPath(req); // Gọi hàm getPath từ module getURL
    const params = getURL.getParamsURL(req); // Gọi hàm getParamsURL từ module getURL
    res.send(`Path: ${path}, Params: ${params}`); // Gửi đường dẫn và tham số về client
});

app.get('/ejs', (req,res) => {
    res.render('test');
})

app.get('/', (req,res) => {
    res.render('home');
})

app.get('/about', (req,res) => {
    res.render('about');
})

// app.get('/about', (req,res) => {
//     res.send("Hello World!. Page about")
// })
