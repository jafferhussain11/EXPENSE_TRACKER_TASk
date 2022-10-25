//clears local storage on page reload
//window.onload = window.localStorage.clear();
//form
const form = document.getElementById('myform');
//userlist
const userList = document.getElementById('userlist');

//event listners
form.addEventListener('submit',addUser);

window.addEventListener('DOMContentLoaded',()=>{

    axios.get("https://crudcrud.com/api/9f63799d39c1428bb78b7b13f3399cb4/expense_tracker")
    .then((res)=>{

        console.log(res.data);
        for(let i=0 ;i < res.data.length; i++){

            displayData(res.data[i]);
        }
        
    });
   
})



function addUser(event){

    
    event.preventDefault();
    let data = {

        expenseval : event.target.expenseval.value,
        desc: event.target.desc.value,
        cat: event.target.cat.value
    }
    let data_serial = JSON.stringify(data);
    axios.post("https://crudcrud.com/api/9f63799d39c1428bb78b7b13f3399cb4/expense_tracker",data)
    .then((res)=>displayData(res.data))
    .catch((err)=>console.log(err));

    // let resp = checkifpresent(data.cat);
    // if(resp){
        
    //     localStorage.setItem(data.cat,data_serial);
    //     displayData(data);
    // }else{

    //     alert("Category of Expense already added!");
    // }

}

function displayData(data){

    let li = document.createElement('li');
    li.setAttribute('category',data.cat); // setting this att value for the new li item helps us to grab an html element and delete it
    li.innerHTML =`${data.expenseval}   ${data.desc}  ${data.cat}
     <button id="edit" onClick=editUser('${data.expenseval}','${data.desc}','${data.cat}')>edit</button> 
     <button id="delete" onClick=deleteUser('${data.cat}')>delete</button>`;
    userList.appendChild(li);

}

function editUser(expenseval,desc,cat){

    //copyback to text fields
    document.getElementById('expenseval').value = expenseval;
    document.getElementById('desc').value = desc;
    document.getElementById('cat').value = cat;

    deleteUser(cat);
}
function deleteUser(cat){

    const liToDelete = userList.querySelector('[category="'+cat+'"]');
    //localstorage delete
    //localStorage.removeItem(cat);
    //CRUDCRUD DELETE
    axios.get("https://crudcrud.com/api/9f63799d39c1428bb78b7b13f3399cb4/expense_tracker")
    .then((res)=>{

        for(let i = 0; i<res.data.length ; i++){

            if(res.data[i].cat==cat) //category which is our key is being serached for in our result obj receieved
            {
                axios({
                    
                    method: 'delete',
                    url : `https://crudcrud.com/api/9f63799d39c1428bb78b7b13f3399cb4/expense_tracker/${res.data[i]._id}`

                })
                .then(liToDelete.remove())
                .catch((err)=>console.log(err));
            }
        }

    })
    //liToDelete.remove();

}

// function checkifpresent(cat){

//     if(localStorage.getItem(cat) === null) return true;
//     else return false;


// }