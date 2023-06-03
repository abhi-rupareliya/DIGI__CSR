const  {
    CreatePost,
    UpdatePost,
    DeletePost,
} = require("../Controllers/MediaPostController");

const MediaRoutes = (app) => {
    app.post("/NGO/media/post",CreatePost);
    app.put("/NGO/media/update/:id",UpdatePost);
    app.delete("/NGO/media/delete/:id",DeletePost);
}

module.exports = MediaRoutes;