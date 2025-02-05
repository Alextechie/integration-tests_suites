import { app, port } from ".";

app.listen(port, () => {
    console.log(`Backend server running on port ${port}.`)
});