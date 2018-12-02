import React from 'react';

export default ({icon, label, clickHandler, cssClass}) => (
<button className={`iconButton${cssClass? ' ' + cssClass : ''}`} onClick={clickHandler}>
    <span className="icon">{icon()}</span>
    <span className="visuallyHidden">{label}</span>
</button>);