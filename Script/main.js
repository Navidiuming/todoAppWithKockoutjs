const container = document.querySelector('.container')
const input = document.querySelector('.userInputTask')


function newTask(name){
    var self = this;
    self.taskName = name;
    self.iscompleted = false;
}
function AppViewModel(){
    
    
    this.tasks = ko.observableArray([
    ]);
    this.addTask = function(){
        let task = input.value;
        task = task.trim();
        if( task !=""){

            let editBtn = document.createElement('button');
            editBtn.innerHTML = "edit";
            let deletBtn = document.createElement('button');
            deletBtn.innerHTML = 'delet';
            deletBtn.setAttribute("data-bind", "click:$root.deletTask");
            let doneBtn = document.createElement('button');
            doneBtn.innerHTML  = 'done';
            let p = document.createElement('p');
            p.innerHTML = task;

            let todoItemDiv = document.createElement('div');
            todoItemDiv.classList.add('todoItem');

            todoItemDiv.appendChild(p);
            todoItemDiv.appendChild(doneBtn);
            todoItemDiv.appendChild(deletBtn);
            todoItemDiv.appendChild(editBtn);

            container.appendChild(todoItemDiv);

            this.tasks.push( new newTask(task));
        }
        
        console.log(this.tasks());
        input.value = ""
    }

    this.deletTask = function(){
        //this.tasks.remove();
        console.log("hi");
    }
    
}

ko.applyBindings(new AppViewModel());