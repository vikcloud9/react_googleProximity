import React from 'react';
// import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router'

class Welcome extends React.Component
		{
			render()
			{
				return (
			<div>
			        <main>
          {this.props.children}
        </main>
			</div>
					);
			}

		}
		export default Welcome; 