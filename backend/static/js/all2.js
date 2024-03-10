// let todoListContainer = document.getElementById('todo-list-body');
// let addTaskBtn = document.getElementById('add-task-btn');
// let index=0;
let count,offset=0,limit=10,currentPage=1;
window.addEventListener("load",load);
async function load(){
    try {
        const response = await fetch("http://127.0.0.1:5000/count", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const d = await response.json()
          count=d[0].count;
          createnumbering(count, 10);
          console.log(count)
        //   todo.push(d);
        //   console.log(todo)
        }
      } catch (err) {
        swal({
            title:'Something went wrong',
            icon:'warning'
        })
      }
      loadPage(currentPage);
//     let ele=[];
//     try {
//         const response = await fetch("http://127.0.0.1:5000/fetchsome", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body:JSON.stringify({limit:limit,offset:offset})
//         });
//         if (response.ok) {
//           const d = await response.json()
//           ele=d;
//           console.log(ele)
//           todo.push(d);
//           console.log(todo)
//         }
//       } catch (err) {
//         swal({
//             title:'Something went wrong',
//             icon:'warning'
//         })
//       }
// // console.log(ele)
// for(let j=0;j<ele.length;j++)
// {
    
//     create(ele[j].task,ele[j].due_date,ele[j].flag,ele[j].id,ele[j].description,ele[j].assigned);
    
// }
} 

    function createnumbering(totals, total) {
        $('#pagination').pagination({
            items: totals,
            itemsOnPage: total,
            onPageClick: function (pageNumber) {
                loadPage(pageNumber);
                currentPage = pageNumber;
            }
        });
    }
    
    async function loadPage(pageNumber) {
        const offset = (pageNumber - 1) * 10; // Assuming 10 items per page
        try {
            const response = await fetch("http://127.0.0.1:5000/fetchsome", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ limit: 10, offset: offset })
            });
            if (response.ok) {
                const data = await response.json();
                // Clear existing tasks
                document.getElementById('todo-list-container').innerHTML = '';
                // Create tasks for this page
                data.forEach(task => {
                    create(task.task, task.due_date, task.flag, task.id, task.description, task.assigned);
                });
            } else {
                throw new Error('Failed to fetch tasks');
            }
        } catch (err) {
            console.error('Error:', err);
            swal({
                title: 'Something went wrong',
                icon: 'warning'
            });
        }
    }

// createnumbering(count,10);
// function createnumbering(totals,total){

//   $('#pagination').pagination({    
//      items: totals, 
//      itemsOnPage: total,  
//      onPageClick: add,
//  });
//  }
// async function add(s)
//    {
//     console.log(s);
//       n=view_btn.value;
//       s=(s-1)*n;
//       let ele=[];
//       try {
//         const response = await fetch("http://127.0.0.1:5000/fetchsome", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body:JSON.stringify({limit:limit,offset:s})
//         });
//         if (response.ok) {
//           const d = await response.json()
//           ele=d;
//           console.log(ele)
//           todo.push(d);
//           console.log(todo)
//         }
//       } catch (err) {
//         swal({
//             title:'Something went wrong',
//             icon:'warning'
//         })
//       }
//       for(let j=0;j<ele.length;j++)
// {
    
//     create(ele[j].task,ele[j].due_date,ele[j].flag,ele[j].id,ele[j].description,ele[j].assigned);
    
// }
      // console.log(s);
    //   const request=new XMLHttpRequest();
    //   request.open("POST","/nextproducts");
    //   request.setRequestHeader("content-type","application/json");
    //   request.send(JSON.stringify({x:n,off:s}));
    //   request.addEventListener("load",()=>{
    //     const data=JSON.parse(request.responseText);
    //     let product = document.getElementById("products");
    //     product.innerHTML="";
    //     // off=+off+ parseInt(view_btn.value);
    //     // console.log(off);
    //     load_item(data);
        
    //   })
//   }
// }
// function create(task,due_date,flag,id,description,assigned){
//     const row = document.createElement('tr');
//     index++;
//     row.innerHTML = `
//         <td>${index}</td>
//         <td>${task}</td>
//         <td>${description}</td>
//         <td>${due_date}</td>
//         <td>${assigned}</td>
//         <td>${flag}</td>
//         <td>
//             <button class="edit-btn">Edit</button>
//             <button class="delete-btn">Delete</button>
//         </td>
//     `;
//     row.id=id;
//     todoListContainer.appendChild(row);
// }
// todoListContainer.addEventListener('click', function (event) {
//     if (event.target.classList.contains('edit-btn')) {
//         const row = event.target.parentNode.parentNode;
//         const cells = row.querySelectorAll('td');
//         cells.forEach((cell, index) => {
//             if (index === 1 || index === 3 || index === 2) {
//                 const cellValue = cell.textContent;
//                 cell.innerHTML = `<input type="text" value="${cellValue}" class="edit-task-input">`;
//             }
//         });
        
//         event.target.textContent = 'Save';
//         event.target.classList.add('save-btn');
//         event.target.classList.remove('edit-btn');
//     } else if (event.target.classList.contains('save-btn')) {
//         const row = event.target.parentNode.parentNode;
//         const cells = row.querySelectorAll('td');
//         const data = [];
//         cells.forEach((cell, index) => {
//             if (index === 0) { // Skip the first column
//                 return;
//             }
//             const inputField = cell.querySelector('.edit-task-input');
//             // console.log(inputField.value)
//             let v=inputField.value;
//             const newValue = v;
//             // const key = cell.dataset.field; // Assuming you have a data-field attribute to identify the field
//             // data[key] = newValue;
//             data.push(newValue)
//         });
//       console.log(data);
//         // const row = event.target.parentNode.parentNode;
//         // const cells = row.querySelectorAll('td');

        
//         // cells.forEach(cell => {
//         //     if (!cell.classList.contains('options')) { // Exclude the options cell
//         //         const newValue = cell.querySelector('.edit-task-input').value;
//         //         if(newValue.trim()==""){
//         //             swal({
//         //                 title:'Fill out all the fileds',
//         //                 icon:'warning'
//         //             })
//         //         }
//         //         else{
                    
//         //             cell.textContent = newValue;
//         //             console.log(newValue)
//         //         }
//         //     }
//         // });

//         // // Change save button text back to "Edit"
//         // event.target.textContent = 'Edit';
//         // event.target.classList.remove('save-btn');
//         // event.target.classList.add('edit-btn');

//         // Implement logic to save/update task in the database
//     } else if (event.target.classList.contains('delete-btn')) {
//         // Implement delete functionality
//     }
// });
function create(value,d,a,id,dis,ass_d)
        {
          //  console.log(a)
          
            var container = document.getElementById('todo-list-container');
          
  var taskContainer = document.createElement('div');
  taskContainer.classList.add('task-container');
  taskContainer.id=id;
//   taskContainer.draggable=true;
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
            editButton.textContent = 'Save';
        } else {
            const data={'task':taskNameInput.value.trim(),'due_date':dueDateInput.value,'description':descriptionInput.value.trim(),'id':id,'flag':a,'assigned_date':ass_d}
            edit(data);
            editButton.textContent = 'Edit';
            taskNameInput.readOnly = true;
      descriptionInput.readOnly = true;
      dueDateInput.readOnly = true;
      assignedDateInput.readOnly = true;
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
            // todo=todo.filter((todo2)=>{
            // return todo2.id!=e.target.parentNode.id
        // })
        e.target.parentNode.remove();
    }
  