const express = require('express')



function logger(req,res,next) {
    console.log(`This is the req method ${req.method} and this is the req path ${req.path}`)
    return next()
    
}

function checkForPassword(req, res, next) {

    try {
        if (req.query.password !== "monkeybreath"){
            throw new ExpressError("Missing Password", 402)
        }else{
            return next()
        }

    } catch (e) {
        
    return next(e)

    }
    
}

module.exports = {

    logger,
    checkForPassword
}