import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Axios from 'axios';
// import { Card } from 'react-bootstrap';

const useStyles = makeStyles({
    root: {
        width: 300,
        marginTop: 20,
        marginBottom: 20,
},
    media: {
        height: 200,
},
    author: {
        position: "absolute",
        // top: "20%",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "none",
        fontFamily: "Comic Sans MS",
        fontSize: "1.5em",
        top: "10px",
        left: "-100px"
    }
});

export default function MediaCard(props) {
    const classes = useStyles();
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);

    // useEffect(() => {
    //     button();
    // });

    // const getLikeData = () => {
    //     Axios({
    //         method : "GET",
    //         withCredentials: true,
    //         url: "http://localhost:3001/posts/api",

    //     }).then((res) => {
    //         const data = res.data;
    //         console.log(res.data[0].likes_count);
    //         setLike(res.data[0].likes_count);
    //         // setLike(data.likes_count);
    //         if(res.ok) {
    //             console.log('Got total likes');
    //             return;
    //         }
    //         // throw new Error('Request failed.');
    //     });
    // }

    // const button = () => {
    //     // setLike(like + 1);
    //     // console.log(props.id);
    //     console.log('button was clicked');


    //     Axios({
    //         method : "POST",
    //         data : {
    //             id: props.id,

    //         },
    //         withCredentials: true,
    //         url: "http://localhost:3001/like",

    //     }).then((res) => {
    //         if(res.ok) {
    //             console.log('click was recorded');
    //             return;
    //         }
    //         // throw new Error('Request failed.');
    //     });

    // }

    return (
        <>
    <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            image={props.img}
            />
            <Typography gutterBottom variant="h1" component="h1" className={classes.author}>
                {props.author}
            </Typography>
            
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {props.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {props.msg}
                {props.tags}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {props.tags}
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            {/*<Button onClick={button}>
                <ThumbUpIcon/>
            </Button>
            <span>{like}</span>

            <Button>
                <ThumbDownIcon/>
            </Button>
            <span>{dislike}</span>*/}
            
        
        </CardActions>
    </Card>
    
    </>
        );
}