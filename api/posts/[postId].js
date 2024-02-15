import fetch from "node-fetch";

export default async (req, res) => {
  try {
    let { postId } = req.query;
    if (postId.endsWith(".comments")) {
      postId = postId.slice(0, -9);
      if (res.method === "GET") {
        const response = await fetch(
          `http://172.233.16.85/posts/${postId}/comments`,
        );
        const data = await response.json();
        res.status(200).json(data);
        return;
      } else {
        return
      }
    }

    const response = await fetch(`http://172.233.16.85/posts/${postId}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    const { postId } = req.query;
    res
      .status(500)
      .json({ postId: postId.slice(0, -9), error: "internal server error" });
  }
};
