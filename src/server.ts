import app from "./app";
import env from "./config/env";

const PORT: number = Number(env.PORT);

// import bcrypt from "bcryptjs";
// (async ()=> {
//     let data = await bcrypt.hash("Qwerty@123", 10);
//     console.log(data);
// })()

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
