import { useEffect, useState } from "react";
import Header from "./components/Header";
import PostCard from "./components/PostCard";
import PostInfo from "./components/PostInfo";

export type post = {
  title: string;
  text: string;
  timestamp: string;
  _id: string;
};

function App() {
  const [posts, setPosts] = useState<post[]>([]);
  const [selectedPost, setSelectedPost] = useState<post | null>(null);

  function postClickHandle(post: post | null) {
    setSelectedPost(post);
  }
  useEffect(() => {
    async function getPosts() {
      const res = await fetch("http://localhost:3000/posts");
      const data = await res.json();
      setPosts(data);
    }
    getPosts().catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <main className="pb-4 px-5 flex flex-col gap-4 w-full m-0">
        {selectedPost ? (
          <>
            <button
              className="shadow text-xl max-w-16 rounded-full"
              onClick={() => setSelectedPost(null)}
            >
              &larr;
            </button>
            <PostInfo post={selectedPost} />
          </>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post={post} onClick={postClickHandle} />
          ))
        )}
      </main>
    </>
  );
}

export default App;
