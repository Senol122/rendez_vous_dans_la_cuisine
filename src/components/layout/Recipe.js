import React, { Fragment } from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';

const Recipe = ({ recipe, wine }) => {
  if(recipe.title && recipe.image){
    return (
      <Fragment>
        <Card>
          <Card.Body>
            <Row>
              <Col sm={4}>
              <Image src={recipe.image} fluid />
              </Col>
              <Col sm={8}>
                <h2>{recipe.title}</h2>
              </Col>
            </Row>
            { wine.title && <Row>
              <Col sm={4}>
                <Image src={wine.image} fluid />
              </Col>
              <Col sm={8}>
                <h2>{wine.title}</h2>
                <p>{wine.description}</p>
              </Col>
            </Row> }
            { wine.pairingText && <Fragment>
              <p className="mt-3">{wine.pairingText}</p>
            </Fragment> }
          </Card.Body>
        </Card>
      </Fragment>
    )
  } else {
    return (
      <Fragment></Fragment>
    )
  }
}

export default Recipe