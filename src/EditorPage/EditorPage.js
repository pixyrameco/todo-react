import {
    Button, Card,
    CardContent,
    Stack, TextField,
} from "@mui/material";
import {Add, ArrowLeft, Delete, Save} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function EditorPage(props={}){

    const [tasks, setTasks] = useState([])
    const [name, setName] = useState("")
    const navigate = useNavigate();
    const id = useParams()

    useEffect(()=>{
        if(props.todoList.length > Number(id.id)){
            setTasks(props.todoList[id.id].tasks)
            setName(props.todoList[id.id].name)
        }
    }, [id, props.todoList])

    return(
        <div style={{
            margin: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>

            <Card sx={{ width: 375, minHeight: 350, maxHeight: 500, overflow: "auto"}}
                  style={{display: "inline-block", margin: 20, position: "relative"}}
            >
                <CardContent>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={1} marginBottom={2}>
                        <TextField onChange={e=>{setName(e.target.value)}} value={name} error={name === ""} id="outlined-basic" label={"Name"} variant="outlined" />
                    </Stack>
                    <Stack direction={"column"} spacing={2}>
                        {tasks.map((task, index) => {
                            return(
                                <Stack justifyContent={"space-evenly"} key={index} direction={"row"}>
                                    <TextField
                                        sx={{width: "75%"}}
                                        error={task === ""}
                                        id="outlined-basic"
                                        label={"Task name"}
                                        value={task.name}
                                        variant="outlined"
                                        onChange={e=>{
                                            let newTasks = Object.assign([], tasks)
                                            newTasks[index].name = e.target.value
                                            setTasks(newTasks)
                                        }}
                                    />
                                    <Button
                                        onClick={e=>{
                                            let newTasks = Object.assign([], tasks)
                                            newTasks.splice(index, 1)
                                            setTasks(newTasks)
                                        }}
                                        sx={{width: "10%"}}
                                    >
                                        <Delete/>
                                    </Button>
                                </Stack>
                            )
                        })}
                        <Stack direction={"row"} justifyContent={"center"}>
                            <Button onClick={e=>{
                                navigate("/main", {replace: true})
                            }}><ArrowLeft/></Button>
                            <Button
                                onClick={e=>{
                                    for (let i = 0; i < tasks.length; i++) {
                                        if(tasks[i].name === ""){
                                            return
                                        }
                                    }
                                    let newTasks = Object.assign([], tasks)
                                    newTasks.push({name: "", done: false})
                                    setTasks(newTasks)
                                }}
                            >
                                <Add/>
                            </Button>
                            <Button
                                onClick={e=>{
                                    if(name === ""){
                                        return
                                    }
                                    let newTodo = {name: name, tasks: []}

                                    for (let i = 0; i < tasks.length; i++) {
                                        if (tasks[i].name === ""){
                                            return;
                                        }
                                        else {
                                            let newTask = {name: tasks[i].name, done: tasks[i].done}
                                            newTodo.tasks.push(newTask)
                                        }
                                    }
                                    let newTodoList = Object.assign([], props.todoList)
                                    if(Number(id.id) < props.todoList.length){
                                        newTodoList[id.id] = newTodo
                                    }else {
                                        newTodoList.push(newTodo)
                                    }
                                    props.setTodoList(newTodoList)
                                    navigate("/main", {replace: true})
                                }}
                            >
                                <Save/>
                            </Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </div>
    )
}