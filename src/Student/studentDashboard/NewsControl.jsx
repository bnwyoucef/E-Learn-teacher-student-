import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from '../../API/Axios';
import {useState,useEffect} from 'react';

const handleDragStart = (e) => e.preventDefault();



const NewsControl = () => {
  const [newsList,setNewsList] = useState([]);
  const [studentId,setStudentId] = useState(0);

  useEffect(() => {
    if(localStorage.getItem('loginStatus')){
      const loginStatus = JSON.parse(localStorage.getItem('loginStatus'))
      setStudentId(parseInt(loginStatus.currentUser.group_Id));
    }
  },[])

  async function getMyNews() {
    try {
      if(studentId) {
        const response = await axios.get(`news/ofGroup/${studentId}`);
        // const response = await axios.get(`news/news_to_approve`);
        let items = response.data.message.map(item => {
          return (
            <div style={{background: 'white',border: '1px solid #E5E5E5',height:'200px',margin:'0 10px',display:'flex',justifyContent: 'center',flexDirection:'column',alignItems:'center',padding:'0 5px'}} onDragStart={handleDragStart} role="presentation">
            <h3>{item.object}</h3>
            <p style={{textAlign: 'center'}}>{item.message}</p>
            </div>
          );
        })
        setNewsList(items);
      }
    }catch(err) {
      console.log(err.message);
    }
  }

  useEffect(()=> {getMyNews()},[studentId]);
 
  const responsive = {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1024: {
      items: 4
    }
  };
  return (
    <div style={{display: 'flex',position: 'relative',alignItems: 'center',justifyContent: 'center',width:'100%',height:'220px',marginTop: '-85px'}}>
      <div style={{width:'100%',position:'absolute'}}>
        <AliceCarousel mouseTracking items={newsList}
          duration={400}
          autoPlay={true}
          startIndex = {1}
          fadeOutAnimation={true}
          mouseDragEnabled={true}
          playButtonEnabled={true}
          responsive={responsive}
          autoPlayInterval={3000}
          autoPlayDirection="rtl"
          autoPlayActionDisabled={true}  
          disableButtonsControls={true} 
          disableDotsControls={true}
          infinite
        />
        
      </div>
    </div>

  );
}

export default NewsControl;