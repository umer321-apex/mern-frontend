
// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Button,
//   CardMedia,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
// } from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import CommentIcon from "@mui/icons-material/Comment";
// import ShareIcon from "@mui/icons-material/Share";
// import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
// import AddIcon from "@mui/icons-material/Add";
// import api from "../services/api";

// const socket = io("http://localhost:5000");

// const FeedPage = () => {
//   const [videos, setVideos] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [comments, setComments] = useState([]); // New state for storing comments
//   const navigate = useNavigate();
//   const containerRef = useRef(null);

//   useEffect(() => {
//     fetchVideos();

//     // Listen for real-time like updates
//     socket.on("likeUpdated", ({ videoId, likes }) => {
//       setVideos((prevVideos) =>
//         prevVideos.map((video) =>
//           video._id === videoId ? { ...video, likes: new Array(likes).fill(1) } : video
//         )
//       );
//     });

//     return () => {
//       socket.off("likeUpdated");
//     };
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const { data } = await api.get("/videos/videos");
//       setVideos(data);
//       // Initialize comments for each video (empty initially)
//       setComments(data.map(() => []));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleLike = async (id) => {
//     try {
//       await api.put(`/videos/like/${id}`);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleCommentClick = () => setIsCommentDialogOpen(true);

//   const handleCommentSubmit = () => {
//     const newComment = { text: commentText };

//     // Update comments state to show the new comment immediately
//     setComments((prevComments) => {
//       const updatedComments = [...prevComments];
//       updatedComments[currentIndex].push(newComment);
//       return updatedComments;
//     });

//     setCommentText("");
//     setIsCommentDialogOpen(false);
//   };

//   const handleShare = () => {
//     const videoUrl = videos[currentIndex]?.videoUrl;
//     if (videoUrl) {
//       const whatsappUrl = `https://wa.me/?text=Check out this video: ${videoUrl}`;
//       window.open(whatsappUrl, "_blank");
//     }
//   };

//   // Use IntersectionObserver to detect when the video comes into view
//   const videoRefs = useRef([]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const index = videoRefs.current.indexOf(entry.target);
//             if (index !== -1) {
//               setCurrentIndex(index);
//               // Set video quality to 360p when it comes into view
//               videoRefs.current[index].playbackRate = 1; // Default playbackRate
//               videoRefs.current[index].setAttribute("playsinline", "true"); // Important for mobile
//               videoRefs.current[index].setAttribute("muted", "muted");
//               videoRefs.current[index].setAttribute("poster", ""); // Optional poster image to hide loading screen
//               console.log("Video at index", index, "set to 360p");
//             }
//           }
//         });
//       },
//       { threshold: 0.5 } // Trigger when 50% of the video is in view
//     );

//     videoRefs.current.forEach((video) => {
//       observer.observe(video);
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "90vh",
//         backgroundColor: "#000",
//         mt: 4,
//       }}
//     >
//       <Box
//         ref={containerRef}
//         sx={{
//           width: 350,
//           height: 550,
//           backgroundColor: "#1c1c1c",
//           borderRadius: 20,
//           boxShadow: "0 0 15px rgba(255, 0, 80, 0.8)",
//           overflow: "auto",
//         }}
//       >
//         {videos.map((video, index) => (
//           <CardMedia
//             key={video._id}
//             component="video"
//             src={video.videoUrl}
//             controls
//             ref={(el) => (videoRefs.current[index] = el)} // Assign refs to each video
//             autoPlay={index === currentIndex} // Only play the video that is in view
//             loop
//             muted
//             controlsList="nodownload noplaybackrate" // Prevent user from changing playback speed and video quality
//             sx={{ width: "100%", height: "100%", objectFit: "contain" }}
//           />
//         ))}
//       </Box>

//       <Box
//         sx={{
//           position: "absolute",
//           top: "70%",
//           right: "34%",
//           transform: "translateY(-50%)",
//           display: "flex",
//           flexDirection: "column",
//           gap: 4,
//         }}
//       >
//         <IconButton
//           sx={{ color: "#ff0050" }}
//           onClick={() => handleLike(videos[currentIndex]?._id)}
//         >
//           <FavoriteIcon />
//         </IconButton>
//         <Typography
//           sx={{
//             color: "#fff",
//             fontSize: "0.8rem",
//             textAlign: "center",
//           }}
//         >
//           {videos[currentIndex]?.likes?.length || 0}
//         </Typography>
//         <IconButton sx={{ color: "#fff" }} onClick={handleCommentClick}>
//           <CommentIcon />
//         </IconButton>
//         <IconButton sx={{ color: "#fff" }} onClick={handleShare}>
//           <ShareIcon />
//         </IconButton>
//       </Box>
//       <Button
//         variant="contained"
//         sx={{
//           position: "absolute",
//           bottom: 30,
//           right: 30,
//           backgroundColor: "#ff0050",
//           color: "#fff",
//           width: 60,
//           height: 60,
//           borderRadius: "50%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           "&:hover": { backgroundColor: "#d60046" },
//         }}
//         onClick={() => navigate("/upload")}
//       >
//         <AddIcon />
//       </Button>

//       <Dialog
//         open={isCommentDialogOpen}
//         onClose={() => setIsCommentDialogOpen(false)}
//       >
//         <DialogTitle>Add a Comment</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Comment"
//             variant="outlined"
//             fullWidth
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsCommentDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleCommentSubmit} color="primary">
//             Post
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Display comments for the current video */}
//       <Box sx={{ padding: "10px", color: "#fff", maxHeight: "200px", overflowY: "auto" }}>
//         {comments[currentIndex]?.map((comment, index) => (
//           <Typography key={index} sx={{ marginBottom: "8px" }}>
//             {comment.text}
//           </Typography>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default FeedPage;



import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import api from "../services/api";

const socket = io("http://localhost:5000");

const FeedPage = () => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    fetchVideos();

    socket.on("likeUpdated", ({ videoId, likes }) => {
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === videoId ? { ...video, likes: new Array(likes).fill(1) } : video
        )
      );
    });

    return () => {
      socket.off("likeUpdated");
    };
  }, []);

  const fetchVideos = async () => {
    try {
      const { data } = await api.get("/videos/videos");
      setVideos(data);
      setComments(data.map(() => []));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async (id) => {
    try {
      await api.put(`/videos/like/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentClick = () => setIsCommentDialogOpen(true);

  const handleCommentSubmit = () => {
    const newComment = { text: commentText };
    setComments((prevComments) => {
      const updatedComments = [...prevComments];
      updatedComments[currentIndex].push(newComment);
      return updatedComments;
    });
    setCommentText("");
    setIsCommentDialogOpen(false);
  };

  // const handleDownload = () => {
  //   const videoUrl = videos[currentIndex]?.videoUrl;
  //   if (videoUrl) {
  //     const link = document.createElement("a");
  //     link.href = videoUrl;
  //     link.download = `video-${currentIndex + 1}.mp4`;
  //     link.click();
  //   }
  // };

  const handleDownload = async () => {
    const videoUrl = videos[currentIndex]?.videoUrl;
    if (videoUrl) {
      try {
        const response = await fetch(videoUrl); // Fetch the video file
        const blob = await response.blob(); // Convert the response into a Blob
        const blobUrl = URL.createObjectURL(blob); // Create a temporary URL for the Blob
        
        // Trigger the download
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `video-${currentIndex + 1}.mp4`; // Filename for the downloaded video
        link.click();
  
        // Release the Blob URL after the download is triggered
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Error downloading the video:", error);
      }
    }
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = videoRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setCurrentIndex(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video) => observer.observe(video));

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        backgroundColor: "#121212",
        mt: 4,
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          width: 350,
          height: 550,
          backgroundColor: "#232323",
          borderRadius: 20,
          boxShadow: "0 0 20px rgba(100, 100, 255, 0.8)",
          overflow: "auto",
        }}
      >
        {videos.map((video, index) => (
          <CardMedia
            key={video._id}
            component="video"
            src={video.videoUrl}
            controls
            ref={(el) => (videoRefs.current[index] = el)}
            autoPlay={index === currentIndex}
            loop
            muted
            controlsList="nodownload noplaybackrate"
            sx={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ))}
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "70%",
          right: "34%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <IconButton
          sx={{ color: "#64b5f6" }}
          onClick={() => handleLike(videos[currentIndex]?._id)}
        >
          <FavoriteIcon />
        </IconButton>
        <Typography sx={{ color: "#fff", fontSize: "0.8rem", textAlign: "center" }}>
          {videos[currentIndex]?.likes?.length || 0}
        </Typography>
        <IconButton sx={{ color: "#64b5f6" }} onClick={handleCommentClick}>
          <CommentIcon />
        </IconButton>
        <IconButton sx={{ color: "#64b5f6" }} onClick={handleDownload}>
          <DownloadIcon />
        </IconButton>
      </Box>
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          bottom: 30,
          right: 30,
          backgroundColor: "#64b5f6",
          color: "#fff",
          width: 60,
          height: 60,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": { backgroundColor: "#42a5f5" },
        }}
        onClick={() => navigate("/upload")}
      >
        <AddIcon />
      </Button>

      <Dialog
        open={isCommentDialogOpen}
        onClose={() => setIsCommentDialogOpen(false)}
      >
        <DialogTitle>Add a Comment</DialogTitle>
        <DialogContent>
          <TextField
            label="Comment"
            variant="outlined"
            fullWidth
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCommentDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCommentSubmit} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ padding: "10px", color: "#fff", maxHeight: "200px", overflowY: "auto" }}>
        {comments[currentIndex]?.map((comment, index) => (
          <Typography key={index} sx={{ marginBottom: "8px" }}>
            {comment.text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default FeedPage;
