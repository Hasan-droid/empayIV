import { Component , createElement } from 'react';
import axios, { formToJSON } from 'axios';

class EmpayNoScriptsIV extends Component {
  constructor(props){
    super(props)
    this.state = {
      TokenParam  : '',
      order1:{}
    }
    console.info("props we have in EmapyNoScripts.js" , this.props.click)
    // this.createOrder = this.createOrder.bind(this);
    this.postData=this.postData.bind(this);
    
  }
getOrderData() {
    return fetch("order1.json")
      .then((response) => response.json())
      .then((data) =>
      { 
       return data;
});
   
  }

  fetchData(jsonResponse){
   
    return fetch(jsonResponse)
    .then((response) =>
    {console.info("response from fetch response.json" , response)
    return response.json()})
    .then((data) => {
      console.info("data from fetch response.json",data);
      // return data;

    }).catch(err=>{console.info("error in fetch data after post order" , err) });
  }

  async postData(url = "", data = {},token) {
    // Default options are marked with *
    console.info("token recieved in postData" , token)
    console.info("data body in postdata" , data)
    
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
         "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }


  showalert()
  {
    alert('ssssss');
  }

  async CreateToken(){
    const {data}=await axios.post('https://sts.test.empay.ae/connect/token',{
      grant_type:'client_credentials',
      scope:'orders:write checkout.client.token orders:read',
      client_id:'emvat_test',
      client_secret:'819962b7-7fa4-b17b-e01b-fb306b4d5342'
    },{
      headers:{
        'Content-Type':'multipart/form-data'
      }
    })

  console.info("this data from token created" , data.access_token)
  return data
  }

 
 
    renderButton(){
        try{
      
         
            this.CreateToken().then((token)=>{
                console.info("Token has RECIEVED" , token)
                this.setState({
                  TokenParam : token.access_token,
                })
              }).catch((err)=>{
                console.info('error when recieving the new token' , err)
              })
               console.info("hey from empay this token we had recived/////\\\\\\" , this.state.TokenParam)

               this.getOrderData().then((data)=>{
                // console.info("data{}{}{}{}{}{}" , data)
                    this.setState({
                      order1:data
                    })
                    console.info("order1 after set state" , this.state.order1)
              }).catch((err)=>{
                console.info('error getOrderData()' , err)
              });

             setTimeout(()=>{
          
              empay
              .Buttons({
                 clientToken:this.state.TokenParam,
                   createOrder:
                   ()=>{
                    
                      // console.info("now you're clicking" ,this.postData) 
 
                      // this.showalert();
                      console.info("order1 before posting" , this.state.order1)
                      
                      
                     this.postData(
                     "https://api.test.empay.ae/ordering/v1/orders",
                     this.state.order1,
                      this.state.TokenParam
                   ).then((data) => {
                     console.info("data recieved from posting order",data); // JSON data parsed by `data.json()` call
                      const link=data.links[1].href
                      console.info("link" , link)
                    //  this.fetchData("response.json")
                     
                   }).catch((err)=>{
                     console.info("error while posting order" , err)
                   });
                   
              
                   },
                   
                  
              
                   onApprove: function (data, actions) {
                    console.info("data from onApprove" , data)
                    if (data.status === "COMPLETED") {
                      // Show a success message to your buyer
                      alert("Transaction completed");
                    }
                  },
                  // env: "test",
                })
                .render("#empay-button-container");
            
             },1500)
            
          
            // console.info("empay.buttons.createOrder",empay.Buttons({}))
           
           } catch (err) {
             console.error('Error calling empay.Buttons():', err);
           }
   
   
 
    }




      componentDidMount(){

                  this.renderButton();
          };


         componentWillUnmount() {
          const container = document.getElementById('empay-button-container');
          container.innerHTML = '';
        }
          
          render() {
            return (
              <div>
                 <div className="container" > 
               <div className="flex-center flex-column" id="home"> 
                <h1>PaymentssssTss Sample AppIV</h1>
              
                <div
                 id="empay-button-container"
                 >restyeesI</div>
               
              
               </div> 
             </div> 
              </div>
            );
          }
    
      
      
        
  

}

export default EmpayNoScriptsIV;