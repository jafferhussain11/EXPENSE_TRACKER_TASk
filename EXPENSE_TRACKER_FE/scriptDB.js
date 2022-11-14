
const form = document.getElementById('myform');

//userlist
const userList = document.getElementById('userlist');

//crudURDL
var url = "http://localhost:4000";

//event listner1
form.addEventListener('submit',addUser);

//event DOMreload
window.addEventListener('DOMContentLoaded',async ()=>{

    
    try{
        
       const prom = await axios.get(url);
       //console.log(prom.data);
       for(let i=0 ;i < prom.data.Expenses.length; i++){

            displayData(prom.data.Expenses[i]);
       }
        
    }  
    catch(err){
        console.log(err);
    }

});



function addUser(event){

    
    event.preventDefault();
    let data = {

        expenseval : event.target.expenseval.value,
        desc: event.target.desc.value,
        cat: event.target.cat.value
    }
    
    async function postData(data){

        try{

            const prom = await axios.post(`${url}/addexpense`,data);
            //console.log(prom.data);
            displayData(prom.data.value);
        }
        catch(err){
            console.log(err);
        }
    }
   postData(data);
    
}
    
function displayData(data){

    let li = document.createElement('li');
    li.setAttribute('id',data.id); // setting this att value for the new li item helps us to grab an html element and delete it
    li.innerHTML =`${data.expenseval}   ${data.description}  ${data.category}
     <button id="edit" onClick=editUser('${data.expenseval}','${data.description}','${data.category}','${data.id}')>edit</button> 
     <button id="delete" onClick=deleteUser('${data.id}')>delete</button>`;
    userList.appendChild(li);
    console.log(data);

}

function editUser(expenseval,desc,cat,id){

    //copyback to text fields
    document.getElementById('expenseval').value = expenseval;
    document.getElementById('desc').value = desc;
    document.getElementById('cat').value = cat;

    deleteUser(id);
}
async function deleteUser(id){

    const liToDelete = userList.querySelector('[id="'+id+'"]');//grabbing the li element

    try{

        const prom = await axios.delete(`${url}/deletexpense/${id}`);
        liToDelete.remove();

    }
    catch(err){
        console.log(err);
    }
}
