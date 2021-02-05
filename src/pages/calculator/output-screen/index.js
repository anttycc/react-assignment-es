import React from 'react'; 
import OutputScreenRow from '../output-row'; 
  
const OutputScreen = (props) => { 
  return ( 
    <div className="screen"> 
      <OutputScreenRow value = {props.expression}/> 
      <OutputScreenRow value = {props.evaluatedValue}/> 
    </div> 
  ) 
} 
  
export default OutputScreen; 