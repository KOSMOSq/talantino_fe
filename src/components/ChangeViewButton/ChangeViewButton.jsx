import { useState } from 'react';
import styles from './ChangeViewButton.module.css'
import { ReactComponent as StyleOfViewGrid } from '../../assets/styleOfViewGrid.svg'
import { ReactComponent as StyleOfViewList } from '../../assets/styleOfViewList.svg'
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';

function ChangeViewButton({handleChange}) {
  const [isGrid, setIsGrid] = useState(true);

  const styleViewInActive = { color: "#A0A0A0" }
  const styleViewActive = { color: "#000000" }
  

  function handleClick(e) {
    const typeView = e.target.getAttribute('data-type-view');

    if (typeView === "grid") {
      setIsGrid(true)
    }
    if (typeView === "list") {
      setIsGrid(false)
    }
    
    handleChange(typeView);
  }

  return (
    <ToggleButtonGroup value={"grid"}>
      <ToggleButton value = "grid"> <ViewModuleIcon/></ToggleButton>
      <ToggleButton value = "list"> <ViewListIcon/></ToggleButton>
    </ToggleButtonGroup>
    // <div className={styles['container']}>
    //   <div onClick={handleClick}>
    //     <StyleOfViewGrid
    //     className={styles['button']}
    //     style = {isGrid ? styleViewActive : styleViewInActive}
    //     data-type-view = "grid"
    //   />
    //   </div>
      
    //   <div onClick={handleClick}>
    //     <StyleOfViewList
    //       className={styles['button']}
    //       style = {isGrid ? styleViewInActive : styleViewActive}
    //       data-type-view = "list"
    //     />
    //   </div>
    // </div>
  )
}

export {ChangeViewButton}