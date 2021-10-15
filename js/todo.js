// TODO(erh) : think about adding dates (due dates, created date)

// data model for storing our lists and items
var storageList = localStorage.getItem('lists');
var lists = [];
if ( storageList ) {
	lists = JSON.parse(storageList);
} else {
	lists = [];
}

var eventObj = null;
// capture all form submits and do something special
document.addEventListener('submit', function(event) {
	event.preventDefault();

	// grab the form action
	var action = event.target.getAttribute('action').split('/');
	console.log(action);

	// if i'm a form inside an existing list, save my new item
	if ( action[1] == 'list' ) {
		var listId = parseInt(action[2]);
		var item = document.getElementById('item_' + listId).value;
		
		// add the item to my list object
		var fullItem = {
			value: item, completed: false, timeStamp: new Date()
		};
		lists[ listId ].items.push(fullItem);

		renderTodoLists(listId);

	} else if ( action[1] == 'newList' ) {
		// create a new list

		// TODO(homework)
		// write code to capture the list name,
		var newListName = document.getElementById('addList_id').value;

		// create a new list object
		var listObj = { listTitle: newListName, items:[] };

		// store it in the lists array
		lists.push(listObj);

		renderTodoLists(lists.length - 1);
	}



});

document.addEventListener('click', function(event) {
	var myEl = event.target;

	if ( myEl.className.match('item') ) {
		console.log('i am clicking an item');

		var currentListId = parseInt(myEl.dataset.listId);
		var currentItemId = parseInt(myEl.dataset.itemId);

		if ( myEl.className.match('done') ) {
			myEl.style.display = 'none';

			// completely remove the element from our object array
			

			lists[currentListId].items.splice(currentItemId, 1);


		} else {
			myEl.classList.add('done');

			// mark the element in our object array as "completed"
			lists[currentListId].items[currentItemId].completed = true;
			// update the timestamp
			//lists[currentListId].items[currentItemId].timeStamp = new Date();

			renderTodoLists();
		}
	}
});


// render todoLists
function renderTodoLists(focusListId) {
	localStorage.setItem('lists', JSON.stringify(lists));

	// if i'm online... send our JSON list to our server

	var listsEl = document.getElementById('lists');
	listsEl.innerHTML = '';

	// loop through the lists, and make .listCards
	for ( var i = 0; i < lists.length; i++ ) {
		var list = lists[i];

		var newList = document.createElement('div');
		newList.classList.add('listCard');
		newList.id = 'list_' + i;

		var listTitle = document.createElement('h2');
		listTitle.textContent = list['listTitle'];
		newList.append(listTitle);

		// loop through the list items, and make the .list
		var listEl = document.createElement('ul');
		listEl.classList.add('list');

		for ( var j = 0; j < list.items.length; j++ ) {
			var listItem = document.createElement('li');
			listItem.classList.add('item');
			listItem.textContent = list.items[j].value;
			listItem.dataset.itemId = j;
			listItem.dataset.listId = i;
			if ( list.items[j].completed ) { 
				listItem.classList.add('done');
			}
			listEl.append(listItem);
		}

		listEl.innerHTML = listEl.innerHTML + 
			'<li class="addItem"><form action="/list/' + i + '" method="POST">' +
			'<input id="item_' + i + '" type="text" name="item">' + 
			'<input type="submit" value="+">' +
			'</form></li>';

		newList.append(listEl);

		listsEl.append(newList);

		

	}

	listsEl.innerHTML = listsEl.innerHTML + 
	'<div class="blank listCard">' + 
	'<h2>Create New List</h2>' +
	'<form action="/newList" method="POST">' +
	'<input type="text" id="addList_id" name="addList">' +
	'<input type="submit" value="+">' +
	'</form></div>';
	

	if ( focusListId != undefined ) {
		document.getElementById('item_' + focusListId).focus();
	}

}


renderTodoLists();
