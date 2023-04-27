import React, { useState } from "react";
import { TextArea, Button, Form, Modal } from "semantic-ui-react";
import { POST } from "../../../../Services";
import { loader, stopLoader, sweetAlertWithTimer } from "../../../../utils/sweetAlert";

const defaultObj = new Object({
    name: "",
    email: "",
    mobile: "",
    issue: ""
})
let mobileRegex = /^\d+$/;
let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const ContactUs = () => {
    const [contectUsModal, setContectUsModal] = useState(false);
    const [state, setState] = useState(defaultObj);
    const [inlineMessage, setInlineMessage] = useState("");

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        if (name === "mobile") {
            if (value.length === 11) {
                return
            }
            if (value.length !== 0) {
                let re = mobileRegex.test(value)
                if (!re) { return }
            }
        }
        setState((pre) => ({
            ...pre,
            [name]: value
        }))
    }

    const submitBtn = async (e) => {
        if (!state.name || !state.email || !state.mobile || !state.issue) {
            return inlineMessageFu("All fiels are mandatory")
        }
        let emailVal = emailRegex.test(state.email)
        if (!emailVal) { return inlineMessageFu("Invalid Email Id"); }
        loader()
        let { status, message } = await POST("/public/add-contact-us", state)
        stopLoader()
        if (status === 0) {
            return inlineMessageFu(message);
        }
        setContectUsModal(false)
        return sweetAlertWithTimer(message, 'success', 3000)
    }

    const inlineMessageFu = (msg) => {
        setInlineMessage(msg)
        setTimeout(() => {
            setInlineMessage("")
        }, 4000);
    }

    return (

        <>
            <a style={{ cursor: 'pointer' }} onClick={() => setContectUsModal(true)}>Contact Us</a>

            <Modal
                size={'tiny'}
                dimmer={'blurring'}
                // dimmer={'inverted'}
                open={contectUsModal}
                onClose={() => setContectUsModal(false)}
            >
                <Modal.Header>Contact Us</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input
                                fluid
                                label='Name'
                                placeholder='Name'
                                name="name"
                                value={state.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group widths='equal'>
                            <Form.Input
                                fluid
                                label='Email'
                                placeholder='Email'
                                name="email"
                                value={state.email}
                                onChange={handleChange}

                            />
                        </Form.Group>

                        <Form.Group widths='equal'>
                            <Form.Input
                                fluid
                                label='Mobile Number'
                                placeholder='Mobile Number'
                                name="mobile"
                                value={state.mobile}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field
                                control={TextArea}
                                label='Issues/ Query'
                                placeholder='Tell us more about your issues/query...'
                                name="issue"
                                value={state.issue}
                                onChange={handleChange}
                            />
                        </Form.Group>

                    </Form>
                    {inlineMessage ?
                        <p style={{ color: 'red' }}>{inlineMessage}</p>
                        : ""}

                </Modal.Content>
                <Modal.Actions>
                    <Button color="green" onClick={() => { submitBtn() }}>Submit</Button>
                    <Button color="red" onClick={() => setContectUsModal(false)}>Cancel</Button>
                </Modal.Actions>
            </Modal>

        </>
    )
}

export default ContactUs;