//clears local storage on page reload
window.onload = window.localStorage.clear();
//form
const form = document.getElementById('myform');
//userlist
const userList = document.getElementById('userlist');

//event listners

form.addEventListener('submit',addUser);


function addUser(event){

    
    event.preventDefault();
    let data = {

        expenseval : event.target.expenseval.value,
        desc: event.target.desc.value,
        cat: event.target.cat.value
    }
    let data_serial = JSON.stringify(data);
    let resp = checkifpresent(data.cat);
    if(resp){
        
        localStorage.setItem(data.cat,data_serial);
        displayData(data);
    }else{

        alert("Category of Expense already added!");
    }

}

function displayData(data){

    let li = document.createElement('li');
    li.setAttribute('category',data.cat); // setting this att value for the new li item helps us to grab an html element and delete it
    li.innerHTML =`${data.expenseval}   ${data.desc}  ${data.cat}
     <button id="edit" onClick=editUser('${data.expenseval}','${data.desc}','${data.cat}')>edit</button> 
     <button id="delete" onClick=deleteUser('${data.cat}')>delete</button>`;
    userList.append(li);

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
    localStorage.removeItem(cat);
    liToDelete.remove();

}

function checkifpresent(cat){

    if(localStorage.getItem(cat) === null) return true;
    else return false;


}