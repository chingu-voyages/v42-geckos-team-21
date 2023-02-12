import React from 'react'
import "./KanbanView.css"
import underConstruction from "../../assets/undraw_under_construction.svg"

const KanbanView = () => {
  return (
    <div className='KanbanView'>
      <h2>Under construction...</h2>
      <img  src={underConstruction} alt='Under construction...'/>
    </div>
  )
}

export default KanbanView