/******************************************
 *  Author : orlando   
 *  Created On : Tue Jan 09 2018
 *  File : todo.js
 *******************************************/
var ul = document.getElementById('list');
var input = document.getElementById('search-box');
var deleteAll = document.getElementById('add-task');
var alert = document.getElementById('warning-alert');
var isAllDeleted = false;

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

    var interval = setInterval(function() {
        alert.classList.add('hidde');
        clearInterval(interval);
    }, 2000);

}

deleteAll.addEventListener('click', function() {

    if (isAllDeleted) {
        alertDeleted();
    } else {
        deleteAllTask();
    }

})

input.addEventListener('change', function() {

    makeTask(input.value);
    input.value = "";

})

ul.addEventListener('click', function(el) {

    if (el.target.nodeName === 'LI') {
        el.target.classList.toggle('completed');
        isAllDeleted = false;
    }

    if (el.target.nodeName === 'SPAN') {
        ul.removeChild(el.target.parentNode);
    }

})
