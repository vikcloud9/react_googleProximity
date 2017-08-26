	import React from 'react';
	import GenUUID from './GenUUID.jsx';
	import GetBeaconInfo from './GetBeaconInfo.jsx';
	import styles from './styles/appStyle.css'; 

	class App extends React.Component
	{
		constructor(props) {
			super(props);

			this.state = {
				form: {advertisedId: 'Initial uuid...',
				description: 'proximity beacon',
				latitude: '47.6693771',
				longitude: '-122.1966037'}};

				this.onSubmit = this.onSubmit.bind(this);
				this.onChange = this.onChange.bind(this);
			}
			onChange(event)
			{
				this.state.form[event.target.name] = event.target.value;
				this.setState({form: this.state.form});
			}

			onSubmit(event)
			{
				event.preventDefault();
				register(this.state);
				
			}

			render()
			{
				return(
					<div>
					<h1 className = "center">Beacon project</h1>
					<GenUUID />
					<form onSubmit={this.onSubmit}>
					<h5>Enter valid Eddystone-UID</h5>
					<TextBox name='advertisedId' 
					value={this.state.form.advertisedId}
					onChange={this.onChange}/>
					<h5>Enter description</h5>
					<TextBox name='description'
					value={this.state.form.description}
					onChange={this.onChange}/>
					<h5>Enter latitude</h5>  
					<TextBox name='latitude'
					value={this.state.form.latitude}
					onChange={this.onChange}/>
					<h5>Enter longitude</h5>  
					<TextBox name='longitude'
					value={this.state.form.longitude}
					onChange={this.onChange}/>
					<button className= 'btn' type='submit'>Submit</button>
					</form>
					<br />
					<h3>Try getting the beacon info here !!</h3>
					<GetBeaconInfo />
					</div>
					);
			}
		}

		class TextBox extends React.Component
		{
			render()
			{
				return (
					<input 
					name={this.props.name}
					type='text' 
					value={this.props.value}
					onChange={this.props.onChange}/>
					);
			}

		}

		// function isValid(advertisedId)
		// {
  //           var pattern = new RegExp('/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/');
  //           return pattern.test(advertisedId);
		// }

		function register(state)
		{
		// make a http request using the stored refresh token (obtained in the first Oauth2 access to the api, by having access type as offline), clientid and client secret to google auth. service
	//  response is a temporary accessToken
	var clientId = "446148007235-skbhdsrhnli6mt27t68i9hovd150l7ge.apps.googleusercontent.com";
	var clientSecret="8jkcZGPFKJxIExq5KUiE-mDv";
	var refreshToken="1/EOibAne0jv6VRraxeEqiBgatkyedU5K8P4DvAocUvsw";
	var accessObj;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4){
			if (this.status == 200) {
				accessObj = JSON.parse(this.response);
				alert("Oauth 2.0 Access token is received: "+accessObj.access_token);
			   callRegister(accessObj.access_token, state);
			}
			else{
				alert("there is a problem getting the access token: "+this.responseText);
			}
		}    
	};
	xhttp.open("POST", "https://www.googleapis.com/oauth2/v4/token",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("client_id="+clientId+"&client_secret="+clientSecret+"&refresh_token="+refreshToken+"&grant_type=refresh_token");

}

function callRegister(access_token, state)
{
	// make a http post request using the json object as request body and the access token as authentication
	alert("hi");
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4){
			if (this.status == 200) {
				alert("SUCCESS!! The response body is: "+this.responseText+". The status code: "+this.status);
				//accessObj = JSON.parse(this.response);
				//alert(accessObj.beaconName);
				
			}
			else{
				alert("there is a problem in registring the beacon, the response body: "+this.responseText);
			}
		}    
	};
	xhr.open("POST", "https://proximitybeacon.googleapis.com/v1beta1/beacons:register",true);
	xhr.setRequestHeader("authorization","Bearer "+access_token);
	xhr.send(createJSON(state));
}

function createJSON(state)
{
	// create the json request body to be sent to register beacon, using ip data from the form
	var requestObj = {
		"advertisedId": {
			"type": "EDDYSTONE",
			"id": state.form.advertisedId
		},
		"status": "ACTIVE",
		"latLng": {
			"latitude": state.form.latitude,
			"longitude": state.form.longitude
		}, "description": state.form.description
	};
	var myJSON = JSON.stringify(requestObj);
	return myJSON;
}

export default App;