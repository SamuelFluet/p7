const db = require("../config/db");

class Post {
 
  static save(post) {
    let imageurl = post.imageurl !== null ? `'${post.imageurl}'` : null;
    let sql = `
    INSERT INTO post(
      content,
      imageurl,
      userid
    )
    VALUES(
      '${post.content}',
      ${imageurl},
      '${post.userid}'
    )
    `;

    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM post;";

    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM post WHERE id = "${id}";`;

    return db.execute(sql);
  }

  static deleteOne(id){
    let sql = `DELETE FROM post WHERE id = "${id}";`;

    return db.execute(sql);
  }

}

module.exports = Post;
