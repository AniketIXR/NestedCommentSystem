import {atom,selector} from "recoil";

export interface UserState{
    _id:string;
    name:string;
}

export interface CommentState{
    _id: string;
    message: string;
    user: UserState;
    parent: string;
    createdAt: Date;
}

export interface PostState{
    _id: string;
    body: string;
    title: string;
    comments: CommentState[];
}

const defaultUserState: UserState = {
    _id: "",
    name: "default",
}

const defaultCommentState: CommentState = {
    _id: "",
    message: "",
    user: defaultUserState,
    parent: "",
    createdAt: new Date(),
}


const defaultPostState: PostState = {
    _id: "",
    body: "",
    title: "",
    comments: [defaultCommentState],
}

export const globalFunc = atom({
    key: "globalFunc",
    default: () => {}
});

export const userState = atom<UserState>({
    key: "userState",
    default: defaultUserState,
});

export const commentState = atom<CommentState>({
    key: "commentState",
    default: defaultCommentState,
});

export const commentArrState = atom<CommentState[]>({
    key: "commentState",
    default: [defaultCommentState],
});

export const postState = atom<PostState>({
    key: "postState",
    default: defaultPostState,
});

export const rootCommentState = atom<CommentState[]>({
    key: "rootCommentState",
    default: [defaultCommentState],
});


export const repliesState = atom<{ [key: string]: CommentState[] }>({
    key: 'repliesState',
    default: {},
  });

  export const commentsByParentIdState = atom<{ [key: string]: CommentState[] }>({
    key: 'commentsByParentIdState',
    default: {},
  });

  export const getRepliesSelector = selector({
    key: 'getRepliesSelector',
    get: ({ get }) => (parent: string) => {
      const commentsByParentId = get(commentsByParentIdState);
      return commentsByParentId[parent] || [];
    },
  });

//   export const createLocalComment=selector({
//     key: 'createLocalComment',
//     get: ({ get}) =>(comment: CommentState)=>{
          
//     }
//   });