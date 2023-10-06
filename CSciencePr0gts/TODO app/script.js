//Data Controller
var taskArray=new Array();

var Task = function(id, description){ //constructor for data structure task
    this.id = id;
    this.description = description;
};

function addTaskDataStructure(task){
    var newTask, ID;

    //for ID
    if(taskArray.length===0){
        ID=0;
    }
    else{
        ID= taskArray[taskArray.length-1].id + 1;//id of the last element in the array +1
    }

    //create new task
    newTask = new Task(ID, task);

    //push into data structure array
    taskArray.push(newTask);

    //return new task
    return newTask;
}


//UI Controller
var DOMStrings={
    addBtn: document.querySelector("#addData-btn"),
    data: document.querySelector("#data"),
    taskContainer: document.querySelector("#taskSection")
};

// APP Controller
function addTask(){
    var input, text, newTask;
    //get input from DOM
    input = DOMStrings.data;
    text = data.value;
    
    if(text){//validation
        //clearing text field
        DOMStrings.data.value="";
        //add data to data structure
        newTask = addTaskDataStructure(text);

        //dispaly data in UI
        addTaskUI(newTask);

        //clear input field - UI
    }
    
}

function addTaskUI(task){
    var html,newHtml,element;
    //create html with place holder text
//old    html= '<div class="container mb-1" id="%id%"><div class="row d-flex justify-content-center"><div class="col-lg-8 text-center"><span class="fs-5 me-2 " id="%id%-desc">%data%</span><button type="button" class="btn btn-outline-success btn-sm" id="taskComplete-btn"><i class="fa-solid fa-check" ></i></button><button type="button" class="btn btn-outline-danger btn-sm" id="taskDelete-btn"><i class="fa-solid fa-xmark"style="width: 12px;"></i></button> </div></div></div>';

    html = '<div class="container pb-1 mt-1" id="%id%"><div class="row d-flex justify-content-center "><div class="col-lg-5 col-md-4 col-sm-3 border-bottom pb-1"><span class="d-inline-flex justify-content-start"><span class="fs-5 me-2" id="%id%-desc">%data%</span></span></div><div class="col-1 border-bottom pb-1 d-flex"><button type="button" class="btn btn-outline-success btn-sm ms-2 me-2" id="taskComplete-btn"><i class="fa-solid fa-check" ></i></button><button type="button" class="btn btn-outline-danger btn-sm" id="taskDelete-btn"><i class="fa-solid fa-xmark"style="width: 12px;"></i></button> </div></div></div>'

    //Replace place holder data with actual data %id% with id and %data% with task desc
    newHtml = html.replace('%id%',task.id);//first the id of the whole block
    newHtml = newHtml.replace('%id%',task.id);//then the id of the text

    newHtml = newHtml.replace('%data%', task.description);


    //Insert html into dom
    element = DOMStrings.taskContainer;
    element.insertAdjacentHTML("beforeend",newHtml);
}

DOMStrings.addBtn.addEventListener("click",addTask);//when save button is pressed

document.addEventListener("keypress",function(key){
    if(key.keyCode === 13 || key.which ===13){
        addTask();
    }
});

DOMStrings.taskContainer.addEventListener("click",manageTask);

function manageTask(event){
    var taskId, element;
    //delete portion
    if(event.target.parentNode.id=="taskDelete-btn"){
        taskId=event.target.parentNode.parentNode.parentNode.parentNode.id

        if(taskId){
            //Delete for array of ds
            deleteTaskDS(taskId);
            

            //Delete from ui
            document.getElementById(taskId).remove();//using id to delete it from the document
        }
    }
    else if(event.target.parentNode.id==="taskComplete-btn"){
        taskId=event.target.parentNode.parentNode.parentNode.parentNode.id;
        //another method dor finding the desc (without using the id for the desc element)
    //    element = document.getElementById(taskId);
    //    element = element.firstElementChild.firstElementChild.firstElementChild.firstElementChild;

        //current method
        taskId = taskId + "-desc";
        element=document.getElementById(taskId);

        //adding/removing the class
        element.classList.toggle("text-decoration-line-through");
        

    }
}

function deleteTaskDS(ID){
    var ids, index;

    // Looking up ids and storing in an array
    ids=taskArray.map(function(task){
        return task.id;
    });
    // Searching for required index
    index = ids.indexOf(parseInt(ID));//parse converts string to int

    if(index !==-1){
        taskArray.splice(index,1);
    }
}