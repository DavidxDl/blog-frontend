import { useEffect, useState } from "react";
import { post } from "../App";

type message = {
  email: string;
  message: string;
  timestamp?: string;
};

interface Props {
  post: post;
}
export default function PostInfo({ post }: Props) {
  const [emailInput, setEmailInput] = useState<string>("");
  const [commentInput, setCommentInput] = useState<string>("");
  const [comments, setComments] = useState<message[]>([]);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const commentTmp: message = {
      email: emailInput,
      message: commentInput,
    };
    const res = await fetch(
      `https://blog-frontend-tau-seven.vercel.app/api/posts/${post._id}.comments`,
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
      setEmailInput("");
      setCommentInput("");

      const res = await fetch(
        `https://blog-frontend-tau-seven.vercel.app/api/posts/${post._id}.comments`,
      );
      const data = await res.json();
      setComments(data);
    }
  }
  useEffect(() => {
    (async function getData() {
      const res = await fetch(
        `https://blog-frontend-tau-seven.vercel.app/api/posts/${post._id}.comments`,
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
          comments.map((c) => (
            <>
              <div className="border rounded p-3">
                <h2>
                  <span className="text-xl">✉️</span>: {c.email}
                </h2>
                <p>{c.message}</p>
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
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
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
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
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
