
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


//define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templetes/views')
const partialPath = path.join(__dirname, '../templetes/partial')

//Setup handlebars engine and views
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDir))
app.get('', (req,res) => {
    res.render('index' , {
        title : 'weather app',
        name : 'fereshta'
    })

})

app.get('/about', (req,res) => {
    res.render('about' , {
        title : 'About me',
        name : 'Fereshta Alavy'
    })
})

app.get('/help', (req,res) => {
    res.render('help' , {
        message: 'this is some helpful text',
        title: 'help page',
        name: 'Fereshta Alavy'
    })
})


app.get('/help',(req , res)=>{
    res.send([{
        name : 'Fereshta'
    }, { 
        name : 'Sara'
    }])
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
    

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search'
        })

    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req , res)=>{
    res.render('404',{
        title: '404 help',
        name: 'Fereshta Alavy',
        ErrorMessage: 'Help article not found.'
})
})

app.get('*',(req , res)=>{
    res.render('404',{
        title: '404',
        name: 'Fereshta Alavy',
        ErrorMessage: 'Page not found.'
    })
    
})

app.listen(port , () => {
    console.log('server is up on port ' + port)
})