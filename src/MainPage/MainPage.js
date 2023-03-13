import Todo from "./Todo";
import {useCallback} from "react";
import {Button, Card} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

export default function MainPage(props={}) {

    let todoList = props.todoList
    let setTodoList = props.setTodoList
    const navigate = useNavigate();

    const changeTodoList = useCallback((index, task)=>{
        let newList = Object.assign([], todoList)
        newList[index].tasks[task].done = !newList[index].tasks[task].done
        setTodoList(newList)
    }, [setTodoList, todoList])

    const deleteTodo = useCallback((index)=>{
        let newList = Object.assign([], todoList)
        newList.splice(index, 1)
        setTodoList(newList)
    }, [setTodoList, todoList])

    return(
        <div style={{padding: 50}}>
            {props.todoList
                .map((todo, index) =>
                    <Todo
                        key={index}
                        deleteTodo={deleteTodo}
                        index={index}
                        todo={todo}
                        changeTodoList={changeTodoList}
                    />
                )}

            <Card sx={{ minWidth: 275, height: 350}}
                  style={{display: "inline-block", margin: 20, position: "relative"}}
            >
                <Button
                    onClick={e=>{
                        navigate("/edit/new", {replace: true})
                    }}
                    sx={{width: 275, height: 350}}
                    size={"large"}
                >
                    <Add
                        sx={{width: 250, height: 250}}
                    />
                </Button>
            </Card>

        </div>
    )
}