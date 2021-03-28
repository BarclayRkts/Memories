import React, {useState, useEffect} from 'react';
import { Container, AppBar, Typography, Grow, Grid, makeStyles, Paper, Button } from '@material-ui/core';
import './styles/Home.css';
import CardItem from "./CardsItem";
import Form from "./Form";
import Axios from 'axios';
// import post from '../../../server/post';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    btn:{
        color: 'white',
        background: "black"
    }
}));

export default function Home() {
    
    const classes = useStyles();
    const [visible, setVisible] = useState(true);
    const [posts, setPosts] = useState([""]);
    
    const handleClick = () => {
        setVisible(!visible);
    }

    useEffect(() => {
        getPost();
    });

    const getPost = () => {
        Axios({
            method : "GET",
            withCredentials: true,
            url: "http://localhost:3001/posts/api",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            // alert('Post added to data base!');
            const dataApi = res.data;
            setPosts(dataApi);
            // console.log(res.data);
        });
    }
    
    const displayPosts = (posts) => {
        // console.log("this is the posts function");
        // console.log(posts);
        const secondColumnStart = Math.floor(posts.length / 2);
        if(posts.length === 0) return null;

        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    {posts.slice(0,secondColumnStart).map((post, index) => (
                        <CardItem id={post._id} key={post._id} name={post.title} author={post.author} msg={post.msg} tags={post.tags} img={post.img} like={post.like}/>
                    ))}
                </Grid>
                <Grid item xs={6}>
                    {posts.slice(secondColumnStart).map((post, index) => (
                        <Grid item xs={6}>
                            <CardItem id={post._id} key={post._id} name={post.title} author={post.author} msg={post.msg} tags={post.tags} img={post.img} like={post.like}/>
                        </Grid>
                    ))}                
                </Grid>
            </Grid>
        );
        
    }


    return (
        <>
        <Container class="jumbotron">
            <AppBar position="static" color="inherit">
                <Typography  variant="h2" align="center">Memories</Typography>    
            </AppBar>
        </Container>
        
        <div>
            {visible ? null : <Form toggle={handleClick} getPostFunction={getPost}/>}
        </div>
        
        <Button className={classes.btn} onClick={handleClick}>Add Post</Button>
        
        <span>
            {displayPosts(posts)}
        </span>
            
        

        {/*<div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <CardItem name='Beach' author="Mike" pic='https://www.tripsavvy.com/thmb/mTIFv3ZxmtIegfah4q4gSlmZITI=/1868x1401/smart/filters:no_upscale()/GettyImages-632172305-5927229e3df78cbe7ef5c846.jpg'/>
                    <CardItem name='Disney' author="Sally" pic='https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/shutterstock_199419065.jpg'/>
                    {displayPosts(posts)}
                </Grid>
                <Grid item xs={6}>
                    <CardItem name='Food' author="Alexis" pic='https://images.immediate.co.uk/production/volatile/sites/2/2017/12/xmas-Cover-17v5-54a9395.jpg?quality=90&resize=768%2C574'/>
                    <CardItem name='Concert' author="Jake" pic='https://image.cnbcfm.com/api/v1/image/106613182-1601413553874-dis.jpg?v=1614204369'/>
                </Grid>
            </Grid>
        </div>*/}
        </>

    )
}
