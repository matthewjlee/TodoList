// Code goes here

var todoList = {
  todos: [],
  /**
  displayTodos: function() {
    if (this.todos.length === 0) {
      console.log('Your todo list is empty!');
    } else {
      console.log('My Todos:');
      for (var i = 0; i < this.todos.length; i++) {
        if (this.todos[i].completed === true) {
          console.log('(x)', this.todos[i].todoText);
        } else {
          console.log('( )', this.todos[i].todoText);
        }
      }
    }
  },
  */
  addTodo: function(todoText) { //addTodo('hi')
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  delete: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    //get number of completed todos using for-each    
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    /**
    //case 1: everything's true -> everything false
    if (completedTodos === totalTodos) {
      this.todos.forEach(function(todo) {
        todo.completed = false;
      });
    //case 2: otherwise, make everything true
    } else {
      this.todos.forEach(function(todo) {
        todo.completed = true;
      });
    }
    */

    this.todos.forEach(function(todo) {
      //case 1: if everything's true, make everything false
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } //case 2: otherwise, make everything true 
      else {
        todo.completed = true;
      }
    });
  }
};

/*
//want to get access to the display todos button
var displayTodosButton = document.getElementById('displayTodosButton');
var toggleAllButton = document.getElementById('toggleAllButton');
console.log(displayTodosButton);
console.log(toggleAllButton);

// want to run displays method, when someone clicks todos button
displayTodosButton.addEventListener('click', function() {
  todoList.displayTodos();
});

toggleAllButton.addEventListener('click', function() {
  todoList.toggleAll();
});
*/

var handlers = {
  addTodo: function() {
    //want to access input element from html
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.delete(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    //need to clear out the list every time
    todosUl.innerHTML = '';
    /**
    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var todoTextWithCompletion = '';
      
      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      
      todoLi.id = i;
      todoLi.textContent = todoTextWithCompletion
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }
    */

    //this refers to view object
    //forEach(callback, this)

    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }

      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function(event) {
      //went up one level to look at the id.
      //parent is the li element
      //this is called EVENT DELEGATION
      console.log(event.target.parentNode.id);

      //get element that was clicked on
      var elementClicked = event.target;

      //check if element clicked is delete button
      if (elementClicked.className === 'deleteButton') {
        //run handlers to run deleteTodo
        // way to get id - parseInt(elementClicked.parentNode.id);

        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();
