         let new_ele=document.getElementById("value");
         let duedate=document.getElementById("due_date")
         let start_time=document.getElementById("start_time")
         let end_time=document.getElementById("end_time")
         let list=document.getElementById("list");
         let btn=document.getElementById("btn");
         let description=document.getElementById("description")
         let assigned=document.getElementById("assigned")
         let button2=document.getElementsByClassName("button2")
         let button1=document.getElementsByClassName("button1")
         let first=document.getElementsByClassName("first")
         let form_div=document.getElementsByClassName("form")
         
         function getTodayDate() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            return yyyy + '-' + mm + '-' + dd;
          }
          document.getElementById('assigned').value = getTodayDate();
         let form=document.getElementById("form")
         form.addEventListener('submit',formsubmit)
         function formsubmit(e){
            e.preventDefault();
         }
        // console.log(button1)
        
        button1[0].addEventListener("click",fun1)
        function fun1(){
            button1[0].style.display="none";
            button2[0].style.display="block";
            first[0].style.display="block";
            form_div[0].style.display="none";

        }
        button2[0].addEventListener("click",fun2)
        function fun2(){
            button1[0].style.display="block";
            button2[0].style.display="none";
            first[0].style.display="none";
            form_div[0].style.display="block";
        }
         let todo=[];
         class Todo{
            constructor(value,d,flag,id,dis,assigned_date,st,et){
                this.value=value,
                this.flag=flag,
                this.id=id,
                this.due_date=d,
                this.description=dis,
                this.assigned_date=assigned_date,
                this.start_time=st,
                this.end_time=et
            }
         }
         window.addEventListener("load",load);
        async function load()
         {
            
            let ele=[];
                try {
                    const response = await fetch("http://127.0.0.1:5000/fetchall", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                    });
                    if (response) {
                      const d = await response.json()
                      ele=d;
                      console.log(ele)
                      todo.push(d);
                      console.log(todo)
                    }
                  } catch (err) {
                    swal({
                        title:'Something went wrong',
                        icon:'warning'
                    })
                  }
            console.log(ele)
            for(let j=0;j<ele.length;j++)
            {
                
                create(ele[j].task,ele[j].due_date,ele[j].flag,ele[j].id,ele[j].description,ele[j].assigned,ele[j].start_time,ele[j].end_time);
                
            }
        }
         
     btn.addEventListener("click",function(event)
         { 
            function getTodayDate() {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                var yyyy = today.getFullYear();
                return yyyy + '-' + mm + '-' + dd;
              }
            
                if(new_ele.value.trim()==""||duedate.value.trim()==""||description.value.trim()==""||start_time.value==""||end_time.value=="")
                {
                    swal({
                        title:"Please Fill out all the fields",
                        icon:'warning'
                    })
                    document.getElementById('assigned').value = getTodayDate();
                 }
                  if(new_ele.value.trim().length>=50){
                     swal.fire({
                        title:"Enter Task Name of lenght less than 50",
                        icon:'warning'
                     })
                     document.getElementById('assigned').value = getTodayDate();
                 }
                  if(description.value.trim().length>=200){
                    swal.fire({
                       title:"Enter Task Name of lenght less than 200",
                       icon:'warning'
                    })
                    document.getElementById('assigned').value = getTodayDate();
                }
                  if(!isDateValid(duedate.value)){
                      swal({
                        title:"Please enter valid date",
                        icon:'warning'
                      })
                      document.getElementById('assigned').value = getTodayDate();
                 }
                 if(start_time.value>=end_time.value){
                  swal({
                    title:"Please Enter Valid Timing",
                    icon:'warning'
                  })
                  document.getElementById('assigned').value = getTodayDate();
                 }
               else{
                
                  document.getElementById('assigned').value = getTodayDate();
                  console.log(start_time.value)
                  console.log(end_time.value)
                   createtodo(new_ele.value.trim(),duedate.value,'Assigned',description.value.trim(),assigned.value,start_time.value,end_time.value);
                      new_ele.value="";
                      duedate.value=""; 
                      description.value="";   
                      start_time.value="";
                      end_time.value=""
                }
         });
         function isDateValid(dateString) {
            const [year, month, day] = dateString.split('-').map(Number);
            const inputDate = new Date(year, month - 1, day); 
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            console.log(currentDate)
            assigned.value=currentDate;
            return inputDate >= currentDate;
        }
        function createtodo(value,d,a,dis,ass_d,st,et)
        {
            let id=Date.now();
            create(value,d,a,id,dis,ass_d,st,et);
            store(value,d,a,id,dis,ass_d,st,et);
        }
        function create(value,d,a,id,dis,ass_d,st,et)
        {
          //  console.log(a)
          console.log(st,et);
          if(a=='Assigned'){

            var container = document.getElementById('Assigned');
          }
          if(a=='Pending'){
            var container = document.getElementById('Pending');
          }
          if(a=='Completed'){
            var container = document.getElementById('Completed');
          }
  var taskContainer = document.createElement('div');
  taskContainer.classList.add('task-container');
  taskContainer.id=id;
  taskContainer.draggable=true;
  taskContainer.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text/plain', id);
});
  // Task Name
  var taskNameLabel = document.createElement('label');
  taskNameLabel.textContent = 'Task Name:';
  taskContainer.appendChild(taskNameLabel);
  var taskNameInput = document.createElement('input');
  taskNameInput.type = 'text';
  taskNameInput.value = value;
  taskNameInput.readOnly = true;
  taskContainer.appendChild(taskNameInput);
  taskContainer.appendChild(document.createElement('br'));

  // Description
  var descriptionLabel = document.createElement('label');
  descriptionLabel.textContent = 'Description:';
  taskContainer.appendChild(descriptionLabel);
  var descriptionInput = document.createElement('input');
  descriptionInput.type = 'text';
  descriptionInput.value = dis;
  descriptionInput.readOnly = true;
  taskContainer.appendChild(descriptionInput);
  taskContainer.appendChild(document.createElement('br'));

  // Due Date
  var dueDateLabel = document.createElement('label');
  dueDateLabel.textContent = 'Due Date:';
  taskContainer.appendChild(dueDateLabel);
  var dueDateInput = document.createElement('input');
  dueDateInput.type = 'date';
  dueDateInput.value=d;
  dueDateInput.readOnly = true;
  taskContainer.appendChild(dueDateInput);
  taskContainer.appendChild(document.createElement('br'));
   
  var startlabel = document.createElement('label');
  startlabel.textContent = 'start Time:';
  taskContainer.appendChild(startlabel);
  var startInput = document.createElement('input');
  startInput.type = 'time';
  startInput.value = st;
  startInput.readOnly = true;
  taskContainer.appendChild(startInput);
  taskContainer.appendChild(document.createElement('br'));


  var endlabel = document.createElement('label');
  endlabel.textContent = 'End Time:';
  taskContainer.appendChild(endlabel);
  var endInput = document.createElement('input');
  endInput.type = 'time';
  endInput.value = et;
  endInput.readOnly = true;
  taskContainer.appendChild(endInput);
  taskContainer.appendChild(document.createElement('br'));
  // Assigned Date
  var assignedDateLabel = document.createElement('label');
  assignedDateLabel.textContent = 'Assigned Date:';
  taskContainer.appendChild(assignedDateLabel);
  var assignedDateInput = document.createElement('input');
  assignedDateInput.type = 'date';
  assignedDateInput.value=ass_d;
  assignedDateInput.readOnly = true;
  taskContainer.appendChild(assignedDateInput);
  taskContainer.appendChild(document.createElement('br'));
  
  
  var editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.classList.add('edit-button');
  editButton.addEventListener('click', function() {
      taskNameInput.readOnly = false;
      descriptionInput.readOnly = false;
      dueDateInput.readOnly = false;
      startInput.readOnly=false;
            endInput.readOnly=false;
      
    });
    let deleteButton=document.createElement('button');
    deleteButton.textContent='Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click',function(e){
        cut(e)
    })
    editButton.addEventListener('click',function(){
        if (editButton.textContent === 'Edit') {
            taskNameInput.readOnly = false;
            descriptionInput.readOnly = false;
            dueDateInput.readOnly = false;
            startInput.readOnly=false;
            endInput.readOnly=false;
            editButton.textContent = 'Save';
        } else {
          if(taskNameInput.value.trim()==""||dueDateInput.value.trim()==""||descriptionInput.value.trim()==""||startInput.value==""||endInput.value==""){
            swal({
                title:"Please Fill out all the fields",
                icon:'warning'
            })
        }
        else{
            const data={'task':taskNameInput.value.trim(),'due_date':dueDateInput.value,'description':descriptionInput.value.trim(),'id':id,'flag':a,'assigned_date':ass_d,'start_time':startInput.value,'end_time':endInput.value}
            edit(data);
            editButton.textContent = 'Edit';
            taskNameInput.readOnly = true;
      descriptionInput.readOnly = true;
      dueDateInput.readOnly = true;
      assignedDateInput.readOnly = true;
      startInput.readOnly=true;
            endInput.readOnly=true;
        }
      }
    });
    let label=document.createElement('label')
    label.textContent=a;
    label.classList.add('status');
    taskContainer.appendChild(editButton);
    taskContainer.appendChild(deleteButton);
    taskContainer.appendChild(label);
    container.appendChild(taskContainer);

        }
        async function edit(data){
            
                try {
                    const response = await fetch("http://127.0.0.1:5000/update", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ data:data }),
                    });
            
                    if (response.status===200) {
                     swal({title:"Task updated Successfully",
                          icon:"success"})
                          // edit_v=false;
                    }
                    if(response.status===500 ||response.status===304){
                        swal({title:"something went wrong ",
                               icon:"warning"})
                    
                    }
                  } catch (err) {
                    
                    swal({
                        title:'Something went wrong',
                        icon:'warning'
                    })
                  }
            
        }  
        async function store(value,d,a,id,dis,ass_d,st,et)
        {
            const new_todo=new Todo(value,d,a,id,dis,ass_d,st,et)
            console.log(new_todo)
            todo=[...todo,new_todo]
            console.log(todo)
            try {
                const response = await fetch("http://127.0.0.1:5000/insert", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ data:new_todo }),
                });
        
                if (response.status===200) {
                swal({title:"Task Added ",
                      icon:"success"})
                }
                if(response.status===500){
                    swal({title:"Something went wrong ",
                           icon:"success"})
                }
              } catch (err) {
                swal({
                    title:'Something went wrong',
                    icon:'warning'
                })
              }
        }
       async function cut(e)
        {
            console.log(e.target.parentNode.id)
            let id=e.target.parentNode.id;
            try {
                const response = await fetch("http://127.0.0.1:5000/delete", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ id:id }),
                });
        
                if (response.status===200) {
                 swal({title:"Task Deleted Successfully",
                      icon:"success"})
                }
                if(response.status===500 ||response.status===304){
                    swal({title:"something went wrong ",
                           icon:"warning"})
                
                }
              } catch (err) {
                
                swal({
                    title:'Something went wrong',
                    icon:'warning'
                })
              }
                todo=todo.filter((todo2)=>{
                return todo2.id!=e.target.parentNode.id
            })
            e.target.parentNode.remove();
        }
        
      async function box(r) {
            let id = r.target.parentNode.parentNode.id;
            console.log(id)
            console.log(todo)
            let todoItem=[]
            for(let i=0;i<todo[0].length;i++){
                if(todo[0][i].id===id){
                   todoItem.push(todo[0][i])
                }
            }
            console.log(todoItem)
            if (r.target.checked) {
                if (todoItem) {
                    todoItem[0].flag = 1;
                }
                r.target.parentNode.parentNode.querySelector("span").classList.add('deco');
                console.log(todoItem)
            } else {
                if (todoItem) {
                    todoItem[0].flag = 0;
                }
                console.log(todoItem)
                r.target.parentNode.parentNode.querySelector("span").classList.remove('deco');
            }
            try {
                const response = await fetch("http://127.0.0.1:5000/checked", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ data:todoItem }),
                });
        
                if (response.status===200) {
                 swal({title:"Task updated Successfully",
                      icon:"success"})
                }
                if(response.status===500 ||response.status===304){
                    swal({title:"something went wrong ",
                           icon:"warning"})
                
                }
              } catch (err) {
                
                swal({
                    title:'Something went wrong',
                    icon:'warning'
                })
              }
        
        }
        function allowDrop(event) {
            event.preventDefault();
          }
          
          function drag(event) {
            event.dataTransfer.setData("text", event.target.id);
          }
          
         async function drop(event,status) {
            event.preventDefault();
            var data = event.dataTransfer.getData("text");
            var c = document.getElementById(status)
            try {
              const response = await fetch("http://127.0.0.1:5000/checked", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id:data,status:status }),
              });
      
              if (response.status===200) {
               swal({title:"Task updated Successfully",
                    icon:"success"})
              }
              if(response.status===500 ||response.status===304){
                  swal({title:"something went wrong ",
                         icon:"warning"})
              
              }
            } catch (err) {
              
              swal({
                  title:'Something went wrong',
                  icon:'warning'
              })
            }
      
            var taskContainer = document.getElementById(data);
            taskContainer.querySelector('.status').textContent = status;
            c.appendChild(document.getElementById(data));
          }
       