window.addEventListener("load", load);

let count, offset = 0, limit = 10, currentPage = 1;

async function load() {
    try {
        const response = await fetch("http://127.0.0.1:5000/count", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            const d = await response.json()
            count = d[0].count;
            createnumbering(count, 10);
            console.log(count)
        } else {
            throw new Error('Failed to fetch total count');
        }
    } catch (err) {
        console.error('Error:', err);
        swal({
            title: 'Something went wrong',
            icon: 'warning'
        })
    }
    loadPage(currentPage);
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
    const offset = (pageNumber - 1) * 10; 
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
                console.log(task)
                create(task.task, task.due_date, task.flag, task.id, task.description, task.assigned,task.start_time,task.end_time);
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

function create(value, d, a, id, dis, ass_d,st,et) {
    console.log(st,et)
    var container = document.getElementById('todo-list-container');

    var taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');
    taskContainer.id = id;

    var taskNameLabel = document.createElement('label');
    taskNameLabel.textContent = 'Task Name:';
    taskContainer.appendChild(taskNameLabel);
    var taskNameInput = document.createElement('input');
    taskNameInput.type = 'text';
    taskNameInput.value = value;
    taskNameInput.readOnly = true;
    taskContainer.appendChild(taskNameInput);
    taskContainer.appendChild(document.createElement('br'));

    var descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description:';
    taskContainer.appendChild(descriptionLabel);
    var descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.value = dis;
    descriptionInput.readOnly = true;
    taskContainer.appendChild(descriptionInput);
    taskContainer.appendChild(document.createElement('br'));

    var statusLabel = document.createElement('label');
    statusLabel.textContent = 'Status:';
    statusLabel.appendChild(document.createElement('br'));

    taskContainer.appendChild(statusLabel);
    var statusInput = document.createElement('select');
    statusInput.classList.add("select")
    statusInput.classList.add("status")
    // statusInput.type = 'text';
    // descriptionInput.value = dis;
    // descriptionInput.readOnly = true;
    var option1 = document.createElement('option');
    option1.value = 'Assigned';
    option1.textContent = 'Assigned';
    option1.disabled=true;
    statusInput.appendChild(option1);

    var option2 = document.createElement('option');
    option2.value = 'Pending';
    option2.textContent = 'Pending';
    option2.disabled=true;
    statusInput.appendChild(option2);

    var option3 = document.createElement('option');
    option3.value = 'Completed';
    option3.textContent = 'Completed';
    option3.disabled=true;
    statusInput.appendChild(option3);
    statusInput.value=a;
    // statusInput.readOnly=true;
    taskContainer.appendChild(statusInput);
    taskContainer.appendChild(document.createElement('br'));

    var dueDateLabel = document.createElement('label');
    dueDateLabel.textContent = 'Due Date:';
    taskContainer.appendChild(dueDateLabel);
    var dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.value = d;
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
//   taskContainer.appendChild(document.createElement('br'));


  var endlabel = document.createElement('label');
  endlabel.textContent = 'End Time:';
  taskContainer.appendChild(endlabel);
  var endInput = document.createElement('input');
  endInput.type = 'time';
  endInput.value = et;
  endInput.readOnly = true;
  taskContainer.appendChild(endInput);
//   taskContainer.appendChild(document.createElement('br'));
  

    var assignedDateLabel = document.createElement('label');
    assignedDateLabel.textContent = 'Assigned Date:';
    taskContainer.appendChild(assignedDateLabel);
    var assignedDateInput = document.createElement('input');
    assignedDateInput.type = 'date';
    assignedDateInput.value = ass_d;
    assignedDateInput.readOnly = true;
    taskContainer.appendChild(assignedDateInput);
    taskContainer.appendChild(document.createElement('br'));

    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', function () {
        taskNameInput.readOnly = false;
        descriptionInput.readOnly = false;
        dueDateInput.readOnly = false;
        option1.disabled=false;
        option2.disabled=false;
        option3.disabled=false;
        startInput.disabled=false;
        endInput.disabled=false;
    });
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function (e) {
        cut(e)
    })
    editButton.addEventListener('click', function () {
        if (editButton.textContent === 'Edit') {
            taskNameInput.readOnly = false;
            descriptionInput.readOnly = false;
            dueDateInput.readOnly = false;
            option1.disabled=false;
        option2.disabled=false;
        option3.disabled=false;
        startInput.readOnly=false;
        endInput.readOnly=false;
            editButton.textContent = 'Save';
        } else {
            if(taskNameInput.value.trim()==""||dueDateInput.value.trim()==""||descriptionInput.value.trim()==""||statusInput.value==""||startInput.value==""||endInput.value==""){
                swal({
                    title:"Please Fill out all the fields",
                    icon:'warning'
                })
            }
            else{
            const data = { 'task': taskNameInput.value.trim(), 'due_date': dueDateInput.value, 'description': descriptionInput.value.trim(), 'id': id, 'flag': statusInput.value, 'assigned_date': ass_d,'start_time':startInput.value,'end_time':endInput.value }
            edit(data);
            editButton.textContent = 'Edit';
            taskNameInput.readOnly = true;
            descriptionInput.readOnly = true;
            dueDateInput.readOnly = true;
            assignedDateInput.readOnly = true;
            option1.disabled=true;
            option2.disabled=true;
            option3.disabled=true;
            startInput.readOnly=true;
            endInput.readOnly=true;
            }
        }
    });
    // let label = document.createElement('label')
    // label.textContent = a;
    // label.classList.add('status');
    taskContainer.appendChild(editButton);
    taskContainer.appendChild(deleteButton);
    // taskContainer.appendChild(label);
    container.appendChild(taskContainer);
}

async function edit(data) {
    try {
        const response = await fetch("http://127.0.0.1:5000/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: data }),
        });

        if (response.status === 200) {
            swal({
                title: "Task updated Successfully",
                icon: "success"
            })
        }
        if (response.status === 500 || response.status === 304) {
            swal({
                title: "something went wrong ",
                icon: "warning"
            })
        }
    } catch (err) {
        swal({
            title: 'Something went wrong',
            icon: 'warning'
        })
    }

}

async function cut(e) {
    console.log(e.target.parentNode.id)
    let id = e.target.parentNode.id;
    try {
        const response = await fetch("http://127.0.0.1:5000/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id }),
        });

        if (response.status === 200) {
            swal({
                title: "Task Deleted Successfully",
                icon: "success"
            })
        }
        if (response.status === 500 || response.status === 304) {
            swal({
                title: "something went wrong ",
                icon: "warning"
            })
        }
    } catch (err) {
        swal({
            title: 'Something went wrong',
            icon: 'warning'
        })
    }
    // todo=todo.filter((todo2)=>{
    // return todo2.id!=e.target.parentNode.id
    // })
    e.target.parentNode.remove();
}
