import app, { connectDB } from "./app";

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
    }).catch((error) => {
        console.error("Server failed to start:", error);
        process.exit(1);
    }
);