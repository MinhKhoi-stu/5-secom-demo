import {TextField, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/admin-dashboard');
    }

    return(

    //thẻ bọc cả trang
    <div style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        flexDirection: 'column',
        position: 'fixed',
        display: 'flex',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
    }}>
        
        {/* Logo */}
        <Typography sx={{
            fontWeight: 'bold',
            fontSize: '60px',
            color: 'black',
        }}>
            5SECOM
        </Typography>
    
        {/* thẻ bọc form login */}
        <form style={{   
            width: '600px',
            height: 'flex',
            backgroundColor: 'white',
            // border: '2px solid gray',
            borderRadius: '30px',
            boxShadow: '0px 4px 20px rgba(128, 128, 128, 0.3)'
        }}>
            {/* input username */}
            <TextField
            type="text"
            id="username"
            placeholder="Email address"
            variant="outlined"
            sx={{
                width: '500px',
                marginTop: '50px',
                backgroundColor: 'white',
                borderRadius: '10px',
                '& input::placeholder': {
                fontWeight: 'bold',
                color: 'black'
                }
            }}
            />

            {/* input password */}
            <TextField
            type="password"
            id="username"
            placeholder="Password"
            variant="outlined"
            sx={{
                width: '500px',
                marginTop: '30px',
                backgroundColor: 'white',
                borderRadius: '10px',
                '& input::placeholder': {
                fontWeight: 'bold',
                color: 'black'
                }
            }}
            />

            {/* nút Đăng nhập */}
            <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '30px',
            marginBottom: '50px'
            }}>
            <div style={{ flex: 1 }} />

            <button
                onClick={handleLogin}
                style={{
                width: '150px',
                fontSize: '20px',
                backgroundColor: 'rgba(232, 67, 12, 0.88)',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '5px',
                cursor: 'pointer'
                }}
            >
                Đăng nhập
            </button>

            <Typography style={{ flex: 1, textAlign: 'right' }}>
                <Link to="/forgotPassword" 
                style={{ 
                    fontSize: '15px',
                    textDecoration: 'none', 
                    color: 'black',
                    marginRight: '48px'
                }}>
                Quên mật khẩu?
                </Link>
            </Typography>
            </div>         
        </form>
    </div>
    
)}

export default Login;