const MediaPost = require("../Models/MediaPost");

//Create New Media Post

exports.CreatePost = (req, res) => {
    try {
        const {
            title,
            content,
            author,
            mediaUrl,
        } = req.body;

        const loggedInNGO = req.user;

        const newMediaPost = new MediaPost({
            title,
            content,
            author,
            mediaUrl,
        });

        newMediaPost.save((err, data) => {
            if (err) {
                console.error(err);
                return res.status(404).json({ Error: "Failed to create Post" });
            }

            return res.status(200).json(data);
        });
    } catch (err) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

//Update Media Post

exports.UpdatePost = (req, res) => {
    try {
        const postId = req.params.id;
        const {
            title,
            content,
            mediaUrl
        } = req.body;

        const media = MediaPost.findById(postId);

        if (!media) {
            return res
                .status(404)
                .json({ success: false, message: "Post Not Found." });
        }

        media.title = title;
        media.content = content;
        media.mediaUrl = mediaUrl;
        media.updatedAt = Date.now();

        media.save((err, data) => {
            if (err) {
                console.error(err);
                return res.status(404).json({ Error: "Error in Update Media" });
            }

            return res.status(200).json(data);
        });
    } catch (err) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

//Delete Media Post

exports.DeletePost = (req, res) => {
    try {
        const postId = req.params.id;

        MediaPost.findByIdAndDelete(postId, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(404).json({ Error: "Error in Delete Media" });
            }

            if (!data) {
                return res.status(404).json({ error: "Media post not found" });
            }

            return res.status(200).json({ message: "Media post deleted successfully" });
        });
    } catch (err) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};