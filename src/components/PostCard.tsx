import { post } from "../App";

interface Props {
  post: post;
  onClick: (post: post) => void;
}
export default function PostCard({ post, onClick }: Props) {
  return (
    <article
      tabIndex={0}
      onClick={() => onClick && onClick(post)}
      onKeyDown={(e) => (e.key === "Enter" ? onClick(post) : null)}
      className="p-3 w-full rounded flex flex-col gap-2 hover:cursor-pointer border shadow-black"
    >
      <h1 className="font-bold text-2xl">{post.title}</h1>
      <h2 className="text-xl">{post.text}</h2>
      <p>{post.timestamp}</p>
    </article>
  );
}
