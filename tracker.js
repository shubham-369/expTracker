
var amt = document.getElementById('amount');
var desc = document.getElementById('description');
var catg = document.getElementById('category');

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

    let updated = JSON.stringify(expense);

    axios.post('https://crudcrud.com/api/afe5c20e300b435c9456c4a00f8bcead/appointmentData',updated,{  
    headers: {
        'Content-Type': 'application/json' 
    }
    })
    .then((message) => console.log(message))
    .catch((error) => console.log(error));

    // let div = document.getElementById('list');

    // div.querySelector('ul').innerHTML="";

    // for(let i=0; i<localStorage.length; i++){
    //     let key = localStorage.key(i);
    //     let value = localStorage.getItem(key);
    //     let obj = JSON.parse(value);
    //     const li = document.createElement('li');
    //     li.classList.add('list-group-item', 'list-group-item-light', 'font-weight-bold');
    //     li.innerHTML= `${obj.amount} - ${obj.description} - ${obj.category} <button data-desc="${obj.description}" class="btn btn-danger float-right py-1 delete">Delete</button><button data-desc="${obj.description}" class="btn btn-primary float-right mr-3 py-1 edit">Edit</button>`
    //     div.querySelector('ul').appendChild(li);

    // }

    document.getElementById('form').reset();
});

const list = document.getElementById('list');
list.querySelector('ul').innerHTML="";

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/afe5c20e300b435c9456c4a00f8bcead/appointmentData')
    .then((response) => {for(let i=0; i<response.data.length; i++){
        showUser(response.data[i]);
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
        axios.delete(`https://crudcrud.com/api/afe5c20e300b435c9456c4a00f8bcead/appointmentData/${e.target.getAttribute("data-id")}`);
        e.target.parentElement.remove();
    }
});


// div.querySelector('ul').addEventListener('click',function(e){    
//     if(e.target.classList.contains('delete')){
//         let key = e.target.getAttribute('data-desc');
//         e.target.parentElement.remove();
//         localStorage.removeItem(key);        
//     }
// });

// div.querySelector('ul').addEventListener('click',(e)=>{
//     if(e.target.classList.contains('edit')){
//         let key = e.target.getAttribute('data-desc');
//         let l_key = localStorage.getItem(key);
//         let obj = JSON.parse(l_key);
//         amt.value = obj.amount;
//         desc.value = obj.description;
//         catg.value = obj.category;
//         e.target.parentElement.remove();
//         localStorage.removeItem(key);        
//     }
// });