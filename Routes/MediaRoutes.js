const  {
    CreatePost,
    UpdatePost,
    DeletePost,
} = require("../Controllers/MediaPostController");

const MediaRoutes = (app) => {
    app.post("NGO/media/post",CreatePost);
    app.put("NGO/media/update",UpdatePost);
    app.delete("NGO/media/delete",DeletePost);
}

module.exports = MediaRoutes;