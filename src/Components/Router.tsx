import {
    createBrowserRouter,
    RouterProvider,
    Link,
    Route,
} from 'react-router-dom';
import {PostList} from './PostList';
import { PostProvider } from './PostProvider';
import { Post } from './Post';

const router = createBrowserRouter([
    {
        path: "/",
        element: <PostList/>,
    },
    {
        path: "/post/:id",
        element: <PostProvider>
            <Post/>
        </PostProvider>,
    }
]);

const Router = () => {
    return <RouterProvider router={router}/>;
};

export default Router;