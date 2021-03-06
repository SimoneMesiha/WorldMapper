import React from 'react'
import RegionEntry from './RegionEntry'
import {Link} from 'react-router-dom'

const RegionList = (props) =>{
    let tempId=0
    return(
        <>
        {
           
            props.listIDs && props.listIDs.filter(entry=>entry.isitmap===true).map(entry=>(

              

                <RegionEntry
                id = {tempId++} name = {entry.name} delete ={props.delete} _id={entry._id} nameChange ={props.nameChange}  listIDs = {props.listIDs} key={Math.floor(Math.random*100000000)+1}
                
                entry={entry}

                 fetchUser ={props.fetchUser} auth={props.auth}
                 setShowCreate ={props.setShowCreate} setShowLogin={props.setShowLogin}
                 reloadTodos ={props.reloadTodos} setActiveRegion = {props.loadRegion}
                 userId ={props.userId}

                />
            )
                
                
                
            )
        }
        </>
    );
}
export default RegionList;