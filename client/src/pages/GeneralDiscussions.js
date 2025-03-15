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
        if (!newDiscussion.title || !newDiscussion.content) {
            return alert("Please enter all fields");
        }
    
        try {
            const userId = localStorage.getItem("userId");
    
            await axios.post("http://localhost:5000/api/discussions", {
                title: newDiscussion.title,
                content: newDiscussion.content,
                author: userId,
                category: "General Discussions",  // Explicitly setting category
            });
    
            setNewDiscussion({ title: "", content: "", category: "General Discussions" });  // Reset state properly
            fetchDiscussions();
        } catch (error) {
            console.error("Error creating discussion:", error.response?.data || error);
        }
    };
    
    
    const handleReply = async (discussionId) => {
        if (!newReply) return alert("Enter a reply");
        try {
            await axios.post("http://localhost:5000/api/replies", { content: newReply, author: localStorage.getItem("userId"), discussion: discussionId });
            setNewReply("");
            fetchDiscussions();
        } catch (error) {
            console.error("Error adding reply:", error);
        }
    };

    const handleLike = async (discussionId) => {
        try {
            const userId = localStorage.getItem("userId");
            console.log("Sending like request:", { user: userId, targetId: discussionId, targetType: "Discussion" });
    
            await axios.post("http://localhost:5000/api/likes", { 
                user: userId, 
                targetId: discussionId, 
                targetType: "Discussion" 
            });
    
            fetchDiscussions();
        } catch (error) {
            console.error("Error liking discussion:", error.response?.data || error);
        }
    };
    

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>💬 General Discussions</h1>

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

            <div style={styles.discussionsList}>
                {discussions.map((discussion) => (
                    <div key={discussion._id} style={styles.discussionCard}>
                        <h3>{discussion.title}</h3>
                        <p>{discussion.content}</p>
                        <div style={styles.actions}>
                            <button onClick={() => handleLike(discussion._id)} style={styles.likeButton}>👍 {discussion.likes?.length || 0}</button>
                            <button onClick={() => setSelectedDiscussion(discussion._id)} style={styles.replyButton}>💬 Reply</button>
                        </div>

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

const styles = {
    container: {
        marginLeft:"250px",
        padding: "30px",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#003c8f",
    },
    form: {
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
        width: "90%",
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    input: {
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "16px",
    },
    textarea: {
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "16px",
    },
    button: {
        padding: "10px",
        border: "none",
        borderRadius: "8px",
        background: "#003c8f",
        color: "white",
        cursor: "pointer",
        fontSize: "16px",
    },
    discussionsList: {
        width: "90%",
        maxWidth: "600px",
        marginTop: "20px",
    },
    discussionCard: {
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
        marginBottom: "15px",
    },
    actions: {
        display: "flex",
        gap: "10px",
        marginTop: "10px",
    },
    likeButton: {
        padding: "6px 10px",
        borderRadius: "8px",
        background: "#28a745",
        color: "white",
    },
    replyButton: {
        padding: "6px 10px",
        borderRadius: "8px",
        background: "#003c8f",
        color: "white",
    },
};

export default GeneralDiscussions;
