/******************************************
 *  Author : orlando   
 *  Created On : Tue Jan 09 2018
 *  File : productos.js
 *******************************************/

;
(function() {
    var ul = document.getElementById('list');
    var input = document.getElementById('search-box');
    var deleteAll = document.getElementById('add-task');
    var alert = document.getElementById('warning-alert');
    var isAllDeleted = false;

    if (localStorage.getItem('tasks') !== null) {
        var localStorageTasks = JSON.parse(localStorage.getItem("tasks"));

        localStorageTasks.forEach(function(el) {
            makeTask(el);
        })
    }

    function setLocalStorage(task) {
        var tasks = getLocalStorage();
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }


    function deleteLocaltorage(element) {
        var allTasksLocalStorage = getLocalStorage();

        allTasksLocalStorage.forEach(function(el, index) {
            if (el === element) {
                allTasksLocalStorage.splice(index, 1);
            }
        })

        localStorage.setItem(
            'tasks', 
            JSON.stringify(allTasksLocalStorage)
        );
    }

    function getLocalStorage() {
         return localStorage.getItem('tasks') === null
            ? []
            :  tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    function makeTask(task) {

        var text = document.createTextNode(task),
            deleteText = document.createTextNode('X'),
            item = document.createElement('li'),
            deletButton = document.createElement('span');

        deletButton.appendChild(deleteText);
        item.appendChild(deletButton);
        item.appendChild(text);
        ul.appendChild(item);
    }

    function deleteAllTask() {
        var items = Array.prototype.slice.call(document.querySelectorAll('li'));

        items.forEach(function(task) {
            if (task.classList[0] === "completed") {
                ul.removeChild(task);
            }
        })
        isAllDeleted = true;
    }

    function alertDeleted() {
        alert.classList.remove('hidde');

         setTimeout(function() {
            alert.classList.add('hidde');
        }, 2000);
    }

    deleteAll.addEventListener('click', function() {
        if (isAllDeleted) alertDeleted();
        else deleteAllTask();
    })

    input.addEventListener('change', function() {
        makeTask(input.value);
        setLocalStorage(input.value);
        input.value = "";
    })

    ul.addEventListener('click', function(el) {
        //elemento en la lista
        if (el.target.nodeName === 'LI') {
            el.target.classList.toggle('completed');
            isAllDeleted = false;
        }
        //boton de borrado de cada elemento
        if (el.target.nodeName === 'SPAN') {
            var element = el.target.parentNode.textContent.substring(1, el.target.parentNode.textContent.length);
            var localStorageTasks = getLocalStorage();

            if (localStorageTasks.includes(element)) {
                deleteLocaltorage(element)
            } else {
                ul.removeChild(el.target.parentNode);
            }
        }
    })
})();
