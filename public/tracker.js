var amt = document.getElementById('amount');
var desc = document.getElementById('description');
var catg = document.getElementById('category');
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
    li.innerHTML= `${user.amount} - ${user.description} - ${user.category} <a href="delete/${user.id}" class="btn btn-danger float-right py-1">Delete</a><a href="edit/${user.id}" class="btn btn-primary float-right mr-3 py-1">Edit</a>`
    list.querySelector('ul').appendChild(li);

}
