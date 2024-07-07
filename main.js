$(document).ready(function () {
  loadTod();

  $(".js--form").on("submit", function (e) {
    e.preventDefault();
    addTod();
  });

  function loadTod() {
    if (typeof Storage !== "undefined") {
      const tod = JSON.parse(localStorage.getItem("tod")) || [];
      tod.forEach((tods) => {
        renderTods(tods);
      });
    } else {
      console.error("LocalStorage is not supported in this browser.");
    }
  }

  function addTod() {
    const value = $(".js--form__input").val().trim();
    if (value === "") return;

    const tods = {
      id: Date.now(),
      text: value,
      completed: false,
    };

    renderTods(tods);
    saveTod(tods);
    $(".js--form__input").val("");
  }

  function renderTods(tods) {
    const li = $("<li></li>")
      .addClass(`todo-item ${tods.completed ? "todo-item--checked" : ""}`)
      .attr("data-id", tods.id);

    const box = $("<input>")
      .attr("type", "checkbox")
      .prop("checked", tods.completed)
      .on("change", function () {
        tods.completed = this.checked;
        li.toggleClass("todo-item--checked", tods.completed);
        updateTod(tods);
      });

    const span = $("<span></span>")
      .addClass("todo-item__description")
      .text(tods.text)
      .on("click", function () {
        $("#taskText").text(tods.text);
        $("#taskModal").modal("show");
      });

    const button = $("<button></button>")
      .addClass("todo-item__delete btn btn-danger")
      .text("Видалити")
      .on("click", function () {
        removeTod(tods);
        li.remove();
      });

    li.append(box, span, button);
    $(".js--todos-wrapper").append(li);
  }

  function saveTod(tods) {
    if (typeof Storage !== "undefined") {
      const tod = JSON.parse(localStorage.getItem("tod")) || [];
      tod.push(tods);
      localStorage.setItem("tod", JSON.stringify(tod));
    } else {
      console.error("LocalStorage не підтримується в цьому браузері.");
    }
  }

  function updateTod(updatedTodo) {
    if (typeof Storage !== "undefined") {
      const tod = JSON.parse(localStorage.getItem("tod")) || [];
      const index = tod.findIndex((tods) => tods.id === updatedTodo.id);
      if (index !== -1) {
        tod[index] = updatedTodo;
        localStorage.setItem("tod", JSON.stringify(tod));
      }
    } else {
      console.error("LocalStorage не підтримується в цьому браузері.");
    }
  }

  function removeTod(todoToRemove) {
    if (typeof Storage !== "undefined") {
      const tod = JSON.parse(localStorage.getItem("tod")) || [];
      const updatedTodos = tod.filter((tods) => tods.id !== todoToRemove.id);
      localStorage.setItem("tod", JSON.stringify(updatedTodos));
    } else {
      console.error("LocalStorage не підтримується в цьому браузері.");
    }
  }
});
