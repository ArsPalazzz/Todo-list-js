let output = document.querySelector('.output');
let outputCompleted = document.querySelector('.output2');
let inputBtn = document.querySelector('.inputBtn');
let addBtn = document.querySelector('.addBtn');
let incomp = document.getElementById('incomplete');
let comp = document.getElementById('completed');



let tasksIncompleted = [];
let tasksCompleted = [];


//добавление элемента в incomplete
addBtn.addEventListener('click', function (event) {

    event.preventDefault();

    //null value
    if (inputBtn.value === '') {
        return console.error("List is empty");
    }

    //already exist
    if (tasksIncompleted.indexOf(inputBtn.value) !== -1) {
        return console.error("Task already exist");
    }


    let item = document.createElement('div');
    item.classList.add('item');
    output.insertBefore(item, output.firstChild);


    let blockP = document.createElement('p');
    blockP.classList.add('info');
    blockP.innerHTML = inputBtn.value;
    item.appendChild(blockP);




    let span = document.createElement('span');
    span.innerHTML = '&#10006;';
    span.classList.add('deleteTask');
    item.appendChild(span);


    let rename = document.createElement('span');
    rename.innerHTML = '&#9998;'
    rename.classList.add('renameTask');
    item.insertBefore(rename, span);



    tasksIncompleted.push(inputBtn.value);
    inputBtn.value = '';
    //saveData();


    if (tasksIncompleted.length === 0) {
        incomp.classList.add('hide');
    }
    else {
        incomp.classList.remove('hide');
    }

});


output.addEventListener('click', function (e) {

    if (e.target.tagName.toLowerCase() === 'p') {
        e.target.classList.toggle('checked');

        addToCompletedList(e.target);
        //saveData();
    }
    else if (e.target.classList.contains('deleteTask')) {


        //delete from Incomplete


        //удаление задачи из списка
        let valueToRemove = e.target.parentNode.firstChild.innerHTML;
        let index = tasksIncompleted.indexOf(valueToRemove);
        tasksIncompleted.splice(index, 1);

        //удаление узла
        e.target.parentElement.remove();



        if (tasksIncompleted.length === 0) {
            incomp.classList.add('hide');
        }
        else {
            incomp.classList.remove('hide');
        }

        if (tasksCompleted.length === 0) {
            comp.classList.add('hide');
        }
        else {
            comp.classList.remove('hide');
        }

        //saveData();
    }
    else if (e.target.classList.contains('renameTask')) {
        renameTask(e.target);
        //saveData();
    }
    else if (e.target.tagName.toLowerCase() === 'button') {
        if (e.target.classList.contains('renameOkBtn')) {
            e.preventDefault();
            taskHasBeenRenamed(e.target);
        }
        else if (e.target.classList.contains('renameCancelBtn')) {
            e.preventDefault();
            taskRenamedHasBeenCanceled(e.target);
        }
    }
});

outputCompleted.addEventListener('click', function (e) {


    if (e.target.classList.contains('deleteTask')) {

        //удаление задачи из списка
        let valueToRemove = e.target.previousSibling.innerHTML;
        let index = tasksCompleted.indexOf(valueToRemove);
        tasksCompleted.splice(index, 1);

        //удаление узла
        e.target.parentElement.remove();





        if (tasksIncompleted.length === 0) {
            incomp.classList.add('hide');
        }
        else {
            incomp.classList.remove('hide');
        }

        if (tasksCompleted.length === 0) {
            comp.classList.add('hide');
        }
        else {
            comp.classList.remove('hide');
        }

        //saveData();
    }
});


//отмена перемеименования
function taskRenamedHasBeenCanceled(elem) {
    let toDiv = elem.parentNode;

    toDiv.previousSibling.remove();
    toDiv.remove();
}

//подтвердили перемеименование
function taskHasBeenRenamed(elem) {

    if (tasksIncompleted.indexOf(elem.parentNode.previousSibling.value) !== -1) {
        return console.error('Task is already exist');
    }

    if (elem.parentNode.previousSibling.value === '') {
        return console.error('Empty input');
    }

    let toDiv = elem.parentNode;
    let inp = toDiv.previousSibling;

    let label = toDiv.parentNode.firstChild;


    label.innerHTML = inp.value;

    toDiv.previousSibling.remove();
    toDiv.remove();

}

//закидываем из incomplete и completed
function addToCompletedList(elem) {


    if (tasksCompleted.indexOf(elem.innerHTML) !== -1) {
        return;
    }


    let item = document.createElement('div');
    item.classList.add('item');
    item.classList.add('checked');
    outputCompleted.insertBefore(item, outputCompleted.firstChild);


    let blockP = document.createElement('p');
    blockP.classList.add('info');
    blockP.classList.add('checked');
    blockP.innerHTML = elem.innerHTML;
    item.appendChild(blockP);




    let span = document.createElement('span');
    span.innerHTML = '&#10006;';
    span.classList.add('deleteTask');
    item.appendChild(span);

    //console.log(elem.innerHTML)
    tasksCompleted.push(elem.innerHTML);


    elem.parentNode.remove();

    //удаляем элемент из списка Incomplete
    let valueToRemove = elem.innerHTML;
    let index = tasksCompleted.indexOf(valueToRemove);
   
    tasksIncompleted.splice(tasksIncompleted.length - 1 - index, 1);
   
    //saveData();
    if (tasksIncompleted.length === 0) {
        incomp.classList.add('hide');
    }
    else {
        incomp.classList.remove('hide');
    }

    if (tasksCompleted.length === 0) {
        comp.classList.add('hide');
    }
    else {
        comp.classList.remove('hide');
    }
}


//при нажатии на "переименовать"
function renameTask(elem) {

    let inputExist = elem.nextSibling;
    let inpExist2 = inputExist.nextSibling;



    if (inpExist2 === null) {


        let renameTextBox = document.createElement('input');
        renameTextBox.setAttribute('type', 'text');
        renameTextBox.classList.add('textboxRename');

        elem.parentNode.append(renameTextBox);

        let div = document.createElement('div');
        div.classList.add('containerForButtons');
        elem.parentNode.append(div);

        let okBtn = document.createElement('button');
        okBtn.innerHTML = 'Confirm';
        okBtn.classList.add('renameOkBtn');
        div.appendChild(okBtn);

        let cancelBtn = document.createElement('button');
        cancelBtn.innerHTML = 'Cancel';
        cancelBtn.classList.add('renameCancelBtn');
        div.appendChild(cancelBtn);

        let a = elem.nextSibling;
        let b = a.nextSibling;

        b.value = elem.previousSibling.innerHTML;
    }

}



// function saveData() {
//     localStorage.setItem('data', output.innerHTML);
//     localStorage.setItem('data2', outputCompleted.innerHTML);
// }

// function getData() {
//     if (!output.innerHTML) {
//         output.innerHTML = localStorage.getItem('data');
//       }

//       if (!outputCompleted.innerHTML) {
//         outputCompleted.innerHTML = localStorage.getItem('data2');
//       }
// }

// getData();