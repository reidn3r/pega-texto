const correctRoute = (route) => {
    let out = "";
    for(let i=0; i<route.length; i++){
        if(route[i] !== '/' && route[i] !== '_'){
            out += route[i];
        }
    }
    return out;
}
//console.log(correctRoute('///////'));
module.exports = correctRoute;