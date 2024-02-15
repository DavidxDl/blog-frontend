import fetch from "node-fetch";

export default async (req, res) => {
  try {
    const { postId } = req.query;
    const actualPostId = postId.slice(0, -9);
    const response = await fetch(
      `http://172.233.16.85/posts/${actualPostId}/comments`,
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    const { postId } = req.query;
    res
      .status(500)
      .json({ postId: postId.slice(0, -9), error: "internal server error" });
  }
};
