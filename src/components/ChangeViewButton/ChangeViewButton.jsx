import { useState } from 'react';
import styles from './ChangeViewButton.module.css'
import { ReactComponent as StyleOfViewGrid } from '../../assets/styleOfViewGrid.svg'
import { ReactComponent as StyleOfViewList } from '../../assets/styleOfViewList.svg'

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
    <div className={styles['container']}>
      <div onClick={handleClick}>
        <StyleOfViewGrid
        className={styles['button']}
        style = {isGrid ? styleViewActive : styleViewInActive}
        data-type-view = "grid"
      />
      </div>
      
      <div onClick={handleClick}>
        <StyleOfViewList
          className={styles['button']}
          style = {isGrid ? styleViewInActive : styleViewActive}
          data-type-view = "list"
        />
      </div>
    </div>
  )
}

export {ChangeViewButton}