import React from 'react';
import Form from '../components/Form';
import TodoList from '../components/TodoList';

function Todos() {
  return (
    
    <div className="w-full mx-auto">
        <Form />
        
        <div className='flex flex-col space-y-12 mt-12'>
            <TodoList />
        </div>
    </div>

  )
}

export default Todos;