var getJSON = require('get-json')
var express = require('express')

var app = express();
let key = {};
function simalend(url){
    getJSON(url, function(error, response){
        for(let i = 0; i<response.items.length; i++){
            key[i]  = {
                place: 'Площадка: Simaland',
                name: response.items[i].name,
                price: response.items[i].price + ' ' + response.items[i].currency,
                photo: response.items[i].img,
                country: response.items[i].country.name,
                size: response.items[i].size,
                trademark: response.items[i].trademark.name
            };
        }
    })
    return key
}
function platan(url){
    getJSON(url, function(error, response){
        for(let i = 0; i<response.items.length; i++){
            key[i]  = {
                place: 'Площадка: Platan',
                name: response.items[i].NAME,
                price_roz: response.items[i].CENA_ROZ + ' руб.',
                price_pack: response.items[i].CENA_PACK + ' руб.',
                price_opt: response.items[i].CENA_OPT + ' руб.',
                quanty: response.items[i].QUANTY,
                manufac: response.items[i].MANUFAC,
            };
        }
    })
    return key
}
app.get('/', function(req,res){
    if(req.query.search){
        let sender = req.query.search;

        const urlPla ='http://shop2.platan.ru/export/price.json?search=' + encodeURIComponent(sender);
        res.json(platan(urlPla));
        
        const urlSima ='https://www.sima-land.ru/api/v3/item/?q=' + encodeURIComponent(sender);
        res.json(simalend(urlSima));
    }
});
app.listen(3012, function(){
    console.log('API app started!')
});



// img, photos, country, stuff, 
/*getJSON(url, function(error, response){
    //let buffer = [];
    //let key = '';
    console.log(response);
    for(let i = 0; i<response.items.length; i++)
    {
        key  = response.items[i].name + ' ' + response.items[i].price + response.items[i].currency
        buffer.push(key);
        console.log('Name: ' + response.items[i].name);
        console.log('Price: ' + response.items[i].price + response.items[i].currency);
        console.log('Photo: ' + response.items[i].img);
        console.log('Country: ' + response.items[i].country.name);
        console.log('Stuff: ' + response.items[i].stuff);
        console.log('Size: глубина: ' + response.items[i].depth + 'см ширина: '+ response.items[i].width + 'см высота: ' + response.items[i].height + 'см')
        console.log('Trademark: ' + response.items[i].trademark.name);
        console.log('Transit_in_settlement: ' + JSON.stringify(response.items[i].transit_in_settlement));
        console.log('____________________________________________________________________');

    }
    //console.log(buffer.join());
    //JSON.stringify()
})*/
