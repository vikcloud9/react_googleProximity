import React from 'react';


class GenUUID extends React.Component {

 constructor(props) {
  super(props);

  this.state = {
   data: 'Initial uuid...'
 };

 this.updateState = this.updateState.bind(this);
}

updateState() {

  var res = generateUUID();
  this.setState({data: res});
}



render() {
  return (
   <div>
   <Content myDataProp = {this.state.data} 
   updateStateProp = {this.updateState}></Content>
   </div>
   );
}
}

class Content extends React.Component {

 render() {
  return (
   <div>
   <button className = 'btn' onClick = {this.props.updateStateProp}>CLICK TO GET UUID</button>
   <input type = 'text' value = {this.props.myDataProp} readOnly />
   </div>
   );
}
}

function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  var nameSpace = uuid.substring(0,uuid.indexOf("-"))+uuid.substring(uuid.lastIndexOf("-")+1);
  var instanceId =  uuid.substring(uuid.indexOf("-")+1,uuid.lastIndexOf("-"));
  var eddyId = nameSpace+instanceId.replace(/-/g , "");
 console.log(uuid);
  return hexToBase64(eddyId);
}

function hexToBase64(hexstring) {
  return btoa(hexstring.match(/\w{2}/g).map(function(a) {
    return String.fromCharCode(parseInt(a, 16));
  }).join(""));
}

export default GenUUID;