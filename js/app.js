
/*
*  The app will consist of a form with input elements to add new contacts and a multi­select  element to list them. 
*  ● Create input elements so that the user can add a 'name' and a 'telephone' value
*   for a  new contact and click 'add' button which adds contact to the multi­select element. 
*  ● Data in each select option tag can be stored anyway you like ­ there are many ways, so  get creative 
*  ● Once contacts exist in the multi­select element, the user should be able to select and  press a 'delete' 
*  button to remove multiple at a time  ● Add a button to sort contacts by name in the multi­select element 
*  ● Add another button to sort contacts by telephone in the multi­select element 
*  Bonus:   ● Use additional fields aside from name and telephone and allow sorting on them, ie: last  name 
*  ● Use native JavaScript to generate all DOM elements 
*  ● Minimize/eliminate use of JQuery ­ this test is meant to evaluate your core 
*  JavaScript  skills without relying on frameworks 
*  ● Write your app in an object­oriented approach ­ use objects, define object properties and  use them 
*  ● Be as efficient as possible 
*  ● Avoid hoisting  Restrictions: 
*  ● The application is to be written in a single index.html file
*    ● Optionally, include a single style.css, scripts.js, and just jQuery ­ no other  libraries/frameworks are permitted */

/*Our biggest hurdle with incoming submissions is that almost all of them (if not all)
 are not using a <select multiple> html element to display contacts as we have requested,
 thus candidates are spending more time building elaborate tables which are completely irrelevant,
 taking time away from them focusing on the import code. */


var progress = $('.meter span').width(); //Store the width progress bar
var incompleteMilestones = $('#incomplete-tasks li').length;  //Get the length of incompleted task
var completeMilestones = $('#completed-tasks li').length; //Get length of complted task

$(function() {
 $(".meter > span").each(function() {
   $(this).data("origWidth", $(this).width()).width(0)
     .animate({
       width: $(this).data("origWidth")
     }, 1200);
 });
});

var progressWidth = 0;

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0];//addTask
var completedTasksHolder = document.getElementById("completed-tasks"); //complete task with id #completed-task
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //imcomplete task with id #incomplete-task

//New task list item
var createNewTaskElement = function(taskString){
  //Create list item
  var listItem = document.createElement("li");

  //Attach an input
  var checkbox = document.createElement("input"); //checkbox
      //Label
  var label = document.createElement("label");
      //input of type text
  var editInput = document.createElement("input"); //textbox
      //button.edit
  var editButton = document.createElement("button");
      //button.delete
  var deleteButton = document.createElement("button");

   //Each elements needs to be modified
  checkbox.type = "checkbox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  deleteButton.innerText = "Delete";
  editButton.className = "edit";
  deleteButton.className = "delete";

  label.innerText = taskString;

  //Each element needs appending
  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);


  return listItem;
}

var appendWarning = function(parent){
    var warn = document.createElement("p");
    warn.innerText = "Can't create an Empty Task";
    warn.style.color = "red";
    if (parent.querySelector("p")){
    }
    else{
      parent.appendChild(warn);
    }
}

//Add new task
var addTask = function(){
var parent =  this.parentNode;
  if(parent === undefined){
     parent= document.getElementsByTagName("p")[0];
  }
 if (taskInput.value === "" ){
   var warn = appendWarning(parent);
 }
 else{
    //Create a new list of the item with the text from #new-item:
 var listItem = createNewTaskElement(taskInput.value);
 //Append list Item to the Incomplete taskHolder
   incompleteTasksHolder.appendChild(listItem);
   bindTaskEvents(listItem, completedTask);
   taskInput.value = "";
   var checkForP = parent.querySelector("p");
   if (checkForP){
      parent.removeChild(checkForP);
    }
  }
}


function handleKeyPress(e){
 var key=e.keyCode || e.which;
  if (key==13){
     addTask();
  }
}

//Edit Existing task
var editTask = function(){
  //If the class of the parent is .editMode
 var listItem = this.parentNode;
 var editInput = listItem.querySelector("input[type=text]");
 var label = listItem.querySelector("label");
 var containsClass = listItem.classList.contains("editMode");
 var editButton = listItem.querySelector("button.edit");

  if (containsClass){
    //Switch from .editMode
    //Label text becomes the input value
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  }
  else{
     //Switch to .editMode
    //Input value becomes the labels text
    editInput.value = label.innerText ;
    editButton.innerText = "Save";

  }
  //toggle editmode on the list item
  listItem.classList.toggle("editMode");
}


//Delete and exisiting task
var deleteTask = function(){
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul
  ul.removeChild(listItem);
}


//Mark a task as complete
var completedTask = function(){
  //Append the task to the #complete-task
  var listItem = this.parentNode;
  progressWidth += 100/incompleteMilestones;
  completedTasksHolder.appendChild(listItem);
  $('.meter span')[0].style.width = progressWidth+'%';
  bindTaskEvents(listItem,incompletedTask);
}

//Mark a task as incomplete
var incompletedTask = function(){
  // Append it to the #incomplete-task
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  progressWidth -= 100/incompleteMilestones;
  $('.meter span')[0].style.width = progressWidth+ '%';
  bindTaskEvents(listItem,completedTask);
}

var bindTaskEvents = function (taskListItem, checkboxEventHandler){
   //Select its children
  var checkbox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  // Bind the editTask to edit button
  editButton.onclick = editTask;
  //Bind the deleteTask to the delete button
  deleteButton.onclick = deleteTask;
  //Bind to the checkboxEventHandler checkbox
  checkbox.onchange = checkboxEventHandler;
}
var ajaxRequest = function(){

}

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);



//Cycle over the incompleteTaskHolder ul items
for(var i = 0 ; i < incompleteTasksHolder.children.length; i++){
    bindTaskEvents(incompleteTasksHolder.children[i], completedTask);
    //bind events to list items children  (taskIncompleted)
}

//Cycle over the completeTaskHolder ul items
  for(var i = 0 ; i < completedTasksHolder.children.length; i++){
  //For each list item
    //bind events to list items children  (taskIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], incompletedTask);
}
