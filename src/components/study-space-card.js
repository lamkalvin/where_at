import React, { useState } from "react";
import {
  Button,
  Card,
} from 'react-bootstrap';

function showRemove(hasRemove, handleClickRemove, index, setAppear) {
  if (hasRemove) {
    return <Button index={index}
      style={{ display: "flex", margin: "auto", marginRight: "20px", color: "white" }}
      variant="warning"
      onClick={(e) => { handleClickRemove(e); setAppear(false) }}>
      ★
      </Button>
  }
}

/**
 * Improvements:
 *   - Figure out how to create the ellipsis for description. Here is some
 *     sample code that I tried but couldn't get to work exactly. When the
 *     string exceeds the numLine attribute, only the ellipsis is displayed.
 *        <LinesEllipsis
            text={"Audrey's Cafe serves coffee and tea drinks "}
            maxLine='2'
            ellipsis='...'
            trimRight
            basedOn='letters'
            component="p"
          />
 *   - Either create styled components or function components to clean up this
 *     code
 *   - Real-time updates vs. refreshing page to update recently viewed list
 */
/**
 * Props Expected:
 *  - data: full JSON object containing data about the space
 */
const StudySpaceCard = (props) => {
  const [appear, setAppear] = useState(true);

  return (appear &&
    <Card index={props.data.index} style={{ height: '10rem', width: '100%', flexDirection: 'row' }}>
      <div style={{ height: '100%', width: '40%', overflow: 'hidden' }}>
        <Card.Img style={{ objectFit: 'cover', height: '10rem' }} variant="top" src={props.data.imageFilePath} />
      </div>
      <Card.Body style={{ height: '100%', width: '40%' }}>
        <Card.Title style={{ fontSize: '100%', overflow: 'hidden' }}>{props.data.title}</Card.Title>
        <Card.Text style={{ height: '25%', fontSize: '60%', overflow: 'hidden' }}>
          {props.data.description.join(' ')}
        </Card.Text>
        <Card.Text style={{ fontSize: '75%' }}>
          {props.data.distance}
        </Card.Text>
        <Card.Text style={{ fontSize: '60%' }}>
          Tags: {props.data.tags.join(', ')}
        </Card.Text>
      </Card.Body>
      {showRemove(props.hasRemove, props.handleClickDelete, props.index, setAppear)}
    </Card>
  )
};
/*
 * Sources of Help:
 *  - Card: https://react-bootstrap.github.io/components/cards/#basic-example
 *  - Card.Img orientation: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 *  - Card.Img cropping:
 *      https://react-bootstrap.github.io/layout/grid/#container-props,
 *      https://alligator.io/css/cropping-images-object-fit/
 *  - Card clickable: https://stackoverflow.com/questions/49554070/using-bootstrap-cards-as-a-hyperlink
 **/

export default StudySpaceCard;
