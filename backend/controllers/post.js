const Post = require("../models/Post");

exports.getAllPosts = async (req, res, next) => {
  try {
    const [posts] = await Post.findAll();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error)
  }
};

exports.createNewPost = async (req, res, next) => {
  try {
    console.log(req.body)
    let post = JSON.parse(req.body.post)
    console.log(post)
    if(req.file){
      post.imageurl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }else{
      post.imageurl = null;
    }
    console.log(post)
    result = await Post.save(post);

    res.status(201).json({ id: result[0].insertId,...post });
  } catch (error) {
    res.status(500).json(error)
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    let postId = req.params.id;

    let [post] = await Post.findById(postId);

    res.status(200).json(post[0]);
  } catch (error) {
    res.status(500).json(error)
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    let postId = req.params.id;

    await Post.deleteOne(postId);

    res.status(200).json("post supprimé");
  } catch (error) {
    res.status(500).json(error)
  }
};
