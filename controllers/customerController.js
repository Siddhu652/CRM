const addCustomer = ((req, res)=>{
    res.status(201).json({
        status : "success",
        message : "customer has been added successfully"
    })
})

module.exports = {addCustomer};