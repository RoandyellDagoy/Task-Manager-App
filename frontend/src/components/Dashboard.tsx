import React, { useState, useEffect, useContext  } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface Task {
  id: number;
  title: string;
  description: string;
}

  
   
const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
 
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth?.logout(); 
    navigate("/"); 
   }

    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        console.log('GET/task response: ', res);
        const payload = res.data;
        const list = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload?.tasks)
        ? payload.tasks
        : [];
      setTasks(list);
      console.log('normalized tasks:', list);
      } catch (error) {
        console.error(error);
        setTasks([]);
      }
    };

useEffect(() => {
  
    fetchTasks();
}, []);
 


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editId !== null) {
      await api.put(`/tasks/${editId}`, {
        title,
        description,
        status: 'pending',
      });
      setTasks(
        tasks.map((t) =>
          t.id === editId ? { ...t, title, description} : t
        )
      );
      setEditId(null);
    } else {
      const res = await api.post('/tasks', {
        title,
        description,
        status:"pending",
      });
      const created = res.data?.task ?? res.data?.data;
      if (Array.isArray(created)){
        setTasks(created);
      }else if(created && typeof created === 'object'){
        setTasks(prev => [...prev, created]);
      }else {
        await fetchTasks();
      }



      setTasks([...tasks, res.data.data]);
    }

    setTitle("");
    setDescription("");
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error(error);
      await fetchTasks();
    }


    await api.delete(`http://localhost:8000/api/tasks/${id}`);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleEdit = (task: Task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditId(task.id);
  };

  return (
    <div className="flex p-6 max-w-2xl mx-auto gap-10">
      <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard - Tasks</h1>

      {/* Task Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full"
        />
        <button type="submit" className="btn btn-primary w-full">
          {editId ? "Update Task" : "Add Task"}
        </button>
      </form>
      </div>


    <div className="card bg-base-100card bg-base-100 w-96 drop-shadow-2xl">
      {/* Task List */}
     <ul className="space-y-3">
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task, index) => (
                <li
                  key={`${task.id}-${index}`}
                  className="card shadow p-4 flex justify-between items-center"
                >
                  <div>
                    <h2 className="font-semibold">{task.title}</h2>
                    <p className="text-gray-600">{task.description}</p>
                  </div>

                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(task)}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No tasks yet</p>
            )}
      </ul>
            <button
              onClick={handleLogout}
              className="btn btn-error w-full mt-8 "
            >
              Exit
            </button>
      </div>
    </div>
  );
};

export default Dashboard;
