import {authPage} from '../../middlewares/authorizationPage';

export async function getServerSideProps(ctx){
    const auth = await authPage(ctx);

    return {
        props : {}
    }
}
export default function PostsIndex(){
    return(
        <div>
            <h1>Post Page</h1>
        </div>
    );
}