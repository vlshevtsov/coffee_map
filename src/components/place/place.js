import React from 'react';

function Place({place}) {
  return (
    <li id={place.id} className="item">
      <p className="item_title" id={`link-${place.id}`}>
        <a href="/#">{place.name}</a>
        <a href={place.website} target="_blank" rel="noreferrer">
          <img src="/img/web_icon.svg" className="item_icon" alt="website icon" width="20" height="20" />
        </a>
      </p>
      <div>
        <p className="item_address">{place.address}</p>
        <p className="item_worktime">{place.work_time}</p>
        <p></p>
        <img src={`./img${place.photo}`} className="item_photo" alt={place.name} />
        <p className="item_desc">{place.description}</p>
      </div>
    </li>
  );
}

export default Place;


