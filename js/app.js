// Method for async call and convert json data to javascript data
const fetchData = () => {
    console.log(document.getElementById("datetime1").value);
    hideElements();
    console.log("abc");
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function(response) {
        if(this.status === 200) {

            const data = this.responseText;
            const todoList = JSON.parse(data);

            addContent(todoList);
        }
        
    });

    xhr.open('GET', 'data/todo.json');
    xhr.send();
}

fetchData();

// Method to add json data to to do list
const addContent = (todoList = []) => {

    const ul = document.getElementById('ulList');
    todoList.forEach(list => addToDo(list.title, list.description, list.dueDate, list.time, ul));
    const wrapperDiv = document.getElementById('liDiv');
    wrapperDiv.appendChild(ul);

}

//Method to create new LI its child tags loaded with input
const addToDo = (title, description, dueDate, time, parent) => {

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("toDoDivLi");

    const li = document.createElement('li');
    li.classList.add('toDoLi');

    const details = document.createElement('details');
    const summary = document.createElement('summary');      
    const desc = document.createElement('p');
    const dateTime = document.createElement('p');

    summary.textContent = `${title}`;
    desc.textContent = `Description : ${description}`;
    dateTime.textContent = `Due Date : ${dueDate} ::::::::      Time : ${time}`;

    parent.appendChild(todoDiv);
    todoDiv.appendChild(li);
    li.appendChild(details);
    details.appendChild(summary);
    details.appendChild(desc);
    details.appendChild(dateTime);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    summary.classList.add("summaryToDo");
    summary.appendChild(completedButton);
    strikeThrough(completedButton, summary);
}

// Method to mark a to do element as completed
function strikeThrough(item, summary) {
    item.addEventListener("click", function() {
        if(summary.style.textDecorationLine === "line-through") {
            summary.style.textDecorationLine = "none";
        }
        else {
            summary.style.textDecorationLine = "line-through";
        }

    })
  };


const addNewLi = () => {

    const errorP =  document.getElementById('error');
    errorP.style.color = "red";

    if(document.getElementById('idTitle').value === '') {
        document.getElementById('error').innerHTML = "Title Cannot be empty";
        return;
    }
    else if(document.getElementById('idDescription'). value === '') {
        document.getElementById('error').innerHTML = "Description Cannot be empty";
        return;
    }
    else if(document.getElementById('datetime1'). value === '') {
        document.getElementById('error').innerHTML = "Due date and Time cannot be empty";
        return;
    }

    let titleScreen = document.getElementById('idTitle').value;
    let descScreen = document.getElementById('idDescription').value;
    
    let dateTimeScreen = document.getElementById('datetime1').value;
    let dateTimeArray = dateTimeScreen.split("T");

    let dueDateScreen = dateTimeArray[0];
    let timeScreen = dateTimeArray[1];

    const ul = document.getElementById('ulList');
    addToDo(titleScreen, descScreen, dueDateScreen, timeScreen, ul);
    const wrapperDiv = document.getElementById('liDiv');
    wrapperDiv.appendChild(ul);
    
    hideElements();
}

// Method to show search box
function showElements() {
    const divNode = document.getElementById('wrapper');
    divNode.style.display = "block";
}

// Method to hide search box
function hideElements() {
    const divNode = document.getElementById('wrapper');
    divNode.style.display = "none";
}

const showBtn = document.getElementById('show-btn');
showBtn.addEventListener('click', addNewLi);


const todoList = document.getElementsByTagName("summary");
for(i=0;i<todoList.length;i++){
    console.log(i);

}
// todoList[0].addEventListener('click', markComplete);

function markComplete(e) {

    const item = e.target;
    console.log(item.parentElement , 'aaaaaaaaaaa--------');
    const todoParent = item.parentElement;
    todoParent.innerText = "Completed";
    // if(item.classList[0] === 'complete-btn') {
    //     const todoParent = item.parentElement;
    //     todoParent.classList.toggle("completed");
    // }
}