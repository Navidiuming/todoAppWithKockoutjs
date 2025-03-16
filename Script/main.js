function newTask(name) {
  var self = this;
  self.taskName = name;
  self.iscompleted = false;
  self.isEditing = false;
  self.isActive = ko.observable(false);
  self.isHide = ko.observable(true);
}

function AppViewModel() {
  var self = this;
  self.tasks = ko.observableArray([]);
  this.newTaskText = ko.observable("");

  self.loadTask = function () {
    let savedTaskInLocalStorage = localStorage.getItem("tasks");
    if (savedTaskInLocalStorage) {
      let savedTaskInLocalStorageToParse = JSON.parse(savedTaskInLocalStorage);
      this.tasks(
        savedTaskInLocalStorageToParse.map((task) => {
          let newTaskInstance = new newTask(task.taskName);
          newTaskInstance.iscompleted = task.iscompleted;
          newTaskInstance.isActive(task.iscompleted);
          return newTaskInstance;
        })
      );
    }
  };

  this.loadTask();
  self.addTask = function () {
    let task = this.newTaskText().trim();
    if (task != "") {
      this.tasks.push(new newTask(task));
    }
    this.saveTask();
    this.newTaskText("");
  };

  self.deletTask = function (task) {
    this.tasks.remove(task);
    this.saveTask();
  };

  self.saveTask = function () {
    localStorage.setItem("tasks", ko.toJSON(this.tasks()));
  };
  this.done = function (task) {
    console.log(task);
    task.iscompleted = !task.iscompleted;
    task.isActive(task.iscompleted);
    this.saveTask();
  };
}

self.edit = function (task) {
    console.log(self);
    console.log(this);
    console.log("hi");
    task.isHide(task.isEditing);
    task.isEditing = !task.isEditing;
};

ko.applyBindings(new AppViewModel());
