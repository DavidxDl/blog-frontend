import fetch from "node-fetch";

export default async (req, res) => {
  try {
    const { path } = req;
    let url = "http://172.233.16.85";

    if (path.startsWith("/posts")) {
      // If the request is for /posts or /posts/postId
      const parts = path.split("/");
      if (parts.length >= 3 && parts[2]) {
        // If there's a postId specified
        url += `/posts/${parts[2]}`;
        if (parts.length >= 4 && parts[3] === "comments") {
          // If the request is for /posts/postId/comments
          url += "/comments";
        }
      } else {
        // If the request is for /posts (list of posts)
        url += "/posts";
      }
    }

    // Fetch data from the constructed URL
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
