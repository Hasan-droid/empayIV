import React, { Component , createElement } from 'react';

class Empay extends Component {

  

    componentWillMount(){
   
        const script1 = document.createElement('script');
        const script2 = document.createElement('script');
        const script3 = document.createElement('script');
        
        // const div1=document.createElement('div');
        //  div1.id='empay-button-container';
        //  document.body.append(div1)
    
        script1.src =  '//cdn.jsdelivr.net/bluebird/3.5.0/bluebird.min.js';
        script1.async = true;
        document.head.append(script1);
    
        script3.src =  'https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.js';
        script3.async = true;
        document.head.append(script3);
    
        script2.src =  'https://developer.empay.ae/sdk/empay.js?client-id=emvat_test';
        script2.async = true;
        document.body.append(script2);
        script2.onload = () => {
              
                try { 
                  window.addEventListener('message', event => {
                    if (event.data.type === 'empayLoaded') {
                       
                        const devContainer=document.getElementById('#empay-button-container')
                        empay.Buttons({}).render(devContainer);  
                    }
                }); 
                    
                  
                    
                   
                   } catch (err) {
                     console.error('Error calling empay.Buttons():', err);
                   }
           
      
          
        };
        
    
      }
    
      componentWillUnmount(){
        return()=>{
          window.removeEventListener('message', this.handleMessage);
      const script1 = document.querySelector('[src="//cdn.jsdelivr.net/bluebird/3.5.0/bluebird.min.js"]');
      const script2 = document.querySelector('[src="https://developer.empay.ae/sdk/empay.js?client-id=emvat_test"]');
      const script3 = document.querySelector('[src="https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.js"]');
      script1.remove();
      script2.remove();
      script3.remove();
      }
      }
      componentDidMount(){
        window.addEventListener('message',this.handleMessage)
      }
    
      handleMessage=(event)=>{
        if(event.source != this.iframeRef.current.contentWindow){
          return;
        }

      }
     
    
      render() {
        return (
          <div>
             <div className="container"> 
           <div className="flex-center flex-column" id="home"> 
            <h1>Paymentyyyy Sample App</h1>
            <div id="empay-button-container"></div>
           </div> 
         </div> 
          </div>
        );
      }
}

export default Empay;