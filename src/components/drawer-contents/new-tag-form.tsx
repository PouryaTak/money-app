import React from 'react'
import * as lucide from 'lucide-react';
import Icon from '../ui/icons'

const iconList = Object.keys(lucide)

const NewTagForm = () => {
    console.log("🚀 ~ lucide:", iconList)
    
    const onSaveTagButtonClick = () => {
        // save tag to api
    }
  return (
    <>
    <div>NewTagForm</div>
    <div>icon list</div>
   { iconList.map(name => <Icon key={name} name={name}/>)}
    <div>color list</div>
    <div>name input</div>
    <div>save btn</div>
    </>
  )
}

export default NewTagForm