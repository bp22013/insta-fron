import React, { useState } from "react";
import axios from "axios";

function App() {
    const [userId, setUserId] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const url = "https://insta-sc-7r18.onrender.com/";

    const handleChange = (event) => {
        setUserId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(url, { user_id: userId }, { withCredentials: true });
            setUserInfo(response.data);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    検索したいユーザーのIDを入力：
                    <input type="text" value={userId} onChange={handleChange} />
                </label>
                <button type="submit">検索</button>
            </form>
            {userInfo && (
                <div>
                    <h2>ユーザー情報</h2>
                    <p>ユーザー名: {userInfo.username}</p>
                    <p>フォロワー数: {userInfo.followers}</p>
                    <p>フォロー数: {userInfo.following}</p>
                    <p>バイオグラフィ: {userInfo.biography}</p>
                    {/* 画像の表示 */}
                    <img src={userInfo.profile_pic_url} alt="Profile Pic" />
                </div>
            )}
        </div>
    );
}

export default App;
