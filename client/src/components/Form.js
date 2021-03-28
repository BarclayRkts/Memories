import React , { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import "./styles/Form.css";
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
    '& > *': {
        margin: theme.spacing(1),
        color: 'white',
        background: 'white',
        },
    },
    textField: {
            margin: theme.spacing(1),
            width: '28ch',
        },
    btn: {
        background: "blue",
        width: '29ch'
    },
}));

export default function ComposedTextField(props) {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [msg, setMsg] = useState("");
    const [tags, setTags] = useState("");
    const [picFile, setpicFile] = useState("");
    const classes = useStyles();

    const submitPost = async event => {
        event.preventDefault();

        Axios({
            method : "POST",
            data : {
                name: name,
                title: title,
                msg: msg,
                tags: tags,
                img: picFile
            },
            withCredentials: true,
            url: "http://localhost:3001/",
            
            
        }).then((res) => {
            // alert('Post added to data base!');
            console.log(res.data);
            props.getPostFunction();
            props.toggle();
        });
        
    };

    const handleName= (event) => {
        setName(event.target.value);
    };

    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleMsg = (event) => {
        setMsg(event.target.value);
    };

    const handleTag = (event) => {
        setTags(event.target.value);
    };

    const handlePic = (event) =>{
        setpicFile(event.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
    }

    return (
        <div className="form-container">
            <h1 className="header">Memory</h1>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>

                <button className='toggleBtn' onClick={props.toggle}>X</button>

                <FormControl variant="outlined">
                    <InputLabel htmlFor="component-outlined">Name</InputLabel>
                    <OutlinedInput id="component-outlined" value={name} onChange={handleName} label="name" />
                </FormControl>

                <FormControl variant="outlined">
                    <InputLabel htmlFor="component-outlined">Title</InputLabel>
                    <OutlinedInput id="component-outlined" value={title} onChange={handleTitle} label="title" />
                </FormControl>
                
                <TextField
                    className= {classes.textField}
                    id="outlined-multiline-static"
                    label="msg"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={msg}
                    onChange={handleMsg}
                />

                <TextField
                    className= {classes.textField}
                    id="outlined-multiline-static"
                    label="Tags"
                    multiline
                    rows={2}
                    variant="outlined"
                    onChange={handleTag}
                    value={tags}
                />

                <FormControl variant="outlined">
                    <InputLabel htmlFor="component-outlined">URL</InputLabel>
                    <OutlinedInput id="component-outlined" value={picFile} onChange={handlePic} label="file" />
                </FormControl>

                <Button type="submit" className= {classes.btn} variant="contained" color="primary" onClick={submitPost}>
                    Submit
                </Button>
            </form>
        </div>
    );
}