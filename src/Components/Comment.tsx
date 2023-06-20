import { Box, Text, Flex, Spacer, HStack, Button, Grid, GridItem } from "@chakra-ui/react";
import { UserState } from "../atom/atomstate";
import { IconButton } from "./IconButton";
import { FaHeart, FaEdit, FaTrash, FaReply } from "react-icons/fa";
import { getRepliesSelector, CommentState, commentArrState, postState, PostState } from "../atom/atomstate";
import { useRecoilValue, useRecoilState } from "recoil";
import { CommentList } from "./CommentList";
import { useState } from "react";
import { CommentForm } from "./CommentForm";
import { createComment } from "../Services/comments";
import { useAsyncFn } from "../hooks/useAsync";
import { updateComment } from "../Services/comments";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short"
});

type commentProp = {
  _id: string;
  message: string;
  user: UserState;
  createdAt: Date;
  parent: string;
};

const commentStyle = {
  border: "1px",
  borderRadius: "0.5rem",
  borderColor: "#66ccff",
  boxShadow: "0 0 5px rgba(0,0,0,0.3)",
  padding: "1%",
  margin: "2%",
  transition: "all 0.2s ease-in-out",
  ":hover": {
    transform: "scale(1.05)",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)"
  }
};

const childCommentLineStyle = {
  display: "content",
  p: "10%",
  margin: "20%",
  h: "90%",
  w: "10px",
  cursor: "pointer",
  outline: "none",

  "::before": {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "10%",
    width: "2px",
    backgroundColor: "#d1e0e0",
    transition: "100ms ease-in-out",
    pointerEvents: "none"
  },
  ":hover::before, :focus-visible::before": {
    backgroundColor: "#66ccff"
  }
};

const textStyle = {
  fontSize: "0.7rem",
  fontWeight: "bold",
  fontFamily: "sans-serif",
  color: "#66ccff",
  margin: "2px"
};
const dateStyle = {
  fontSize: "0.7rem",
  fontFamily: "sans-serif",
  color: "#66ccff",
  margin: "2px"
};
const msgStyle = {
  fontSize: "0.9rem",
  fontFamily: "sans-serif",
  color: "black",
  margin: "2px",
  pl: "5px"
};

export const Comment = ({ _id, message, user, createdAt }: commentProp) => {
  const commentsByParentIdFn = useRecoilValue(getRepliesSelector);
  const childComments = commentsByParentIdFn(_id);
  const [areChildrenHidden, setAreChildrenHidden] = useState(true);
  const [isReplying, setReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const createCommentFn = useAsyncFn<CommentState>(createComment);
  const [comments, setComments] = useRecoilState<CommentState[]>(commentArrState);
  const [post, setPostValue] = useRecoilState<PostState>(postState);
  const updateCommentFn = useAsyncFn<CommentState>(updateComment);

  const onCommentReply = (message: string) => {
    return createCommentFn.execute({ postId: post._id, message: message, parent: _id }).then((comment) => {
      setComments((oldComments) => [comment, ...oldComments]);
    });
  };

  const onCommentEdit = (message: string) => {
    console.log("Comment id ",_id);
    return updateCommentFn.execute({ postId: post._id, message: message, id:_id }).then((comments) => {
        setIsEditing(false);
      setComments((oldComments) => {
        return oldComments.map((comment) => {
          if (comment._id === _id) {
            return { ...comment, message: comments.message };
          }
          return comment;
        });
      });
    });
  };

  return (
    <Box border="1px" w="50rem">
      <Box sx={commentStyle}>
        <Flex gap={4}>
          <Text sx={textStyle}>{user.name}</Text>
          <Spacer />
          <Text sx={dateStyle}>{dateFormatter.format(new Date(createdAt))}</Text>
        </Flex>

        {isEditing ? (
          <CommentForm
            autoFocus={true}
            onSubmit={onCommentEdit}
            loading={updateCommentFn.loading}
            error={updateCommentFn.error}
            initialValue={message}
          />
        ) : (
          <Text sx={msgStyle}>{message}</Text>
        )}

        <HStack>
          <IconButton Icon={FaHeart} aria-label="Like">
            2
          </IconButton>

          <IconButton
            onClick={() => {
              console.log("click reply");
              return setReply((prev) => !prev);
            }}
            isActive={isReplying}
            Icon={FaReply}
            aria-label={isReplying ? "Cancel Reply" : "Reply"}
          />

          <IconButton
            onClick={() => setIsEditing((prev) => !prev)}
            isActive={isEditing}
            Icon={FaEdit}
            aria-label={isEditing ? "Cancel Edit" : "Edit"}
          />

          <IconButton Icon={FaTrash} aria-label="Delete" color="red">
            2
          </IconButton>
        </HStack>
      </Box>
      {isReplying && (
        <Box>
          <CommentForm
            autoFocus={true}
            onSubmit={onCommentReply}
            loading={createCommentFn.loading}
            error={createCommentFn.error}
          />
        </Box>
      )}
      {childComments != null && childComments.length > 0 && (
        <Box>
          <Box display={areChildrenHidden ? "none" : "inherit"} border="2px" w="50em">
            <Grid templateColumns="repeat(12,1fr)">
              <GridItem colSpan={1}>
                <Button variant="ghost" sx={childCommentLineStyle} onClick={() => setAreChildrenHidden(true)} aria-label="Hide Replies" />
              </GridItem>
              <GridItem colSpan={11}>
                <CommentList comments={childComments} />
              </GridItem>
            </Grid>
          </Box>
          {areChildrenHidden ? (
            <Button ml="1rem" mb="0.5rem" onClick={() => setAreChildrenHidden(false)}>
              Show Replies
            </Button>
          ) : (
            <></>
          )}
        </Box>
      )}
    </Box>
  );
};
