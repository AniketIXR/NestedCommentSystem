import { Flex } from "@chakra-ui/react";
import { CommentState } from "../atom/atomstate";
import { Comment } from "./Comment";

type CommentListProps = {
    comments: CommentState[];
}

export const CommentList = ({ comments }: CommentListProps) => {
    return <div>
        {
            comments.map(comment => (
                <Flex key={comment._id}>
                    <Comment {...comment} />
                </Flex>
            ))
        }
    </div>
    
}
