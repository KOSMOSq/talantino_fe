import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useDispatch, useSelector } from 'react-redux';
import { setTalentsView } from '../../../../redux/reducers/talentsReducer';


function ChangeViewButton() {
	const talentsView = useSelector(store => store.talents.talentsView);
	const dispatch = useDispatch();

	const handleChange = (event, value) =>{
		if (value != null) {
			dispatch(setTalentsView(value));
		}
	}

	return (
		<ToggleButtonGroup 
			value={talentsView} 
			onChange={handleChange}
			exclusive>
		<ToggleButton value = "grid" aria-label="left aligned"> <ViewModuleIcon value = "grid"/></ToggleButton>
		<ToggleButton value = "list" aria-label="right aligned"> <ViewListIcon value = "list"/></ToggleButton>
		</ToggleButtonGroup>
	)
}

export {ChangeViewButton}