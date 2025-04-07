function newTask(name) {
  var self = this;
  self.taskName = ko.observable(name); // taskName حالا یک observable است
  self.iscompleted = ko.observable(false); //false;
  self.isEditing = ko.observable(false); // برای کنترل نمایش input ویرایش
  // self.isActive = ko.observable(false);
  self.isActive = ko.computed(function () {
    // isActive را computed کنید تا بر اساس iscompleted به‌روز شود
    return self.iscompleted();
  });
  self.editedTaskName = ko.observable(name); // برای نگهداری مقدار در حال ویرایش
}

function AppViewModel() {
  var self = this;
  self.tasks = ko.observableArray([]);
  this.newTaskText = ko.observable("");
  self.selectedFilter = ko.observable("all");

  self.loadTask = function () {
    let savedTaskInLocalStorage = localStorage.getItem("tasks");
    if (savedTaskInLocalStorage) {
      let savedTaskInLocalStorageToParse = JSON.parse(savedTaskInLocalStorage);
      this.tasks(
        savedTaskInLocalStorageToParse.map((task) => {
          let newTaskInstance = new newTask(task.taskName);
          newTaskInstance.iscompleted(task.iscompleted);
          // newTaskInstance.isActive(task.iscompleted);
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
    localStorage.setItem(
      "tasks",
      ko.toJSON(
        this.tasks().map((task) => ({
          taskName: task.taskName(), // گرفتن مقدار observable
          iscompleted: task.iscompleted()
        }))
      )
    );
  };

  this.done = function (task) {
    task.iscompleted (!task.iscompleted());
    // task.isActive(task.iscompleted());
    this.saveTask();
  };

  self.edit = function (task) {
    task.isEditing(true); // نمایش input ویرایش
    task.editedTaskName(task.taskName()); // مقدار فعلی را در input قرار دهید
  };

  self.saveEdit = function (task) {
    task.taskName(task.editedTaskName()); // ذخیره مقدار ویرایش شده
    task.isEditing(false); // مخفی کردن input ویرایش
    self.saveTask();
  };

  self.cancelEdit = function (task) {
    task.isEditing(false); // مخفی کردن input ویرایش بدون ذخیره
  };

  // تابع برای به‌روزرسانی وضعیت فیلتر
  self.filterTasks = function (filter) {
    self.selectedFilter(filter);
  };

  self.filteredTasks = ko.computed(function() {
    var filter = self.selectedFilter();
    switch (filter) {
        case 'active': // نمایش تسک‌های انجام نشده
            return self.tasks().filter(function(task) {
                return !task.iscompleted();
            });
        case 'done': // نمایش تسک‌های انجام شده
            return self.tasks().filter(function(task) {
                return task.iscompleted();
            });
        default: // 'all' - نمایش همه تسک‌ها
            return self.tasks();
    }
});
}

ko.applyBindings(new AppViewModel());
