import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { listEvents } from '../actions/eventActions'


const Homepage = () => {

    const localizer = momentLocalizer(moment)

    const dispatch = useDispatch()

    const [myEventsList, setMyEventsList] = useState([{}])

    const form = useRef()

    const eventList = useSelector(state => state.eventList)
    const { success, clientEvents } = eventList

    function getEvents() {
        
        const dateList = clientEvents.data
        
        dateList.forEach(dates => {
            dates.events.forEach(event => {
                
                setMyEventsList(prevState => [...prevState, {
                    title: event.note,
                    start: moment(event.date).toDate(),
                    end: moment(event.date).toDate(),
                    allDay: true,
                    resource: null
                }])

            })

        })

    }

    useEffect(() => {
        
        if (success === true) {
            setMyEventsList([{}])
            getEvents()
        }
        
    }, [success])


    const submitHandler = (e) => {
        e.preventDefault();
        const inputData = new FormData(form.current)
        dispatch(listEvents(inputData))
    }

    

    

    return (


        <div>
            <Container>
                <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />

                <Form ref={form} onSubmit={submitHandler}>
                    <Form.Row>
                    <Form.Group as={Col} controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter email'
                            name="email"
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId='mobile'>
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control
                            type='mobile'
                            placeholder='Enter mobile'
                            name='mobile'
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            name='password'
                        >
                        </Form.Control>
                    </Form.Group>
                    </Form.Row>

                    <Form.Row>
                    <Form.Group as={Col} controlId='action'>
                        <Form.Label>Action</Form.Label>
                        <Form.Control as="select" defaultValue="getEventsInRange" name="action">
                            <option value="getEventsInRange">Get Events in Range</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId='ClientId'>
                        <Form.Label>Client Id</Form.Label>
                        <Form.Control
                            type='ClientId'
                            placeholder='Enter ClientId'
                            name='client_id'
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId='startDate'>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type='startDate'
                            placeholder='Ex 2021-03-22'
                            name='start_date'
                        >
                        </Form.Control>
                    </Form.Group>
                    </Form.Row>

                    <Form.Row>
                    <Form.Group as={Col} controlId='offset'>
                        <Form.Label>Offset</Form.Label>
                        <Form.Control as="select" defaultValue="0" name="offset">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="limit">
                        <Form.Label>Limit</Form.Label>
                        <Form.Control as="select" defaultValue="10" name="limit">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label as="legend" column>
                            Event Type
                            </Form.Label>
                            <Row>
                        <Col>
                            <Form.Check
                                type="radio"
                                label="workout"
                                name="event_type"
                                id="workout"
                                value="workout"
                            />
                            <Form.Check
                                type="radio"
                                label="task"
                                name="event_type"
                                id="task"
                                value="task"
                            />
                        </Col>
                            <Col>
                            <Form.Check
                                type="radio"
                                label="nutrition"
                                name="event_type"
                                id="nutrition"
                                value="nutrition"
                            />
                            <Form.Check
                                type="radio"
                                label="all"
                                name="event_type"
                                id="all"
                                value="all"
                            />
                        </Col>
                        </Row>
                    </Form.Group>
                    </Form.Row>

                    <Button type='submit' vairant='success'>
                        Get Events
                </Button>
                </Form>

            </Container>

        </div>
    )
}

export default Homepage
