
import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import {useEffect, useState, useCallback} from "react";
import EditorPage from "./EditorPage/EditorPage";

function App() {

    const [todoList, setTodoList] = useState([])

    const saveTodoList = useCallback((newTodoList)=>{
        setTodoList(newTodoList)
        localStorage.setItem("todolist", JSON.stringify(newTodoList))
    }, [setTodoList])

    useEffect(()=>{
        if(localStorage.getItem("todolist")){
            setTodoList(JSON.parse(localStorage.getItem("todolist")))
        }
    }, [])

    return (
        <Routes>
            <Route path='/main' element={<MainPage todoList={todoList} setTodoList={saveTodoList}/>}/>
            <Route path='/edit/:id' element={<EditorPage todoList={todoList} setTodoList={saveTodoList}/>}/>
            <Route exact path="/" element={<Navigate replace to="/main" />}/>
            <Route path="*" element={<Navigate replace to={"/main"} />} />
        </Routes>
    );
}

export default App;
