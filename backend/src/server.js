const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const publicEventRoutes = require("./routes/publicEventRoutes");

const app = express();

// Enable CORS for frontend and external fest websites embedding the widget
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve embeddable widget static files
app.use("/widget", express.static(path.join(__dirname, "widget")));

// Public Event Registration API
app.use("/api/public", publicEventRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Backend API is running!"
    });
});

const PORT = process.env.port || process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Widget script available at http://localhost:${PORT}/widget/widget.js`);
    });
}

module.exports = app;
