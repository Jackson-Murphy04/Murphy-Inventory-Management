//run on page load
window.onload = async function() {
  const response = await fetch('/api');
  const data = await response.json();
  console.log(data)
  const response2 = await fetch('/apiOut');
  const data2 = await response2.json();
  console.log(data2);
  for (item of data) {
    const li = document.createElement('li');
    const name = document.createElement('span');
    const button = document.createElement('span');
    const break1 = document.createElement('br');
    const location = document.createElement('span');
    const break2 = document.createElement('br');
    const number = document.createElement('span');
    // add text content
    name.textContent = `${item.name1}`;
    button.textContent = 'Edit';
    location.textContent = `Location: ${item.location1}`;
    number.textContent = `On Hand: ${item.number1}`;
    //add classes
    name.classList.add("name");
    button.classList.add('button');
    location.classList.add("location");
    number.classList.add("number");
    // append to DOM
    document.getElementById('inventoryList').appendChild(li);
    li.appendChild(name);
    li.appendChild(button);
    li.appendChild(break1);
    li.appendChild(location);
    li.appendChild(break2);
    li.appendChild(number);
  }
  for (item of data2) {
    const li = document.createElement('li');
    const name = document.createElement('span');
    const button = document.createElement('span');
    const break1 = document.createElement('br');
    const break2 = document.createElement('br');
    // add text content
    name.textContent = `${item.name1}`;
    button.textContent = 'Add';
    //add classes
    name.classList.add("name");
    button.classList.add('button');
    // append to DOM
    document.getElementById('outSection').appendChild(li);
    li.appendChild(name);
    li.appendChild(button);
    li.appendChild(break1);
    li.appendChild(break2);
  }
 /*// create elements inventory
  const li = document.createElement('li');
  const name = document.createElement('span');
  const button = document.createElement('span');
  const break1 = document.createElement('br');
  const location = document.createElement('span');
  const break2 = document.createElement('br');
  const number = document.createElement('span');
  // add text content
  name.textContent = data;
  button.textContent = ;
  location.textContent = ;
  number.textContent = "On Hand: " + num;
  //add classes
  name.classList.add("name");
  button.classList.add('button');
  location.classList.add("location");
  number.classList.add("number");
  // append to DOM
  addLocal.appendChild(li);
  li.appendChild(name);
  li.appendChild(button);
  li.appendChild(break1);
  li.appendChild(location);
  li.appendChild(break2);
  li.appendChild(number);*/
}

//add new items section
const newItem = document.querySelector('#add');
const addLocal = document.querySelector('#inventory ul');
//const newItem2 = document.querySelector('#inventory');

var submitHandler = function() {
  // do stuff
  return false;
}

newItem.addEventListener('click', (e) => {
  if(e.target.className == 'button1'){
    alert(add2())
    document.getElementById("add-new").value = "";
  }
});

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      //e.preventDefault();
      if (document.getElementById("add-new").value != "") {
        alert(add2())
        document.getElementById("add-new").value = "";
      }
    }
}); 

function add2() {
  local = prompt("Where is the item located?");
  num = prompt("How many would you like to add?");
  num = parseInt(num);
  if(num > 0) {
    addfield2(num, local)
    return(num + " added to " + local);
  } else {
    return("Value invalid nothing was added.");
  }
}
async function addfield2(num, local) {
  // create elements
  const li = document.createElement('li');
  const name = document.createElement('span');
  const button = document.createElement('span');
  const break1 = document.createElement('br');
  const location = document.createElement('span');
  const break2 = document.createElement('br');
  const number = document.createElement('span');
  // add text content
  name.textContent = document.getElementById("add-new").value;
  button.textContent = "Edit";
  location.textContent = "Location: " + local;
  number.textContent = "On Hand: " + num;
  //add classes
  name.classList.add("name");
  button.classList.add('button');
  location.classList.add("location");
  number.classList.add("number");
  // append to DOM
  addLocal.appendChild(li);
  li.appendChild(name);
  li.appendChild(button);
  li.appendChild(break1);
  li.appendChild(location);
  li.appendChild(break2);
  li.appendChild(number);
  //save to data array
  name1 = document.getElementById("add-new").value;
  location1 = local;
  number1 = num;
  const data = {name1, location1, number1};
  console.log(data);
  //send to server
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const response = await fetch('/api', options);
  const json = await response.json();
  console.log(json);
}

//out of stock section
const addList = document.querySelectorAll('#out ul');
//button click listner 
Array.from(addList).forEach(function(item){
  item.addEventListener('click', (e) => {
    const nameOf = e.target.parentElement.firstChild;
    if(e.target.className == 'button'){
      //const nameOf = e.target.parentElement.firstChild.textContent;
      const li = e.target.parentElement;
      alert(add(nameOf, li));
      //const li = e.target.parentElement;
      //li.parentNode.removeChild(li);
    }
  });
});
function add(nameOf, li) {
  local = prompt('Where is the item located? (Enter: "Delete" to delete)');
	num = prompt('How many would you like to add? (Enter: "0" to delete)');
	num = parseInt(num);
  if(num > 0) {
    addfield(num, local, nameOf)
    li.parentNode.removeChild(li);
    return(num + " added to " + local);
  } else if (local === "Delete") {
    li.parentNode.removeChild(li);
    async function removeDB() {
      name1 = nameOf.textContent;
      const data2 = {name1}
      const options2 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data2)
      }

      const response2 = await fetch('/apiRemove', options2);
      const json2 = await response2.json();
    }
    removeDB()
    return("Item deleted.")
  } else {
    return("Value invalid nothing was added.");
  }
}
async function addfield(num, local, nameOf) {
  // create elements
  const li = document.createElement('li');
  const name = document.createElement('span');
  const button = document.createElement('span');
  const break1 = document.createElement('br');
  const location = document.createElement('span');
  const break2 = document.createElement('br');
  const number = document.createElement('span');
  // add text content
  //name.textContent = document.getElementById("creamCheese").textContent;
  name.textContent = nameOf.textContent;
  button.textContent = "Edit";
  location.textContent = "Location: " + local;
  number.textContent = "On Hand: " + num;
  //add classes
  name.classList.add("name");
  button.classList.add('button');
  location.classList.add("location");
  number.classList.add("number");
  // append to DOM
  addLocal.appendChild(li);
  li.appendChild(name);
  li.appendChild(button);
  li.appendChild(break1);
  li.appendChild(location);
  li.appendChild(break2);
  li.appendChild(number);
  //save to data array
  name1 = nameOf.textContent;
  location1 = local;
  number1 = num;
  const data = {name1, location1, number1};
  console.log(data);
  //send to server
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const response = await fetch('/api', options);
  const json = await response.json();
  console.log(json);

  const data2 = {name1}
  const options2 = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data2)
  }

  const response2 = await fetch('/apiRemove', options2);
  const json2 = await response2.json();
}

//inventory section
const removeList = document.querySelector('#inventory ul');
// edit button
removeList.addEventListener('click', (e) => {
  const change = e.target.parentElement.lastChild;
  const nameOf = e.target.parentElement.firstChild;
  const local = e.target.parentElement.childNodes[3];
  console.log(local);
  //change.textContent = "";
  if(e.target.className == 'button'){
      //const change = e.target.parentElement.lastChild;
      const li = e.target.parentElement;
      alert(add3(li, change, nameOf, local))
     //const li = e.target.parentElement;
      //li.parentNode.removeChild(li);
  }
});

function add3(li, change, nameOf, local) {
  num = prompt("How many do you have?");
  num = parseInt(num);
  if(num > 0) {
    field2(num, change, nameOf, local)
    return("Number updated.");
  } else if (num == 0) {
    const go = document.querySelector("#out ul")
    li.parentNode.removeChild(li);
    append(go, nameOf)
    return("Number updated.");
    //go.appendChild(li)
  } else {
    return("invalid number")
  }
  //return("Number updated.");
} 

async function append(go, nameOf){
  const li = document.createElement('li');
  const name = document.createElement('span');
  const button = document.createElement('span');
  const break1 = document.createElement('br');
  const break2 = document.createElement('br');

  name.textContent = nameOf.textContent;
  button.textContent = "Add";

  name.classList.add("name");
  button.classList.add('button');

  go.appendChild(li);
  li.appendChild(name);
  li.appendChild(button);
  li.appendChild(break1);
  li.appendChild(break2);
  //save to data array
  name1 = nameOf.textContent;
  const data = {name1};
  console.log(data);
  //send to server
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const response = await fetch('/apiOut', options);
  const json = await response.json();
  console.log(json);

  const data2 = {name1}
  const options2 = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data2)
  }

  const response2 = await fetch('/apiRemove2', options2);
  const json2 = await response2.json();
}

async function field2(num, change, nameOf, local) {
  oldNum = change.textContent
  change.textContent = "On Hand: " + num;
  //save to data array
  name1 = nameOf.textContent;
  number1 = num;
  localNew = local.textContent;
  localNew = localNew.substr(10)
  location1 = localNew; 
  const data = {name1, location1, number1};
  console.log(data);
  //send to server
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const response = await fetch('/api', options);
  const json = await response.json();
  console.log(json);

  oldNum = oldNum.replace(/\D/g, '');
  oldNum = parseInt(oldNum)
  number1 = oldNum
  const data2 = {name1, number1}
  const options2 = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data2)
  }

  const response2 = await fetch('/apiRemove3', options2);
  const json2 = await response2.json();
}


// filter books
const forms = document.forms;
const searchBar = forms['search'].querySelector('input');
searchBar.addEventListener('keyup', (e) => {
  const term = e.target.value.toLowerCase();
  const books = removeList.getElementsByTagName('li');
  Array.from(books).forEach((book) => {
    const title = book.firstElementChild.textContent;
    if(title.toLowerCase().indexOf(e.target.value) != -1){
      book.style.display = 'block';
    } else {
      book.style.display = 'none';
    }
  });
});

//checkbox
const box = document.querySelector('#switch');
box.addEventListener("change", function(e){
    if(box.checked) {
      console.log("did")
      dark();
    } else {
      undo();
    }
})

function dark() {
  //const body = document.getElementsByTagName("body");
  document.body.style.backgroundColor = '#3F3E3E';
  document.body.style.color = '#ccc';
  document.querySelector("#control").style.backgroundColor = '#aaa';
  document.querySelector("#add").style.backgroundColor = '#aaa';
  document.querySelector("#inventory").style.backgroundColor = '#aaa';
  document.querySelector("#out").style.backgroundColor = '#aaa';
  return("Dark Mode Activated")
}

function undo() {
  //const body = document.getElementsByTagName("body");
  document.body.style.backgroundColor = '#eee';
  document.body.style.color = '#000';
  document.querySelector("#control").style.backgroundColor = '#fff';
  document.querySelector("#add").style.backgroundColor = '#fff';
  document.querySelector("#inventory").style.backgroundColor = '#fff';
  document.querySelector("#out").style.backgroundColor = '#fff';
  return("Normal Mode Activated")
}

//canvas

var wrapper = document.getElementById('foologo-wrapper');
wrapper.innerHTML += '<canvas id="foologo" width="50" height="50"></canvas>';
var canvas = document.getElementById('foologo');
var c = canvas.getContext('2d');
var interval = 1;

c.fillStyle = 'rgba(255, 255, 255, 1)';
c.fillRect(0,0,200,200);

var render = function()
{
  
  c.fillStyle = 'rgba(255, 255, 255, 1)';
  c.fillRect(0,0,200,200);
  for(y = 20; y <= 160; y = y + 20)
  {
    for(x = 20; x <= 160; x = x + 20)
    {
      r = Math.floor((Math.random() * 3) + 1);
      switch(r)
      {
        case 1:
          c.fillStyle = 'rgba(17, 17, 17, 1)';
          break;
        case 2:
          c.fillStyle = 'rgba(255, 255, 255, 1)';
          break;
        default:
          c.fillStyle = 'rgba(255, 255, 255, 1)';
          break;
      }
      c.fillRect(x,y,20,20);
    }
  }
}

var main = function()
{
  render();
  
  if(interval < 100)
  {
    interval = interval + 1;
  }
  else if(interval < 200)
  {
    interval = interval + 10;
  }
  else if(interval < 300)
  {
    interval = interval + 20;
  }
  else
  {
    interval = interval + 100;
  }

  if(interval < 800)
  {
    setTimeout(function()
    {
      main();
    }, interval);
  }
}

main();




