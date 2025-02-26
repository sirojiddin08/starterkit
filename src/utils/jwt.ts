import jwt from "jsonwebtoken";

const generateToken = (
    user: { id: string; unique_id: string },
    secret: string,
    expirationTime: any
): string => {
    const payload = {
        id: user.id,
        unique_id: user.unique_id,
    };

    // JWT token yaratish
    const token = jwt.sign(payload, secret, { expiresIn: expirationTime });
    return token;
};

export default generateToken;

// // Foydalanuvchining JWT tokenini yaratish
// const user = {
//     id: "123",
//     structure_id: "456",
//     role_id: "admin",
//     unique_id: "unique-789"
// };

// const token = generateToken(user);
// console.log("Generated JWT:", token);
