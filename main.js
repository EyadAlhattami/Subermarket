let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("dis");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category=document.getElementById("category");
let submit=document.getElementById("submit");

//console.log(title,price,taxes,ads,discount,total,count,category,submit)

let mod='create';
let ik;
let searchMode='title';
function getTotal(){
    if(price.value !=''){

        let result=(+price.value+ +taxes.value + +ads.value)
        - +discount.value;
        total.innerHTML=result;
        console.log(result);
        total.style.background = '#040';
        
    }else{
        total.style.background='red';
        total.innerHTML='';
    }

}



    let datapro=[];
    if(localStorage.product !=null){
        datapro=JSON.parse(localStorage.product);
    }else{
        datapro=[];
    }
submit.onclick=function(){
    let newpro={
    title: title.value,
    price:price.value,
    taxes:taxes.value ,
    ads:   ads.value
    ,discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value,
    
    }
    if(title.value !="" && price.value !="" && category.value !="" && count.value < 100 ){
    if(mod=='create'){
        
        if(newpro.count >1){
            
            for(let i=0 ;i<newpro.count;i++){
                datapro.push(newpro);
            }
        }else{
            datapro.push(newpro);
        }
    }
    else{
        datapro[ik]=newpro;
        submit.innerHTML='create';
        mod='create';
        count.style.display='block';

      

    }
    clearfun();
}
   
    localStorage.setItem( 'product' ,JSON.stringify(datapro))
    console.log(datapro);
    
    showData();

}


function clearfun(){
    title.value='';
    price.value ='';
    taxes.value ='';
     ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}

function deleteAlll(){
    
    datapro.splice(0);
    showData();
    localStorage.clear();
}

function showData(){
    let table='';
    for(let i=0;i<datapro.length ; i++ ){
        table += ` <tr>
                            <td>${i}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}2000</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick="updatepro(${i})" id="update">update</button></td>
                            <td><button onclick="deletepro(${i})" id="delete">delete</button></td>
                        </tr>`;

        

    }
    document.getElementById('tbody').innerHTML=table;


    let btndel=document.getElementById('deleteAll');
    if(datapro.length>0){
        btndel.innerHTML=`
        <button onclick="deleteAlll()">delete all(${datapro.length})</button>
        `
    }else{
        btndel.innerHTML=``;
    }

}

function deletepro(i){
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    showData();
}

showData();

function updatepro(i){
    scroll({
        top:0,
        behavior:'smooth',

    }

    )
    ik=i;
    mod='update';
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    category.value=datapro[i].category;
    getTotal();
    count.style.display='none';
    submit.innerHTML='update';

}


function getSearch(id){
    console.log(id);
    let searcbox=document.getElementById("search");
    if (id=='searchTitle'){
        searchMode='title';
       
    }else{
        searchMode='category';
        
    }
    searcbox.placeholder='search by '+ searchMode;
    searcbox.focus();
    searcbox.value= '';
    showData();
}


function searchdata(value){
    let table='';
    for(let i=0;i<datapro.length;i++){
    if(searchMode =='title'){
        
            if(datapro[i].title.includes(value)){
                 table += ` <tr>
                            <td>${i}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}2000</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick="updatepro(${i})" id="update">update</button></td>
                            <td><button onclick="deletepro(${i})" id="delete">delete</button></td>
                        </tr>`;
            }
        

    }else{
        if(datapro[i].category.includes(value)){
            table += ` <tr>
                       <td>${i}</td>
                       <td>${datapro[i].title}</td>
                       <td>${datapro[i].price}2000</td>
                       <td>${datapro[i].taxes}</td>
                       <td>${datapro[i].ads}</td>
                       <td>${datapro[i].discount}</td>
                       <td>${datapro[i].total}</td>
                       <td>${datapro[i].category}</td>
                       <td><button onclick="updatepro(${i})" id="update">update</button></td>
                       <td><button onclick="deletepro(${i})" id="delete">delete</button></td>
                   </tr>`;
       }
    }
}

    document.getElementById('tbody').innerHTML=table;

}






