const { request } = require('express');
const express = require('express');
const req = require('express/lib/request');
const ExpressError = require('./expressError')
const middleware = require('./middleware')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(middleware.logger)

// app.get('/secret', middleware.checkForPassword, (req, res, next)=>{

//     return res.send('Welcome!')

// })



app.get('/secret', middleware.checkForPassword, (req, res, next)=>{

    return res.send('Welcome!')

})

app.get('/private', middleware.checkForPassword, (req, res, next)=>{
    return res.send("Welcome")
})


app.get('/dogs',(req,res,next)=>{
    try {
        throw new ExpressError("no dogs here", 404)
        res.send("bark bark bark")
    } catch (e) {
        next(e)
    }
})

app.post('/chickens', (res,req)=>{
console.log('post chicken')
})

app.get('/chickens', (res,req)=>{
    req.send('<h1>Get More Chickens!!!!</h1>')
    })

    const greetings ={

        pl: 'dzein dobre',
        ru: 'zdrastutye',
        nm:'hallo'
    }


app.get('/greet/:language', (req, res)=>{
    const lang = req.params.language
    const greeting = greetings[lang]
    res.send(greeting)
})

app.get('/search', (req, res)=>{
    const {sort, term} = req.query
    return res.send(`SEARCH PAGE, Sort is ${sort}, and term is ${term}`)
})

app.get('/show-me-headers', (req, res)=> {

    return res.send(req.headers)
})


app.get('/show-language', (req,res)=>{

    const language = req.headers['accept-language']
    res.send(` Your chosen language is ${language}`)
})

app.post('/register', (req,res)=>{

    res.send(req.body)
})




const CANDIES = [
    {name:'snickers', quantity:22, price:1.25},
    {name:'skittles', quantity:17, price:.99},

]

app.get('/candies', (req,res)=>{

    res.json(CANDIES);

})
app.post('/candies',(req,res)=>{
    if (req.body.name.toLowerCase() ==='circus peanuts'){
        return res.status(403).json(`Eww, grosse, no ${req.body.name}`)

    }

    CANDIES.push(req.body);
    res.status(201).json(CANDIES);

})

app.use((req,res, next)=>{
const e = new ExpressError("Page not Found", 404)
next(e)

})

app.use((error, req, res, next)=>{
    res.status(404).send(error.msg)
} 
)

app.listen(3000, () =>{
    console.log('app on port 3000');
});
