import { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from './Button';
import Card from './Card';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [apiTasks, setApiTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks from JSONPlaceholder
  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setApiTasks((prev) => [...prev, ...data]);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch tasks');
        setLoading(false);
      });
  }, [page]);

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
    setNewTask('');
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Search API tasks
  const searchedApiTasks = apiTasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  // Infinite scroll
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100 &&
      !loading
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Task Manager</h2>
        <form onSubmit={addTask} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Add a new task"
          />
          <Button type="submit">Add Task</Button>
        </form>
        <div className="flex gap-2 mb-4">
          <Button onClick={() => setFilter('all')} variant="secondary">
            All
          </Button>
          <Button onClick={() => setFilter('active')} variant="secondary">
            Active
          </Button>
          <Button onClick={() => setFilter('completed')} variant="secondary">
            Completed
          </Button>
        </div>
        <ul className="space-y-2">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-md"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5"
                />
                <span
                  className={`${
                    task.completed ? 'line-through text-gray-500' : ''
                  } dark:text-white`}
                >
                  {task.title}
                </span>
              </div>
              <Button variant="danger" onClick={() => deleteTask(task.id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold mb-4 dark:text-white">API Tasks</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-md mb-4 dark:bg-gray-700 dark:text-white"
          placeholder="Search API tasks..."
        />
        {error && <p className="text-red-500">{error}</p>}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {searchedApiTasks.map((task) => (
            <li
              key={task.id}
              className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md animate-fade-in"
            >
              <p className={`dark:text-white ${task.completed ? 'line-through' : ''}`}>
                {task.title}
              </p>
            </li>
          ))}
        </ul>
        {loading && <p className="text-center mt-4 dark:text-white">Loading...</p>}
      </Card>
    </div>
  );
};

export default TaskManager;