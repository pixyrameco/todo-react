import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox, Dialog, DialogActions, DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    Typography
} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Todo(props={}){
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };
    return(
        <Card sx={{ minWidth: 275, height: 350}}
              style={{display: "inline-block", margin: 20, position: "relative"}}
        >
            <CardContent>
                <Typography variant="h5" component="div" marginBottom={2}>
                    {props.todo.name}
                </Typography>
                <div style={{
                    height: 230,
                    overflow: "auto"
                }}>
                    {
                        props.todo.tasks.map((task, taskNum) => {
                            return(
                                <Stack direction={"row"} alignItems={"center"} key={taskNum}>
                                    <Checkbox
                                        onChange={e=>{
                                            props.changeTodoList(props.index, taskNum)
                                        }}
                                        checked={task.done}
                                    />
                                    <Typography>{task.name}</Typography>
                                </Stack>)
                        })
                    }
                </div>
            </CardContent>
            <Stack sx={{position: "absolute", bottom: 10, left: 0, right: 0}} direction={"row"} justifyContent={"center"}>
                <Button
                    onClick={e=>{
                        navigate("/edit/" + props.index, {replace: true})
                    }}
                    size="small"
                >
                    <Edit/>
                </Button>
                <Button
                    onClick={()=>{
                        setOpen(true)
                    }}
                    color={"error"}><Delete/></Button>
            </Stack>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete {props.todo.name}?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Todo list will be deleted permanently
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color={"error"}
                            onClick={event => {
                                props.deleteTodo(props.index)
                                handleClose()
                            }}
                            autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}