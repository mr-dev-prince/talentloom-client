export interface UserType {
  _id: string;
  name: string;
  email: string;
  dob?: Date;
  bio: string;
}

export interface CommentType {
  _id: string;
  discussionId: string;
  userId: UserType;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiscussionType {
  _id: string;
  userId: UserType;
  title: string;
  content: string;
  upvotes: number;
  comments: CommentType[];
  public: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DiscussionState {
  discussions: DiscussionType[];
  discussion: DiscussionType | null;
  loading: boolean;
  error: string | null;
  sortBy: "upvotes" | "date";
}

export interface CreateCommentPayload {
  discussionId: string;
  content: string;
}

export interface CreateCommentResponse {
  discussionId: string;
  comment: CommentType;
}

export interface ToggleUpvotePayload {
  discussionId: string;
}

export interface ToggleUpvoteResponse {
  discussionId: string;
  upvotes: number;
  hasUpvoted: boolean;
  message: string;
}

export interface CreateDiscussionPayload {
  title: string;
  content: string;
  public: boolean;
}

export interface GetDiscussionByIdResponse {
  discussion: DiscussionType;
}

export interface DiscussionHeaderProps {
  discussionId: string;
}

export interface DiscussionActionsProps {
  discussionId: string;
  handleUpvote: () => void;
  handleOpenComments: () => void;
  loading: boolean;
}

export interface DiscussionState {
  discussions: DiscussionType[];
  discussion: DiscussionType | null;
  loading: boolean;
  error: string | null;
  sortBy: "upvotes" | "date";
}

export interface AddCommentProps {
  loading: boolean;
  handleAddComment: (
    e: React.FormEvent,
    newComment: string,
    setNewComment: React.Dispatch<React.SetStateAction<string>>
  ) => void;
}
