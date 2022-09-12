let title =document.getElementById("title")
let price =document.getElementById("price")
let taxes =document.getElementById("taxes")
let ads =document.getElementById("ads")
let discount =document.getElementById("discount")
let total =document.getElementById("total")
let count =document.getElementById("count")
let category =document.getElementById("category")
let submet =document.getElementById("submet")
let search =document.getElementById("search")





let mood ="creat";
let tem;
//total
function gettotal(){
if(price.value !=""){
let result =(+price.value + +taxes.value + +ads.value) - +discount.value;
total.innerHTML=result;
total.style.background="#040"
}else{
total.innerHTML="";
total.style.background="red"
}}

//creat
let datepro;
if(localStorage.product != null){
    datepro =JSON.parse(localStorage.product)
}else{
datepro =[];
}


submet.onclick =function(){
let newpro ={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
}


if(title.value != "" && price.value != "" && category.value != "" && newpro.count<300){
if(mood==="create"){
if(newpro.count>1){ for(let i =0; i < newpro.count;i++){ datepro.push(newpro) } }else{datepro.push(newpro)}
}else{
datepro[tem]=newpro
mood="create"
submet.innerHTML="create"
count.style.display="block"
}
cleardate()
}



localStorage.setItem("product",JSON.stringify(datepro))
//JSON.stringify to convert string...
show()
}

//clear
function cleardate(){
title.value=""
price.value=""
taxes.value=""
ads.value=""
total.innerHTML=""
discount.value=""
count.value=""
category.value=""
}


//read
function show(){
gettotal()
let table = "";
for(let i =0; i< datepro.length;i++ ){
    table += 
    `
    <tr>
    <td>${i+1}</td>
    <td>${datepro[i].title}</td>
    <td>${datepro[i].price}</td>
    <td>${datepro[i].taxes}</td>
    <td>${datepro[i].ads}</td>
    <td>${datepro[i].discount}</td>
    <td>${datepro[i].total}</td>
    <td>${datepro[i].category}</td>
    <td><button onclick="update(${i})">update</button></td>
    <td><button onclick="del(${i})" id="delete">delete</button></td>
 </tr>
`
}
document.getElementById("tbody").innerHTML= table;
//delete all
let delall =document.getElementById("delall")

if(datepro.length >0){
delall.innerHTML=`
<td><button onclick="delall()">delete All ( ${datepro.length} )</button></td>
`}else{delall.innerHTML=""}

}
show()


//delete
function del(i){
datepro.splice(i,1);
localStorage.product=JSON.stringify(datepro)
show()
}


function delall(){
localStorage.clear()
datepro.splice(0)
show()
}


//update
function update(i){
title.value=datepro[i].title;
price.value=datepro[i].price;
taxes.value=datepro[i].taxes;
ads.value=datepro[i].ads;
discount.value=datepro[i].discount;
gettotal()
count.style.display="none"
category.value=datepro[i].category;
submet.innerHTML="update"
mood="update"
tem =i;
scroll({
top:0,
behavior:"smooth",
})
}



//search
let searchmood = "title";
function getsearchmood(id){
let search =document.getElementById("search")
if(id== "searchtitle"){searchmood = "title"; }else{searchmood = "category";}
search.Placeholder= 'search by' + searchmood;
search.focus()
search.value="";
show()
}


function searchdata(value){
let table=" ";

if(searchmood == "title"){
for(let i =0 ;i<datepro.length;i++){
if(datepro[i].title.includes(value.toLowercase())){
    table += `
    <tr>
    <td>${i}</td>
    <td>${datepro[i].title}</td>
    <td>${datepro[i].price}</td>
    <td>${datepro[i].taxes}</td>
    <td>${datepro[i].ads}</td>
    <td>${datepro[i].discount}</td>
    <td>${datepro[i].total}</td>
    <td>${datepro[i].category}</td>
    <td><button onclick="update(${i})">update</button></td>
    <td><button onclick="del(${i})" id="delete">delete</button></td>
 </tr>`}}
}else{
    for(let i =0 ;i<datepro.length;i++){
        if(datepro[i].category.includes(value.toLowercase())){
            table += `
            <tr>
            <td>${i}</td>
            <td>${datepro[i].title}</td>
            <td>${datepro[i].price}</td>
            <td>${datepro[i].taxes}</td>
            <td>${datepro[i].ads}</td>
            <td>${datepro[i].discount}</td>
            <td>${datepro[i].total}</td>
            <td>${datepro[i].category}</td>
            <td><button onclick="update(${i})">update</button></td>
            <td><button onclick="del(${i})" id="delete">delete</button></td>
         </tr>`}}
}
document.getElementById("tbody").innerHTML= table;
}


let body =document.querySelector("body")
document.getElementById("light").onclick=function(){
body.classList.toggle("light")
}


