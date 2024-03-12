import React from 'react';
import { Form } from 'react-bootstrap';

const TextInput = ({ controlId, label, name, type, placeholder, register, onChange, error }) => {
    return (
        <Form.Group controlId={controlId} className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} name={name} isInvalid={!!error} onChange={onChange} {...register} />
            {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
        </Form.Group>
    );
};

export default TextInput;
