import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

const Navbar = (props) => {
	
	const state = useSelector(state => {
		return state;
	})
	
	let links = <ul className="navbar-nav"></ul>
	if(state.isLogged) {
		links =	<ul className="navbar-nav">
				<li className="nav-item">
					<Link to="/">Shopping List</Link>
				</li>
				<li className="nav-item" style={{"marginLeft":5}}>
					<Link to="/form">Add new item</Link>
				</li>
				<li className="nav-item" style={{"marginLeft":5}}>
					<Link to="/" onClick={props.logout}>Logout</Link>
				</li>
			</ul>
	}
	
	return(
		<nav className="navbar navbar-expand-lg navbar-light bg-light" style={{"paddingLeft":20}}>
			<p className="navbar-brand">Shopping App</p>
			{links}
		</nav>
	)
}

export default Navbar;