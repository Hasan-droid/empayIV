import { Component , createElement } from 'react';
import axios from 'axios';

class EmpayNoScripts extends Component {
  constructor(props){
    super(props)
    this.state = {
      TokenParam  : ''
    }
    console.info("props we have in EmapyNoScripts.js" , this.props.click)
    // this.createOrder = this.createOrder.bind(this);
    this.postData=this.postData.bind(this);
    
  }
getOrderData() {
    return fetch("order1.json")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
  async postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
         Authentication: "Bearer " + this.state.TokenParam,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
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
  // async getOrderData(){
  //   const Order=await axios.get('https://api.test.empay.ae/ordering/v1/orders',{
  //     params:{
  //       id:'NG46V4EEPQETQBGPL'
  //     }
  //   }).then(Response=>Response.json())
  //   .catch(err=>console.info("ERROR getOrderData()" , err))
  //  return Order
  // }
 

  
//  async createOrder(data , actions) {
//     // const order1=this.getOrderData().bind(this)
//     // console.info("getOrderData()////" , order1);
//      console.info("here's the create oreder function token" ,data)
//    const NewOrder= await axios.post("https://api.test.empay.ae/ordering/v1/orders",
//     {
//       "intent": "CAPTURE",
//       "channel": "WEB_CHECKOUT",
//       "purchaseUnits": [
//         {
//           "customId": "",
//           "description": "emVAT 2021 Subscription",
//           "invoiceId": "Invoice:123/TIN:456",
//           "amount": {
//             "currencyCode": "AED",
//             "value": "105.00",
//             "breakdown": {
//               "itemTotal": {
//                 "value": "100.00",
//                 "currencyCode": "AED"
//               },
//               "taxTotal": {
//                 "value": "5.00",
//                 "currencyCode": "AED"
//               }
//             }
//           },
//           "payee": {
//             "billerId": "12001"
//           },
//           "items": [
//             {
//               "name": "emVAT",
//               "unitAmount": {
//                 "currencyCode": "AED",
//                 "value": "100.00"
//               },
//               "tax": {
//                 "currencyCode": "AED",
//                 "value": "5"
//               },
//               "quantity": 1,
//               "description": "subscription fee"
//             }
//           ]
//         }
//       ]
//     },{
//       headers:{
//         "Content-Type":"application/json",
//         "Authorization":`Bearer ${this.state.TokenParam}`
//       }
//     }
//     ).then((data)=>{
//       const Link=data.data.links[2].href;
//       axios.get(Link);
//       console.info("Response From Post Order",data.data.links[2].href)

//     }).catch((err)=>{
//       console.info("ERROR Post Order" , err)
//     })
//     return NewOrder;
    // const orderID=  postData(
    //   "https://api.test.empay.ae/ordering/v1/orders",
    //   order1
    // ).then((data) => {
    //   console.info(data); // JSON data parsed by `data.json()` call
    //   return data.id;
    // });
    // /my-server/create-empay-order
  
     
    // let order1 =this.getOrderData();
    // console.info("order1" , order1)

    // return fetch("response.json")
    // .then((response) => response.json())
    // .then((data) => {
    //   console.info(data);
    //   return data.id;
    // });

  

    // return "8WUZJSPCDNNB3U7IF";
    // return fetch("response.json")
    //   .then(handleErrors)
    //   .then(function (res) {
    //     console.log(res.json());
    //     return res.json();
    //   })
    //   .then(function (data) {
    //     console.log(data);
    //     return data.id;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  // }
 
    renderButton(){
      setTimeout(()=>{
        try{
          // const div=document.createElement('div')
          // div.className='empay-button-container1'
          // document.body.append(div)
  
              //  console.info("heyss from empay" , empay.Buttons({}))
              //   const devContainer=document.getElementById('empay-button-container')
              //   console.info('dev container is here',div)
            this.CreateToken().then((token)=>{
                console.info("Token has RECIEVED" , token)
                this.setState({
                  TokenParam : token.access_token
                })
              }).catch((err)=>{
                console.info('error when recieving the new token' , err)
              })
               console.info("hey from empay this token we had recived/////\\\\\\" , this.state.TokenParam)
             setTimeout(()=>{
              debugger;
                let order1 = this.getOrderData;
              empay
              .Buttons({
                //  ssd:console.info('sssssss'),
                  clientToken:this.state.TokenParam,
                   createOrder:function(data , actions){
                     console.info("now you're clicking" , this.postData) 
                  this.postData(
                    "https://api.test.empay.ae/ordering/v1/orders",
                    order1
                  ).then((data) => {
                    console.log(data); // JSON data parsed by `data.json()` call
                    return data.id;
                  }).catch((err)=>{
                    console.info("error while posting order" , err)
                  });
                   },



                  // this.postData(
                  //   "https://api.test.empay.ae/ordering/v1/orders",
                  //   order1
                  // ).then((data) => {
                  //   console.log(data); // JSON data parsed by `data.json()` call
                  //   return data.id;
                  // }).catch((err)=>{
                  //   console.info("error while posting order" , err)
                  // }),
                  
                  //  function (data, actions) {
                  //   console.info("we'er in the createOrder Function")
                  //   // /my-server/create-empay-order
                  //   // console.log(getOrderData());
                  //   return fetch("./response.json")
                  //     .then((response) => response.json())
                  //     .then((data) => {
                  //       console.log("Data fetched from create order",data);
                  //       return data.id;
                  //     });
                  //   },
        
            // return "8WUZJSPCDNNB3U7IF";
            // return fetch("response.json")
            //   .then(handleErrors)
            //   .then(function (res) {
            //     console.log(res.json());
            //     return res.json();
            //   })
            //   .then(function (data) {
            //     console.log(data);
            //     return data.id;
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });
              
                onApprove: function (data, actions) {
                  if (data.status === "COMPLETED") {
                    // Show a success message to your buyer
                    alert("Transaction completed");
                  }
                },
                env: "test",
              })
              .render("#empay-button-container");
            
             }, 3000)   
            
          
            // console.info("empay.buttons.createOrder",empay.Buttons({}))
           
           } catch (err) {
             console.error('Error calling empay.Buttons():', err);
           }
      },3000)
   
 
    }

    como

      componentDidMount(){

                  this.renderButton();
          };

         componentDidUpdate(){
          debugger;
          setTimeout(() => {
              var element = document.getElementById("empay-button-container"); //grab the element
              if(element.addEventListener) {

                } else { 
                element.attachEvent("onclick", function() {})
                }
          }, 5000);
        
         }  

         componentWillUnmount() {
          const container = document.getElementById('empay-button-container');
          container.innerHTML = '';
        }
          
          render() {
            return (
              <div>
                 <div className="container" > 
               <div className="flex-center flex-column" id="home"> 
                <h1>PaymentssssTss Sample App</h1>
              
                <div
                 id="empay-button-container"
                 >restyeesI</div>
               
              
               </div> 
             </div> 
              </div>
            );
          }
    
      
      
        
  

}

export default EmpayNoScripts;