		import React from 'react';
		import styles from './styles/appStyle.css'; 

		class GetBeaconInfo extends React.Component
		{
			constructor(props)
			{
				super(props);
				this.state = {
					uuid: 'Enter uuid here'
				};

				this.updateState = this.updateState.bind(this);
				this.change = this.change.bind(this);
				this.remove = this.remove.bind(this);
			}

            remove()
            {
                this.setState({uuid: ''});
            }

			change(event)
			{
				this.setState({uuid: event.target.value});
			}

			updateState() {

				getBeaconInfo(this.state.uuid);
				
			}
			render()
			{
				return(
					<div>
					<BeaconContent value = {this.state.uuid} storeChange = {this.change} updateStateProp = {this.updateState}  remove = {this.remove}/>
					</div>
					);
			}

		}

		class BeaconContent extends React.Component
		{
			render()
			{
				return(
					<div>
					<input type = 'text' value = {this.props.value} onChange = {this.props.storeChange} onClick = {this.props.remove}/>
					<button className = 'btn' onClick = {this.props.updateStateProp}>CLICK TO GET BeaconInfo</button>
					</div>
					);
			}
		}

		function getBeaconInfo(uuid)
		{
			var api_key = 'AIzaSyATAPfRyj_BxVLHU_Gfsfx03axACF7PjgA';
			var url = 'https://proximitybeacon.googleapis.com/v1beta1/beaconinfo:getforobserved?key='+api_key;
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4){
					if (this.status == 200) {
						var accessObj = JSON.parse(this.response);
				alert("your beacon info: "+accessObj);
			}
			else{
				alert("there is a problem getting info: "+this.responseText);
			}
		}    
	};
	xhttp.open("POST", url, false);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.setRequestHeader("accept","application/json");
	xhttp.send(JSON.stringify({
		"observations": [
		{
			"advertisedId": {
				"type": "EDDYSTONE",
				"id": uuid
			}
		}
		],
		"namespacedTypes": [
		"*"
		],
	}));
}   


export default GetBeaconInfo;