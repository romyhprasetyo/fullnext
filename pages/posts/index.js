import React,{useState} from 'react';
import {authPage} from '../../middlewares/authorizationPage';
import {server} from '../../config';

export async function getServerSideProps(ctx){
    //destructured
    const {token} = await authPage(ctx);

    //Bearer (with blank space) {yourtoken}
    const postReq = await fetch(`${server}/api/posts`, {
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    });

    const posts = await postReq.json();

    //server side rendering (data only shown in console)
    //console.log(props);

    return {
        props : {
            token,
            posts : posts.data
        }
    }
}

export default function PostsIndex(props){
    //client side rendering
    //console.log(props);

    //transfer props data to state using react hook state
    const [posts, setPosts] = useState(props.posts)
    //console.log(posts);

    async function deleteHandler(id, e){
        e.preventDefault();
        const {token} = props;

        const ask = confirm('Are you sure ?');

        if(ask){
            //execute delete
            const deletePost = await fetch('/api/posts/delete/'+ id, {
                  method : 'DELETE',
                  headers : {
                      'Authorization' : 'Bearer ' + token
                  }
            });
            const res = deletePost.json();
            console.log(res);

            // data filter (for state manipulations) -> only clicked ID
            const postsFiltered = posts.filter(post => {
                return post.id !== id && post;
            });

            //refresh state
            setPosts(postsFiltered);
        }
    }
    return(
        <div>
            <h1>Post Page</h1>
            {posts.map(post => {
                return (
                    <div key={post.id}>
                        <h2>{post.title} - {post.id}</h2>
                        <p>{post.content}</p>
                        <div>
                            <button>Edit</button>
                            <button onClick={deleteHandler.bind(this, post.id)}>Delete</button>
                        </div>
                        <hr/>
                    </div>
                );
             })
            }
        </div>
    );
}