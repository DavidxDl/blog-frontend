import fetch from "node-fetch";

export default async (req, res) => {
  const postId = req.params.postId;
  const actualPostId = "habibi";
  try {
    //yep
    const response = await fetch(
      `http://172.233.16.85/posts/${actualPostId}/comments`,
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.log(req.params.postId);
    res
      .status(500)
      .json({ error: "internal server error", params: req.params.postId });
  }
};
