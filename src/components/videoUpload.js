// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Box, Button, TextField, Typography, Card, CardContent, CircularProgress } from '@mui/material';
// import api from "../services/api";
// import { useNavigate } from 'react-router-dom';
// const UploadPage = () => {
//   const navigate = useNavigate();
//   const [video, setVideo] = useState(null);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [loading, setLoading] = useState(false);
//   // const location = useLocation();
//   const userId =localStorage.getItem("authToken");
 
//   console.log('user id',userId);
//   const handleFileChange = (e) => {
//     setVideo(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!video) {
//       alert('Please select a video file.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', video);
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('userId', userId); // Include userId

//     setLoading(true);

//     try {
//       const response = await api.post('/videos/upload', formData);
//       alert('Video uploaded successfully!');
//       console.log('Response:', response.data);
//       setTitle('');
//       setDescription('');
//       setVideo(null);
//       navigate('/');
//     } catch (err) {
//       console.error('Error:', err);
//       const errorMessage = err.response?.data?.error || 'Create Account to upload,like and comment the Video';
//       alert(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleNavigation = () => {
//     navigate('/');
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//         backgroundColor: '#000',
//       }}
//     >
//       <Card sx={{ maxWidth: 500, width: '100%', backgroundColor: '#1c1c1c', color: '#fff' }}>
//         <CardContent>
//           <Typography variant="h5" sx={{ color: '#ff0050', textAlign: 'center', marginBottom: '20px' }}>
//             Upload Video
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="file"
//               accept="video/*"
//               onChange={handleFileChange}
//               required
//               style={{ margin: '10px 0', color: '#fff' }}
//             />
//             <TextField
//               label="Title"
//               variant="outlined"
//               fullWidth
//               required
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               sx={{ marginBottom: '10px', backgroundColor: '#333' }}
//               InputLabelProps={{ style: { color: '#fff' } }}
//               inputProps={{ style: { color: '#fff' } }}
//             />
//             <TextField
//               label="Description"
//               variant="outlined"
//               multiline
//               rows={3}
//               fullWidth
//               required
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               sx={{ marginBottom: '10px', backgroundColor: '#333' }}
//               InputLabelProps={{ style: { color: '#fff' } }}
//               inputProps={{ style: { color: '#fff' } }}
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               disabled={loading}
//               sx={{
//                 backgroundColor: loading ? '#555' : '#ff0050',
//                 color: '#fff',
//                 '&:hover': { backgroundColor: loading ? '#555' : '#d60046' },
//               }}
//             >
//               {loading ? (
//                 <CircularProgress size={24} sx={{ color: '#fff' }} />
//               ) : (
//                 'Upload'
//               )}
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
              
//               disabled={loading}
//               onClick={handleNavigation}
//               sx={{
//                 mt:2,
//                 backgroundColor: loading ? '#555' : '#ff0050',
//                 color: '#fff',
//                 '&:hover': { backgroundColor: loading ? '#555' : '#d60046' },
//               }}
//             >
             
//                 Watch reels
              
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default UploadPage;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Card, CardContent, CircularProgress, IconButton } from '@mui/material';
import api from "../services/api";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadPage = () => {
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("authToken");

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video) {
      alert('Please select a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('userId', userId);

    setLoading(true);

    try {
      const response = await api.post('/videos/upload', formData);
      alert('Video uploaded successfully!');
      setTitle('');
      setDescription('');
      setVideo(null);
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Create Account to upload, like, and comment on the Video';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #1a1a1a, #333)', // Gradient background
      }}
    >
      <Card sx={{
        maxWidth: 500,
        width: '100%',
        backgroundColor: '#242424',
        color: '#fff',
        borderRadius: '15px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
        overflow: 'hidden',
      }}>
        <CardContent>
          <Typography variant="h5" sx={{
            color: '#ff4081',
            textAlign: 'center',
            marginBottom: '20px',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'bold',
          }}>
            Upload Your Video
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
            }}>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                required
                style={{
                  margin: '10px 0',
                  backgroundColor: '#333',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '10px',
                  border: '2px solid #ff4081',
                  cursor: 'pointer',
                }}
              />
            </Box>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                marginBottom: '15px',
                backgroundColor: '#333',
                borderRadius: '10px',
              }}
              InputLabelProps={{
                style: { color: '#ff4081' },
              }}
              inputProps={{
                style: { color: '#fff' },
              }}
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                marginBottom: '20px',
                backgroundColor: '#333',
                borderRadius: '10px',
              }}
              InputLabelProps={{
                style: { color: '#ff4081' },
              }}
              inputProps={{
                style: { color: '#fff' },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: loading ? '#444' : '#ff4081',
                color: '#fff',
                borderRadius: '10px',
                padding: '12px',
                '&:hover': {
                  backgroundColor: loading ? '#444' : '#ff1e5c',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
              startIcon={loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : <CloudUploadIcon />}
            >
              {loading ? 'Uploading...' : 'Upload Video'}
            </Button>
            <Button
              variant="contained"
              fullWidth
              disabled={loading}
              onClick={handleNavigation}
              sx={{
                mt: 2,
                backgroundColor: '#00bcd4',
                color: '#fff',
                borderRadius: '10px',
                padding: '12px',
                '&:hover': {
                  backgroundColor: '#0097a7',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              Watch Reels
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UploadPage;
