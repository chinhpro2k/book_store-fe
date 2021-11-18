import HomeRouter from './HomeRouter'
import '../style/pageRight.scss'
import { useEffect, useState } from 'react'
import local from '../../../../services/local'
function PageRight(props){
  useEffect(()=>{
    let activeMenu=local.get('menu')
    if (activeMenu){
      setParentTitle(activeMenu.parentTitle)
      setChildrenTitle(activeMenu.childrenTitle)
    }

  })
  const [parentTitle,setParentTitle]=useState();
  const [childrenTitle,setChildrenTitle]=useState();
  return(
    <div id="page-right">
      <div className="title-page">
       <div className="parent">
         {parentTitle? <p>{parentTitle}</p>: <p> {props.choseMenu.parentTitle?props.choseMenu.parentTitle:"Tổng quan cửa hàng"}</p>}
       </div>
        <div className="children d-flex align-items-center">
          <i className="fas fa-chevron-right"/>
          {childrenTitle?childrenTitle:props.choseMenu.childrenTitle}

        </div>
      </div>
      <div>
        <HomeRouter/>
      </div>
    </div>
  )
}
export default PageRight;