// define our list class
class List {
	constructor(title) {
		this.title = title;

		this.items = [];
	}

	addItem(value, timeStamp, completed) {
		this.items.push( new ListItem(value, timeStamp, completed) );
	}
	
	markAsComplete(listItemIndex) {
		this.items[ listItemIndex ].completed = true;
	}

	deleteItem(listItemIndex) {
		this.items.splice(listItemIndex, 1);
	}
}

// define our list item class
class ListItem {
	constructor(value, timeStamp, completed) {
		this.value = value;
		this.timeStamp = timeStamp ? new Date(timeStamp) : new Date();
		this.completed = completed || false;
	}
}
