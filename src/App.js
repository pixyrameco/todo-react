
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import {useEffect, useState, useCallback} from "react";
import EditorPage from "./EditorPage/EditorPage";

function App() {

    const [todoList, setTodoList] = useState(
        [
        //     {
        //     name: "Some Todo",
        //     tasks: [
        //         {
        //             done: false,
        //             name: "Code up everything"
        //         },
        //         {
        //             done: true,
        //             name: "Fix bug #1"
        //         }
        //     ]
        // },
        //     {
        //         name: "Another Todo",
        //         tasks: [
        //             {
        //                 done: false,
        //                 name: "Clean the house"
        //             },
        //             {
        //                 done: true,
        //                 name: "Fix bug #2"
        //             },
        //             {
        //                 done: false,
        //                 name: "Make a dinner"
        //             },
        //             {
        //                 done: false,
        //                 name: "Make a dinner"
        //             },{
        //                 done: false,
        //                 name: "Make a dinner"
        //             },{
        //                 done: false,
        //                 name: "Make a dinner"
        //             },{
        //                 done: false,
        //                 name: "Make a dinner"
        //             },{
        //                 done: false,
        //                 name: "Make a dinner"
        //             },
        //         ]
        //     }
        ])

    const saveTodoList = useCallback((newTodoList)=>{
        // console.log("neww: ", newTodoList)
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
        </Routes>
    );
}

export default App;
