import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAdd from '../item-add';

import './app.css';

export default class App extends Component {
  maxId = 100;
  
  state = {
    todoData: 
    [
      this.createTodoItem('Drink Cofee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have lunch'),
    ],
    searchValue: '',
    filterValue: 'all',
  }

  createTodoItem(label) {
    return {
      id: this.maxId++, 
      label: label, 
      important: false,
      done: false,
    }
  }; 

  deleteItem = ((id) => {
    this.setState(({todoData}) => {
      const indx = todoData.findIndex((item) => item.id === id);
      const newArray = [...todoData.slice(0, indx), ...todoData.slice(indx + 1)];

      return {
        todoData: newArray,
      }
    });
  });

  addItem = ((label) => {
    const newItem = this.createTodoItem(label);
    this.setState(({todoData}) => {
      const newArray = [...todoData, newItem];

      return {
        todoData: newArray,
      }
    });
  });

  toggelProperty(arr, id, propName) {
      const indx = arr.findIndex((item) => item.id === id);
      const oldItem = arr[indx];
      const newItem = {...oldItem, [propName]: !oldItem.propName};
      const newArray = [
        ...arr.slice(0, indx),
        newItem, 
        ...arr.slice(indx + 1)
      ];
      return newArray;
  }
 
  onToggelImportant = ((id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggelProperty(todoData, id, 'important'),
      }
    });
  });

  onToggelDone = ((id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggelProperty(todoData, id, 'done'),
      }
    });
  }); 

  setSearchValue = ((searchValue) => {
    this.setState({searchValue});
  });

  getResultSearchItems = ((items, searchValue) => {
    if(!items.length) {
      return items;
    }
    return items.filter(item => item.label.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
  });

  filter = ((items, filterValue) => {
    switch(filterValue) {
      case 'all' : return items;
      case 'active': return items.filter(item => !item.done);
      case 'done': return items.filter(item => item.done);
      default: return items;
    } 
  });

  onClickFilter = (filterValue => {
    this.setState({filterValue})
  })

  render() {
    const {todoData, searchValue, filterValue} = this.state;
    const resultSearch = this.filter(this.getResultSearchItems(todoData, searchValue), filterValue);
    const doneItems = todoData.filter(item => item.done);
    const todoCounter = todoData.length - doneItems.length;

    return (
      <div className="todo-app">
        <AppHeader 
          toDo={todoCounter} 
          done={doneItems.length}
          />
        <div className="top-panel d-flex">
          <SearchPanel setSearchValue={this.setSearchValue}/>
          <ItemStatusFilter 
            filterValue={filterValue}
            onClickFilter={this.onClickFilter}
          />
        </div>  
  
          <TodoList 
            todoData={resultSearch}
            onDeleted={ this.deleteItem}
            onToggelImportant={this.onToggelImportant}
            onToggelDone={this.onToggelDone}
          />
          <ItemAdd addItem={this.addItem}/>
      </div>
    )
  }
}
