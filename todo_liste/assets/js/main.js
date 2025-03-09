document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("todo-input");
    const addButton = document.getElementById("add-btn");
    const list = document.getElementById("todo-list");

    let todos = [];

    // Funktion zum Speichern der To-Do-Liste in Cookies
    function saveTodos() {
        document.cookie = `todos=${JSON.stringify(todos)}; path=/; max-age=31536000`; // 1 Jahr
    }

    // Funktion zum Laden der To-Do-Liste aus Cookies
    function loadTodos() {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            if (cookie.startsWith("todos=")) {
                todos = JSON.parse(cookie.split("=")[1]);
                break;
            }
        }
    }

    // Funktion zum Rendern der To-Do-Liste
    function render() {
        list.innerHTML = "";
        todos.forEach((todo, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = todo;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Löschen";
            deleteButton.classList.add("delete-btn");
            deleteButton.addEventListener("click", () => {
                todos.splice(index, 1);
                saveTodos();
                render();
            });

            listItem.appendChild(deleteButton);
            list.appendChild(listItem);
        });
    }

    // Event-Listener für den Hinzufügen-Button
    addButton.addEventListener("click", () => {
        if (input.value.trim() !== "") {
            todos.push(input.value.trim());
            input.value = "";
            saveTodos();
            render();
        }
    });

    // To-Dos beim Laden der Seite wiederherstellen
    loadTodos();
    render();
});
