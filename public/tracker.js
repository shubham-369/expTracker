const fid = document.getElementById('id');
const amt = document.getElementById('amount');
const desc = document.getElementById('description');
const catg = document.getElementById('category');
const list = document.getElementById('list');

desc.addEventListener('input',function(){
    desc.value = desc.value.charAt(0).toUpperCase()+desc.value.slice(1);
});

list.querySelector('ul').innerHTML="";
axios.get('http://localhost:6060/form')
    .then((response) => {
        for(let i = 0; i < response.data.length; i++){
            showUser(response.data[i]);
    }
    })
    .catch((error) => console.log(error));


document.getElementById('form').addEventListener('submit', async (event)=>{
    event.preventDefault();

    const formdata = new FormData(event.target);
    const jsondata = {};

    formdata.forEach((value, key) => {
        jsondata[key] = value;
    });

    try{
        axios.post('http://localhost:6060/data', jsondata)
        .then(() => console.log('data saved to db'))
        .catch((error) => {'error while saving data : ', error});
    }
    catch(error){
        console.log(`error while posting data : ${error}`)
    };

  
    document.getElementById('form').reset();
});

list.querySelector('ul').innerHTML="";


function showUser(user){
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'list-group-item-light', 'font-weight-bold');
    li.innerHTML= `${user.amount} - ${user.description} - ${user.category} <a href="delete/${user.id}" class="btn btn-danger float-right py-1">Delete</a><button data-id="${user.id}" class="btn btn-primary float-right mr-3 py-1 edit">Edit</button>`
    list.querySelector('ul').appendChild(li);

};

function listdata(list){
    const arr = list.split('-');
    const l = arr[arr.length-1];
    arr.pop();
    const categ = l.split(' ');
    arr.push(categ[1]); 
    return arr;
}

const edit = document.getElementsByClassName('edit');
list.addEventListener('click', (e) => {
    if(e.target.classList.contains('edit')){
        const id = e.target.getAttribute('data-id');
        const text = e.target.parentElement.textContent;
        fid.value = id;
        amt.value = parseInt(listdata(text)[0]);
        desc.value = listdata(text)[1];
        catg.value = listdata(text)[2];
        console.log(id);

    }
});
