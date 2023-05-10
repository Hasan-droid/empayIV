import { Component , createElement } from 'react';
import axios from 'axios';

class EmpayNoScriptsII extends Component {
  constructor(props){
    super(props)
    console.info("props we have in EmapyNoScripts.js" , this.props.click)
    this.createOrder = this.createOrder.bind(this);
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
  async getOrderData(){
    const Order=await axios.get('https://api.test.empay.ae/ordering/v1/orders',{
      params:{
        id:'NG46V4EEPQETQBGPL'
      }
    }).then(Response=>Response.json())
    .catch(err=>console.info("ERROR getOrderData()" , err))
   return Order
  }

 async createOrder(data , actions) {
    const order1=this.getOrderData().bind(this)
    console.info("getOrderData()////" , order1);
   const NewOrder= await axios.post("https://api.test.empay.ae/ordering/v1/orders",
    {
      "intent": "CAPTURE",
      "channel": "WEB_CHECKOUT",
      "purchaseUnits": [
        {
          "customId": "",
          "description": "emVAT 2021 Subscription",
          "invoiceId": "Invoice:123/TIN:456",
          "amount": {
            "currencyCode": "AED",
            "value": "105.00",
            "breakdown": {
              "itemTotal": {
                "value": "100.00",
                "currencyCode": "AED"
              },
              "taxTotal": {
                "value": "5.00",
                "currencyCode": "AED"
              }
            }
          },
          "payee": {
            "billerId": "12001"
          },
          "items": [
            {
              "name": "emVAT",
              "unitAmount": {
                "currencyCode": "AED",
                "value": "100.00"
              },
              "tax": {
                "currencyCode": "AED",
                "value": "5"
              },
              "quantity": 1,
              "description": "subscription fee"
            }
          ]
        }
      ]
    },{
      headers:{
        "Content-Type":"text/plain"
      }
    }
    ).then((data)=>{
      console.info("Response From Post Order",data)
    }).catch((err)=>{
      console.info("ERROR Post Order" , err)
    })
    return NewOrder;
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
  }
 
    renderButton(){
      setTimeout(()=>{
        try{
          // const div=document.createElement('div')
          // div.className='empay-button-container1'
          // document.body.append(div)
  
              //  console.info("heyss from empay" , empay.Buttons({}))
              //   const devContainer=document.getElementById('empay-button-container')
              //   console.info('dev container is here',div)
              const {access_token}=this.CreateToken().then((token)=>{
                console.info("Token has RECIEVED" , token)
                return token;
              }).catch((err)=>{
                console.info('error when recieving the new token' , err)
              })
               console.info("hey from empay this token we had recived/////\\\\\\" , access_token)
             setTimeout(()=>{
           
              empay
              .Buttons({
                clientToken:access_token,
                 
                createOrder: function (data, actions) {
                  return fetch("/my-server/create-empay-order", {
                    method: "post",
                    headers: {
                      "content-type": "application/json",
                    },
                  })
                    .then(function (res) {
                      return res.json();
                    })
                    .then(function (data) {
                      return data.id;
                    });
                },
                onApprove: function (data, actions) {
                  if (data.status === "COMPLETED") {
                    // Show a success message to your buyer
                    alert("Transaction completed");
                  }
                },
              })
              .render("#empay-button-container");
            
             }, 3000)   
            
          
            // console.info("empay.buttons.createOrder",empay.Buttons({}))
           
           } catch (err) {
             console.error('Error calling empay.Buttons():', err);
           }
      },3000)
   
 
    }

      componentDidMount(){

                 this.renderButton();
          };

         componentDidUpdate(){
           this.renderButton()
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
              
                <div onClick={this.getOrderData}
                 id="empay-button-container"
                 >restyeesIV</div>
               
              
               </div> 
             </div> 
              </div>
            );
          }
    
      
      
        
  

}

export default EmpayNoScriptsII;