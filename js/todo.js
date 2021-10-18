const lists = [];

function loadData() {
	let localList = JSON.parse(localStorage.getItem('lists'));

	for ( let i = 0; i < localList.length; i++ ) {
		// top level of our array is our list object itself
		let list = localList[i];
		let listObj = new List(localList[i].title)
		

		for ( let j = 0; j < list.items.length; j++ ) {
			// inside our items in the array
			// call our addItem function 
			listObj.addItem(list.items[j].value, list.items[j].timeStamp, list.items[j].completed );
		}

		lists.push( listObj );
	}
}

function render() {
	var listsEl = document.getElementById('lists');
	listsEl.innerHTML = '';

 	// loop through the lists, and make .listCards
	for ( let i = 0; i < lists.length; i++ ) {
		let list = lists[i];

		let newList = document.createElement('div');
		newList.classList.add('listCard');
		newList.id = 'list_' + i;

		let listTitle = document.createElement('h2');
		listTitle.textContent = list.title;
		newList.append(listTitle);

		// loop through the list items, and make the .list
		let listEl = document.createElement('ul');
		listEl.classList.add('list');

		for ( var j = 0; j < list.items.length; j++ ) {
			let listItem = document.createElement('li');
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
			`<li class="addItem">
				<form action="/list/${i}" method="POST">
					<input id="item_${i}" type="text" name="item">
					<input type="submit" value="+">
				</form>
			</li>
			`;

		newList.append(listEl);

		listsEl.append(newList);

	}

	listsEl.innerHTML = listsEl.innerHTML + 
		`<div class="blank listCard">
			<h2>Create New List</h2>
			<form action="/newList" method="POST">
				<input type="text" id="addList_id" name="addList">
				<input type="submit" value="+">
			</form>
		</div>
		`;
}

document.addEventListener('click', function(event) {
	var myEl = event.target;

	if ( myEl.className.match('item') ) {

		var currentListId = parseInt(myEl.dataset.listId);
		var currentItemId = parseInt(myEl.dataset.itemId);

		if ( myEl.className.match('done') ) {
			// completely remove the element from our object array
			lists[ currentListId ].deleteItem( currentItemId );		
		} else {
			myEl.classList.add('done');

			// mark the element in our object array as "completed"
			lists[ currentListId ].markAsComplete( currentItemId );
		}

		render();
	}
});

document.addEventListener('submit', function(event) {
	event.preventDefault();

	let action = event.target.getAttribute('action').split('/')

	if ( action[1] == 'newList' ) {
		var listTitle = document.getElementById('addList_id').value;
		lists.push( new List(listTitle) );
	} else if ( action[1] == 'list' ) {
		var listId = parseInt(action[2]);
		var item = document.getElementById('item_' + listId).value;
		
		// add the item to my list object
		lists[ listId ].addItem( item );

	}

	// store our lists object as a serialized json string
	localStorage.setItem('lists', JSON.stringify(lists));

	render();
});

loadData();
render();