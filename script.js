import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appsettings={
    databaseURL:"https://playground-a0412-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app=initializeApp(appsettings);
const database=getDatabase(app);
const shoppingListInDB=ref(database,"shoppingList")

console.log(app)


const inputel=document.getElementById("text");
const buttonel=document.getElementById("bt");
const shoplist=document.getElementById("shoplist");

buttonel.addEventListener("click", ()=>{
    let inputvalue=inputel.value
    push(shoppingListInDB,inputvalue)
    clearInputFieldel();
})

onValue(shoppingListInDB,function(snapshot){
    if(snapshot.exists()){
        let Itemarray=Object.entries(snapshot.val());
        clearShoppingListel();
        for(let i=0;i<Itemarray.length;i++){
           let currentitem=Itemarray[i];
           let currentitemId=currentitem[0]
           let currentitemValue=currentitem[1]
           appendItemToShoppingListel(currentitem)
        }
    }else{
        shoplist.innerHTML="No item here...yet"
    }
    
})
 
function clearInputFieldel(){
    inputel.value=""
}

function appendItemToShoppingListel(item){
    // let list=`<li>${inputvalue}</li>`
    // shoplist.innerHTML+=list;
    let itemId=item[0];
    let itemValue=item[1];
    let newel=document.createElement("li");
    newel.textContent=itemValue;
    newel.addEventListener("click",function(){
        let exactlocation=ref(database,`shoppingList/${itemId}`)
        remove(exactlocation)
    })
    shoplist.append(newel);
}
function clearShoppingListel(){
    shoplist.innerHTML=""
}
