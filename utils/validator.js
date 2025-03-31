const ValidateUser = (data)=>{
    if(!data.firstName) {
        return "First Name is required"
    }
    if(!data.lastName) {
        return "Last Name is required"
    }
    if(!data.email) {
        return "Email is required"
    }
    if(!data.password) {
        return "Password is required"
    }
    return true
}

const ValidateProducts = (product)=>{
    if(!product.id){
        return "id is required"
    }
    if(!product.name){
        return "name is reequired"
    }
    if(!product.qty){
        return "product quantity is required"
    }
    return true //every condition has been met successfully
}


module.exports = {ValidateUser, ValidateProducts}