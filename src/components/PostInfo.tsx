import { useEffect, useState } from "react";
import { post } from "../App";

type message = {
  email: string;
  message: string;
  timestamp: string;
};

interface Props {
  post: post;
}
export default function PostInfo({ post }: Props) {
  const [email, setEmail] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const commentTmp = {
      email: email,
      message: comment,
    };
    const res = await fetch(
      `http://172.233.16.85:3000/posts/${post._id}/comments`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentTmp),
      },
    );
    console.log(res);
    if (res.ok) {
      setEmail("");
      setComment("");

      const res = await fetch(
        `http://172.233.16.85:3000/posts/${post._id}/comments`,
      );
      const data = await res.json();
      setComments(data);
    }
  }
  useEffect(() => {
    (async function getData() {
      const res = await fetch(
        `http://172.233.16.85:3000posts/${post._id}/comments`,
      );
      const data = await res.json();
      console.log(data);
      setComments(data);
    })();
  }, [post]);
  return (
    <div className="p-4 w-full rounded flex flex-col gap-2 border shadow-black">
      <h1 className="font-bold text-2xl">{post.title}</h1>
      <h2 className="text-xl border rounded p-3">{post.text}</h2>
      <p>{post.timestamp}</p>
      <div className="flex flex-col gap-5 ">
        <h2 className="text-center">Comments</h2>
        {comments.length ? (
          comments.map((comment) => (
            <>
              <div className="border rounded p-3">
                <h2>
                  <span className="text-xl">✉️</span>: {comment.email}
                </h2>
                <p>{comment.message}</p>
              </div>
            </>
          ))
        ) : (
          <p className="text-center">No comments</p>
        )}
      </div>

      <form className="my-2" onSubmit={handleSubmit}>
        <div className="">
          <label className=" ml-5 text-xl" htmlFor="email">
            Email
          </label>
          <input
            className="block shadow shadow-black px-5 w-full p-2 rounded-full  border-cyan-900 hover:outline outline-cyan-900 outline-2 "
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mt-2">
          <label className="ml-5 text-xl" htmlFor="comment">
            Comment
          </label>
          <textarea
            className="block w-full p-2 shadow shadow-black rounded-2xl"
            required
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            id="comment"
          />
        </div>

        <input
          type="submit"
          className="hover:bg-cyan-900 mt-3 border-cyan-900 border-2 rounded-full  ml-2 p-2 "
          value="Send Comment"
        />
      </form>
    </div>
  );
}
