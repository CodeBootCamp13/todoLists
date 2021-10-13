
var lists = [

	{
		listTitle: 'List #1',
		items: [
			{ value: 'item 1', completed: false },
			{ value: 'item 2', completed: false },
			{ value: 'item 3', completed: false }
		]
	},
	{
		listTitle: 'List #2',
		items: [
			{ value: 'item 1', completed: false },
			{ value: 'item 2', completed: false }
		]
	}

];


function renderTodoLists() {
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
	'<input type="text" name="addList">' +
	'<input type="submit" value="+">' +
	'</form></div>';
	


}

renderTodoLists();

function makeNewList() {
    for ( var i = 0; i < lists.length; i++ ) {
		var list = lists[i];

    var listAdd = document.createElement('div');
    listAdd.classList.add('listCard');
    listAdd.id = 'list_' + i;

for ( var k = 0; k < )
}