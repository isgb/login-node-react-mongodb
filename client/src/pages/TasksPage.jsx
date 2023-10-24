import React, { useEffect } from 'react'
import { useTasks } from '../context/TasksContext'

function TasksPage() {

    const {getTasks, tasks} = useTasks();

    useEffect(() => {
        getTasks();
    },[])

    if(tasks.length === 0) return (<h1>No tasks</h1>);

  return (
    <div>
        {
            tasks.map(task =>(
                <div key={task._id}>
                    <h1>{task.title}</h1>
                    <h1>{task.description}</h1>
                </div>
            ))
        }
    </div>
  )
}

export default TasksPage