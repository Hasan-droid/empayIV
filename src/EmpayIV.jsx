import { Component, createElement } from "react";

// import { HelloWorldSample } from "./components/HelloWorldSample";
// import "./ui/EmpayIV.css";
 import EmpayNoScriptsIV from "../EmpayNoScriptIV";
 import EmpayNoScriptsII from "../EmpayNoScriptsII";


export default class EmpayIV extends Component {
  
    constructor(props){
      super(props)
      console.info("the props we have" , props)
    }

 
      render() {
        return (
         
            <EmpayNoScriptsIV click={this.handleClick}/>

         
       
        
        );
      }
}
