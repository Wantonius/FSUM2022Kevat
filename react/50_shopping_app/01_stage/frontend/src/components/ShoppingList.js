import Row from './Row'
import RemoveRow from './RemoveRow';
import {useState} from 'react';

const ShoppingList = (props) => {

	const [state,setState] = useState({
		removeIndex:-1,
		editIndex:-1
	})
	
	const changeToRemoveMode = (index) => {
		setState({
			removeIndex:index,
			editIndex:-1
		})
	}
	
	const changeToEditMode = (index) => {
		setState({
			removeIndex:-1,
			editIndex:index
		})
	}
	
	const cancel = () => {
		setState({
			removeIndex:-1,
			editIndex:-1
		})
	}
	
	const removeFromList = (id) => {
		props.removeFromList(id);
		cancel();
	}
	
	let items = props.list.map((item,index) => {
		if(state.removeIndex === index) {
			return(
				<RemoveRow key={item.id} item={item} cancel={cancel} removeFromList={removeFromList}/>
			)
		}
		return(
			<Row key={item.id} item={item} index={index} changeToRemoveMode={changeToRemoveMode} changeToEditMode={changeToEditMode}/>
		)
	})
	return(
		<table className="table table-striped">
			<thead>
				<tr>
					<th>Type</th>
					<th>Count</th>
					<th>Price</th>
					<th>Remove</th>
					<th>Edit</th>
				</tr>	
			</thead>
			<tbody>
			{items}
			</tbody>
		</table>
	)

}

export default ShoppingList;