import React, { useState, useEffect } from "react";
import axios from "axios";

const GeneralDiscussions = () => {
    const [discussions, setDiscussions] = useState([]);
    const [newDiscussion, setNewDiscussion] = useState({ title: "", content: "" });
    const [selectedDiscussion, setSelectedDiscussion] = useState(null);
    const [newReply, setNewReply] = useState("");

    useEffect(() => {
        fetchDiscussions();
    }, []);

    const fetchDiscussions = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/discussions");
            setDiscussions(res.data);
        } catch (error) {
            console.error("Error fetching discussions:", error);
        }
    };

    const handleCreateDiscussion = async () => {
        if (!newDiscussion.title || !newDiscussion.content) return alert("Please enter all fields");
        try {
            await axios.post("http://localhost:5000/api/discussions", { ...newDiscussion, author: "User123" });
            setNewDiscussion({ title: "", content: "" });
            fetchDiscussions();
        } catch (error) {
            console.error("Error creating discussion:", error);
        }
    };

    const handleReply = async (discussionId) => {
        if (!newReply) return alert("Enter a reply");
        try {
            await axios.post("http://localhost:5000/api/replies", { content: newReply, author: "User123", discussion: discussionId });
            setNewReply("");
            fetchDiscussions();
        } catch (error) {
            console.error("Error adding reply:", error);
        }
    };

    const handleLike = async (discussionId) => {
        try {
            await axios.post("http://localhost:5000/api/likes", { user: "User123", targetId: discussionId, targetType: "discussion" });
            fetchDiscussions();
        } catch (error) {
            console.error("Error liking discussion:", error);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>💬 General Discussions</h1>

            {/* Create New Discussion */}
            <div style={styles.form}>
                <input
                    type="text"
                    placeholder="Discussion Title"
                    value={newDiscussion.title}
                    onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                    style={styles.input}
                />
                <textarea
                    placeholder="Discussion Content"
                    value={newDiscussion.content}
                    onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                    style={styles.textarea}
                />
                <button onClick={handleCreateDiscussion} style={styles.button}>Start Discussion</button>
            </div>

            {/* Display Discussions */}
            <div>
                {discussions.map((discussion) => (
                    <div key={discussion._id} style={styles.discussionCard}>
                        <h3>{discussion.title}</h3>
                        <p>{discussion.content}</p>
                        <div style={styles.actions}>
                            <button onClick={() => handleLike(discussion._id)} style={styles.likeButton}>👍 {discussion.likes?.length || 0}</button>
                            <button onClick={() => setSelectedDiscussion(discussion._id)} style={styles.replyButton}>💬 Reply</button>
                        </div>

                        {/* Replies Section */}
                        {selectedDiscussion === discussion._id && (
                            <div style={styles.replySection}>
                                {discussion.replies?.map((reply, index) => (
                                    <p key={index} style={styles.reply}>{reply.content}</p>
                                ))}
                                <textarea
                                    placeholder="Write a reply..."
                                    value={newReply}
                                    onChange={(e) => setNewReply(e.target.value)}
                                    style={styles.textarea}
                                />
                                <button onClick={() => handleReply(discussion._id)} style={styles.button}>Reply</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Inline CSS Styles
const styles = {
    container: { width: "60%", margin: "auto", padding: "20px", fontFamily: "Arial" },
    title: { textAlign: "center", color: "#333" },
    form: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" },
    input: { padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" },
    textarea: { padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc", minHeight: "80px" },
    button: { padding: "10px", fontSize: "16px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
    discussionCard: { background: "#f9f9f9", padding: "15px", borderRadius: "8px", marginBottom: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" },
    actions: { display: "flex", gap: "10px", marginTop: "10px" },
    likeButton: { background: "none", border: "none", color: "#007bff", fontSize: "16px", cursor: "pointer" },
    replyButton: { background: "none", border: "none", color: "#007bff", fontSize: "16px", cursor: "pointer" },
    replySection: { marginTop: "10px", paddingLeft: "10px", borderLeft: "3px solid #ccc" },
    reply: { padding: "5px", background: "#fff", borderRadius: "5px", marginBottom: "5px" }
};

export default GeneralDiscussions;
