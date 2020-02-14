import React, {useState} from 'react';
import { Link } from "react-router-dom";
import {
  StudySpaceCard,
  Topbar
} from '../components';

// TODO: Delete this. This is only a temporary solution to the handle click
//   callback.
function handleClick() {
  console.log("I've been clicked! Bless this day.");
}

const SearchResults = (props) => {
    const [noResults, setNoResults] = useState(false);

    return (
        <div>
            <Topbar title='Search Results' hasBack/>
            <Link to="/view-space" style={{ textDecoration: "none" }}>
              <StudySpaceCard
                title={props.data.title}
                description={props.data.description}
                imageFilePath={props.data.imageFilePath}
                distance={props.data.distance}
                tags={props.data.tags}
                handleClick={handleClick}
                hasRemove={false}
              />
            </Link>
        </div>
    );
}

export default SearchResults;