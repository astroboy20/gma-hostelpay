export const saveRefreshToken = async (refreshToken: string) => {
    const request = await fetch("/api/refresh-token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
    })
    const data = await request.json()

    if (request.ok) {
        console.log("Refresh token saved successfully", data);
    } else {
        console.error("Error saving refresh token", data);
    }
}