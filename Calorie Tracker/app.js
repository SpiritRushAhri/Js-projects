/**
 * A calorie tracker webapp, has the look and feel of a react.js app but is done using only vanilla js
 * Add,Edit,Remove meals while adding them to local storage and clearing them
 * 
 * @version 1.0
 * @author Andrew Fancett
 */

// All data in the module pattern is private until access is added in the return

// Storage Controller persist data using local, session storage until browser closes
const StorageController = (function() {
    // Public methods
    return {
        storeItem: function(item) {
            let items;
            // localstorage can only store strings by default, so json.stringify in, json.parse out
            // Check if there are any items in localstorage
            if(localStorage.getItem('items') === null){
                items = [];
                // Push new item
                items.push(item);
                // Set local storage
                localStorage.setItem('items', JSON.stringify(items));
            }
            else{
                // There are items, get them
                items = JSON.parse(localStorage.getItem('items'));
                // Push new item
                items.push(item);
                // Re-set localstorage
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function() {
            let items;
            // Nothing there set items to empty
            if(localStorage.getItem('items') === null){
                items = [];
            }
            // There are items to be displayed
            else{
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateStorage: function(updatedItem) {
            // Retreive items from local storage
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach(function(item, index){
                if(updatedItem.id === item.id){
                    items.splice(index, 1, updatedItem);
                }
            });
            // Re-set localstorage
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemFromStorage: function(id) {
            // Retreive items from local storage
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach(function(item, index){
                if(id === item.id){
                    items.splice(index, 1);
                }
            });
            // Re-set localstorage
            localStorage.setItem('items', JSON.stringify(items));
        },
        clearStorage: function() {
            localStorage.removeItem('items');
        }
    }
})(); //iffy runs right away, Immediately invoked function

// Item Controller
const ItemController = (function(){
    // Private methods
    // Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    // Data Structure / State
    const state = {
        //items: [
            // Hardcoded test data
            //{id: 0, name: 'Steak Dinner', calories: 1200},
            //{id: 1, name: 'Steak Dinner', calories: 1400},
            //{id: 2, name: 'Steak Dinner', calories: 1600}
        //],
        items: StorageController.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }
    // Public methods
    return {
        getItems: function() {
            return state.items;
        },
        addItem: function(name, calories) {
            let ID;
            // Create ID
            if(state.items.length > 0){
                // Increment items
                ID = state.items[state.items.length - 1].id + 1;
            }
            else{
                ID = 0;
            }
            // Calories to number
            calories = parseInt(calories);

            // Create new item
            newItem = new Item(ID, name, calories);
            // Add to items array
            state.items.push(newItem);

            return newItem;
        },
        getItemById: function(id) {
            let found = null;
            // Loop through state items
            state.items.forEach(function(item){
                if(item.id === id){
                    found = item;
                }
            });
            return found;
        },
        updateItem: function(name, calories) {
            // Calories to number
            calories = parseInt(calories);
            let found = null;
            state.items.forEach(function(item){
                if(item.id === state.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },
        deleteItem: function(id) {
            // Get id's using map
            const ids = state.items.map(function(item){
                return item.id;
            });
            // Get index
            const index = ids.indexOf(id);
            // Remove item from the array
            state.items.splice(index, 1);
        },
        clearAll: function() {
            state.items = [];
        },
        setCurrentItem: function(item) {
            state.currentItem = item;
        },
        getCurrentItem: function() {
            return state.currentItem;
        },
        getTotalCalories: function() {
            let total = 0;
            // Loop through items and add calories
            state.items.forEach(function(item){
                total += item.calories;
            });
            // Set total calories in state
            state.totalCalories = total;
            // Return total calories
            return state.totalCalories;    
        },
        // Test function for returning data
        logData: function() {
            return state;
        }
    }
})(); //iffy runs right away


// UI Controller
const UIController = (function(){
    // Private methods
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        removeBtn: '.remove-btn',
        backBtn: '.back-btn',
        clearAllBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }
    // Public methods
    return {
        populateItemsList: function(items){
            let html = '';
            items.forEach(function(item){
                html += `
                    <li class="collection-item" id="${item.id}">
                        <strong>${item.name}</strong> <em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                    </li>
                `;
            });
            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getInput: function() {
            return { 
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addToList: function(item) {
            // Show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create li element
            const li = document.createElement('li');
            // Add classes to li
            li.className = 'collection-item';
            // Add id
            li.id = `item-${item.id}`;
            // Add html
            li.innerHTML = `
                <strong>${item.name}</strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            `;
            // Insert item into UI list
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        updateListItem: function(item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);
            // Gives a node list, can't use for each on nodes convert nodelist to array
            listItems = Array.from(listItems);
            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute('id');
                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `
                        <strong>${item.name}</strong> <em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                    `;
                }
            });
        },
        deleteListItem: function(id) {
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        clearList: function() {
            let listItems = document.querySelectorAll(UISelectors.listItems);
            // Turn node list into an array
            listItems = Array.from(listItems);
            listItems.forEach(function(item){
                item.remove();
            });
        },
        clearInputFields: function() {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        addItemToForm: function() {
            document.querySelector(UISelectors.itemNameInput).value = ItemController.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemController.getCurrentItem().calories;
            // Show edit state in UI
            UIController.showEditState();
        },
        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: function() {
            UIController.clearInputFields();
            // Hide edit buttons
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.removeBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function() {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.removeBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        getSelectors: function() {
            return UISelectors;
        }
    }
})(); //iffy runs right away


// App Controller
const App = (function(ItemController, StorageController, UIController){
    // Private methods
    // Load event listeners
    const loadEventListeners = function() {
        // Get UI Selectors
        const UISelectors = UIController.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', addItemList);

        // Disable submit on enter key
        document.addEventListener('keypress', function(e){
            // 13 = enter key
            if(e.keyCode === 13 || e.which === 13){
                e.preventDefault();
                return false;
            }
        });

        // Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdate);

        // Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        // Back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UIController.clearEditState);

        // Remove item event
        document.querySelector(UISelectors.removeBtn).addEventListener('click', removeItem);

        // Clear items event
        document.querySelector(UISelectors.clearAllBtn).addEventListener('click', clearAllItems);
    }

    // Add item function
    const addItemList = function(e) {
        // Test add
        //console.log('Add');

        // Get form input from UIController
        const input = UIController.getInput();
        // Check for name and calorie input
        if(input.name !== '' && input.calories !== ''){
            // Add item
            const newItem = ItemController.addItem(input.name, input.calories);
            // Add item to UI list
            UIController.addToList(newItem);
            // Get total calories
            const totalCalories = ItemController.getTotalCalories();
            // Add total calories to UI
            UIController.showTotalCalories(totalCalories);
            // Add item to local storage
            StorageController.storeItem(newItem);
            // Clear input fields
            UIController.clearInputFields();
        }
        e.preventDefault();
    }

    // Update item function
    const itemUpdate = function(e) {
        // Target the edit button, added after dom loaded so we use event delegation
        if(e.target.classList.contains('edit-item')){
            // Get list item id (item-0 etc...)
            const listId = e.target.parentNode.parentNode.id;
            // Break into array and split at ' - '
            const listIdArray = listId.split('-');
            // Get actual number id
            const id = parseInt(listIdArray[1]);
            // Get item object
            const itemToEdit = ItemController.getItemById(id);
            // Set current item
            ItemController.setCurrentItem(itemToEdit);
            // Show text in fields to edit
            UIController.addItemToForm();
        }
        e.preventDefault();
    }
    // Submit updated item function
    const itemUpdateSubmit = function(e) {
        // Get item input
        const input = UIController.getInput();
        // Update item
        const updatedItem = ItemController.updateItem(input.name, input.calories);
        // Show updated item in UI
        UIController.updateListItem(updatedItem);
        const totalCalories = ItemController.getTotalCalories();
        // Add total calories to UI
        UIController.showTotalCalories(totalCalories);
        // Update local storage
        StorageController.updateStorage(updatedItem);
        // Clear input fields
        UIController.clearEditState();
        e.preventDefault();
    }
    // Remove item function
    const removeItem = function(e) {
        // Get id from current item
        const currentItem = ItemController.getCurrentItem();
        // Delete from state 
        ItemController.deleteItem(currentItem.id);
        // Delete from UI 
        UIController.deleteListItem(currentItem.id);
        const totalCalories = ItemController.getTotalCalories();
        // Add total calories to UI
        UIController.showTotalCalories(totalCalories);
        // Delete item from local storage
        StorageController.deleteItemFromStorage(currentItem.id);
        // Clear input fields
        UIController.clearEditState();
        e.preventDefault();
    }
    // Clear all items function
    const clearAllItems = function(e) {
        // Delete items from state
        ItemController.clearAll();
        const totalCalories = ItemController.getTotalCalories();
        // Add total calories to UI
        UIController.showTotalCalories(totalCalories);
        // Delete items from UI
        UIController.clearList();
        // Clear from local storage
        StorageController.clearStorage();
        // Hide list
        UIController.hideList();
    }
    // Public Methods
    return {
        init: function(){
            // Clear edit state / set initial state
            UIController.clearEditState();
            // Fetch items from state
            const items = ItemController.getItems();

            // Check if there are items
            if(items.length === 0) {
                UIController.hideList();
            }
            else{
                UIController.populateItemsList(items);
            }

            // Populate list with items
            UIController.populateItemsList(items);

            // Get total calories
            const totalCalories = ItemController.getTotalCalories();

            // Add total calories to UI
            UIController.showTotalCalories(totalCalories);

            // Load event listeners
            loadEventListeners();
        }
    }
})(ItemController, StorageController, UIController); //iffy runs right away

// Initialize App
App.init();