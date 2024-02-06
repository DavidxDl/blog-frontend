import { post } from "../App";

interface Props {
  post: post;
  onClick: (post: post) => void;
}
export default function PostCard({ post, onClick }: Props) {
  return (
    <div
      onClick={() => onClick && onClick(post)}
      className="p-3 w-full rounded flex flex-col gap-2 hover:cursor-pointer border shadow-black"
    >
      <h1 className="font-bold text-2xl">{post.title}</h1>
      <h2 className="text-xl">{post.text}</h2>
      <p>{post.timestamp}</p>
    </div>
  );
}
