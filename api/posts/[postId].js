import fetch from "node-fetch";

export default async (req, res) => {
  try {
    const { postId } = req.query;
    console.log(postId);
    const response = await fetch(`http://172.233.16.85/posts/${postId}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    const { postId } = req.query;
    res
      .status(500)
      .json({ postId: postId.slice(0, -8), error: "internal server error" });
  }
};
