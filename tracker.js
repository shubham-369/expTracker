
var amt = document.getElementById('amount');
var desc = document.getElementById('description');
var catg = document.getElementById('category');
var edit = false;
var editId = 0;

desc.addEventListener('input',function(){
    desc.value = desc.value.charAt(0).toUpperCase()+desc.value.slice(1);
});
document.getElementById('form').addEventListener('submit',(event)=>{
    event.preventDefault();

    const expense ={
        amount : amt.value,
        description : desc.value,
        category : catg.value
    }
    if(edit){        
        axios.put(`https://crudcrud.com/api/ba6dd6cc73ee4ea194eb901ca141377a/appointmentData/${editId}`,{
            amount : amt.value,
            description : desc.value,
            category : catg.value
        })
        .then((message) => console.log(message))
        .catch((error) => console.log(error));
    }
    else{
        let updated = JSON.stringify(expense);

        axios.post('https://crudcrud.com/api/ba6dd6cc73ee4ea194eb901ca141377a/appointmentData',updated,{  
        headers: {
            'Content-Type': 'application/json' 
        }
        })
        .then((response) => showUser(response.data))
        .catch((error) => console.log(error));
    }



  
    document.getElementById('form').reset();
});

const list = document.getElementById('list');
list.querySelector('ul').innerHTML="";

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/ba6dd6cc73ee4ea194eb901ca141377a/appointmentData')
    .then((response) => {for(let i=0; i<response.data.length; i++){
        showUser(response.data[i]);
        console.log("Get Working");
    }
    })
    .catch((error) => console.log(error));
    });

function showUser(user){
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'list-group-item-light', 'font-weight-bold');
    li.innerHTML= `${user.amount} - ${user.description} - ${user.category} <button data-id="${user._id}" class="btn btn-danger float-right py-1 delete">Delete</button><button data-id="${user._id}" class="btn btn-primary float-right mr-3 py-1 edit">Edit</button>`
    list.querySelector('ul').appendChild(li);

}

list.querySelector('ul').addEventListener('click', function(e){
    if(e.target.classList.contains('delete')){
        axios.delete(`https://crudcrud.com/api/ba6dd6cc73ee4ea194eb901ca141377a/appointmentData/${e.target.getAttribute('data-id')}`)
        .then(() => console.log("Deleted"))
        .catch((error) => console.log(error));
        
        e.target.parentElement.remove();
    }
});

list.querySelector('ul').addEventListener('click', function(e){
    if(e.target.classList.contains('edit')){
        axios.get(`https://crudcrud.com/api/ba6dd6cc73ee4ea194eb901ca141377a/appointmentData/${e.target.getAttribute('data-id')}`)
        .then((response) => {
            amt.value = response.data.amount;
            desc.value = response.data.description;
            catg.value = response.data.category;
            edit = true;
            editId = e.target.getAttribute('data-id');
        })
        .catch((error) => console.log(error));
        e.target.parentElement.remove();
    }
});