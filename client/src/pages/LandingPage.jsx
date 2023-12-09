import '../styles/LandingPage.css'
import chamberimg from '../assets/g10.png';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className='landing-page-main-container'>
        <div className='landing-page-wave-container'>
            <div className='landing-page-container'>
            <div className='landing-content-container'>
                <div className='landing-page-title'>Chamber</div>
                <div className='landing-page-subtitle'>A decentralized platform for developers to get funded and build products</div>
                <button className='landing-page-button' onClick={()=>navigate("/start")}>Explore Platform</button>
            </div>
            <div className='landing-page-image-container'>
                <img className='landing-page-image' src={chamberimg} alt='chamberimg'/>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default LandingPage