import fetch from "node-fetch";

export default async (req, res) => {
  try {
    //yep
    const { postId } = req.params.postId.split(".")[0];
    const response = await fetch(
      `http://172.233.16.85/posts/${postId}/comments`,
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
};
