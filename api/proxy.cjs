const fetch = require("node-fetch");

module.exports = async (req, res) => {
  try {
    const res = await fetch("http://172.233.16.85/posts");
    const data = await res.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
};
