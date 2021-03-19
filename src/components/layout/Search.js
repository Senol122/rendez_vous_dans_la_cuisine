import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const Search = ({ searchRecipe, alert }) => {
  const [input, setInput] = useState('');

  const onChange = (e) => setInput(e.target.value);

  const onSubmit = (e) => {
    if(input === ''){
      console.log('Alerta mestere');
    } else {
      searchRecipe(input);
      setInput('');
    }

    e.preventDefault();
  }

  return (
    <div>
      <Form className="mt-5" onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Name of the recipe:</Form.Label>
          <Form.Control type="text" placeholder="E.g.: pasta, steak, fried chicken..." value={input} onChange={onChange} />
          <Button type="submit" className="mt-2" >Search</Button>
          { alert && <Alert variant="danger">{alert}</Alert> }
        </Form.Group>
      </Form>
    </div>
  )
}

export default Search