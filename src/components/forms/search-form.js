import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

function SavePresetModal(props) {
    const [showalert, setalertshow] = useState(false);

    let presetName = "";
    return (
        <Modal
            {...props}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Name your preset!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showalert && <Alert variant="danger">
                    Must have preset name!
                </Alert>}
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Preset name"
                        onChange={(e) => presetName = e.target.value}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {
                    if (presetName !== "") {
                        props.onHide();
                        props.onSubmit(presetName);
                    } else {
                        setalertshow(true);
                    }
                }}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

const SearchForm = (props) => {
    const [ambienceVal, setAmbience] = useState();
    const [popularityVal, setPopularity] = useState();
    const [groupSize, setGroupsize] = useState("Group size");

    const [outlet, toggleOutlet] = useState(false);
    const [usb, toggleUsb] = useState(false);
    const [computer, toggleComputer] = useState(false);
    const [printer, togglePrinter] = useState(false);
    const [whiteboard, toggleWhiteboard] = useState(false);
    const [food, toggleFood] = useState(false);

    const [modalShow, setModalShow] = useState(false);
    const [preset, setPresetDropdown] = useState("Your presets");
    let userPresets = JSON.parse(localStorage.getItem('userPresets'));

    function clearInput() {
        setAmbience(0);
        setPopularity(0);
        setGroupsize("Group size");
        toggleOutlet(false);
        toggleUsb(false);
        togglePrinter(false);
        toggleComputer(false);
        toggleWhiteboard(false);
        toggleFood(false);
        setPresetDropdown("Your presets");
    }

    function focusPreset() {
        setAmbience(1);
        setPopularity(1);
        setGroupsize("1-2");
        toggleOutlet(true);
        toggleFood(false);
    }

    function activePreset() {
        setAmbience(3);
        setPopularity(3);
        setGroupsize("3-4");
        toggleFood(true);
        toggleOutlet(true);
    }

    function comfortablePreset() {
        setAmbience(2);
        setPopularity(2);
        setGroupsize("3-4");
        toggleOutlet(true);
        toggleFood(true);
    }

    function setPreset(preset) {
        setAmbience(preset.ambience);
        setPopularity(preset.popularity);
        setGroupsize(preset.groupSize);
        toggleOutlet(preset.outlet);
        toggleUsb(preset.usb);
        togglePrinter(preset.printer);
        toggleComputer(preset.computer);
        toggleWhiteboard(preset.whiteboard);
        toggleFood(preset.food);
    }

    function createNewPreset(presetName) {
        userPresets.data.push({
            'title': presetName,
            'preset': {
                'ambience': ambienceVal,
                'popularity': popularityVal,
                'groupSize': groupSize,
                'outlet': outlet,
                'usb': usb,
                'printer': printer,
                'computer': computer,
                'whiteboard': whiteboard,
                'food': food
            }
        })
        setPresetDropdown(presetName);
        localStorage.setItem('userPresets', JSON.stringify(userPresets));
    }

    function createPresets() {
        let presets = [];
        for (let i = 0; i < userPresets.data.length; i++) {
            presets.push(
                <Dropdown.Item key={i} onClick={() => { setPreset(userPresets.data[i].preset); setPresetDropdown(userPresets.data[i].title); }}>
                    {userPresets.data[i].title}
                </Dropdown.Item>)
        }
        return presets;
    }

    return (
        <Form>
            <div>
                Search for a study space! If you would like to save your own presets, apply them to the form and save them 
                with the Save Preset button.
            </div>
            <SavePresetModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSubmit={createNewPreset}
            />
            <div style={{ display: 'grid', gridGap: '10px 10px', gridTemplateColumns: 'repeat(2, 1fr)', marginBottom: '10px', marginTop: '10px' }}>
                <Button variant="info" onClick={() => setModalShow(true)}>
                    Save preset
                </Button>
                <Button variant="danger" onClick={() => clearInput()}>
                    Clear input
                </Button>
            </div>

            <Form.Group controlId="app-defined-presets">
            <div>
                <h5>Preset search options</h5>
                We've defined our own presets to make it quick and easy if you're looking for something specific.
                <div>
                    <ToggleButtonGroup type="radio" name="options" value={0} style={{ width: '100%' }}>
                        <ToggleButton variant="warning" value={1} onClick={() => focusPreset()}>Focus</ToggleButton>
                        <ToggleButton variant="warning" value={2} onClick={() => comfortablePreset()}>Comfortable</ToggleButton>
                        <ToggleButton variant="warning" value={3} onClick={() => activePreset()}>Active</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
            </Form.Group>

            <Form.Group controlId="user-defined-presets">
            {(userPresets.data.length > 0) &&
                <div>
                    <h5>Your presets</h5>
                    <div>
                        <DropdownButton id={"dropdown-basic-button" + preset}
                            title={preset}
                            variant="secondary">
                            {createPresets()}
                        </DropdownButton>
                    </div>
                </div>
            }
            </Form.Group>

            <Form.Group controlId="formGridAmb">
                <Form.Label><h5>Ambience</h5></Form.Label>
                <div>
                    What is your preferred noise level?
                    <div>
                        <ToggleButtonGroup type="radio" name="options" value={ambienceVal} style={{ width: '100%' }}>
                            <ToggleButton variant="secondary" value={1} onClick={() => setAmbience(1)}>Rather quiet</ToggleButton>
                            <ToggleButton variant="secondary" value={2} onClick={() => setAmbience(2)}>Moderately active</ToggleButton>
                            <ToggleButton variant="secondary" value={3} onClick={() => setAmbience(3)}>Very loud</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </div>
            </Form.Group>

            <Form.Group controlId="formGridPop">
                <Form.Label><h5>Popularity</h5></Form.Label>
                <div>
                    How popular would you like your location to be?
                    <div>
                        <ToggleButtonGroup type="radio" name="options" value={popularityVal} style={{ width: '100%' }}>
                            <ToggleButton variant="secondary" value={1} onClick={() => setPopularity(1)}>Not very popular</ToggleButton>
                            <ToggleButton variant="secondary" value={2} onClick={() => setPopularity(2)}>Moderately popular</ToggleButton>
                            <ToggleButton variant="secondary" value={3} onClick={() => setPopularity(3)}>Very popular</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </div>
            </Form.Group>

            <Form.Group controlId="formGridGroup">
                <Form.Label><h5>Group size</h5></Form.Label>
                <div>
                    How large is your group?
                <div>
                        <DropdownButton id="dropdown-basic-button"
                            title={groupSize}
                            variant="secondary"
                        >
                            <Dropdown.Item onClick={() => setGroupsize("1-2")}>1-2</Dropdown.Item>
                            <Dropdown.Item onClick={() => setGroupsize("3-4")}>3-4</Dropdown.Item>
                            <Dropdown.Item onClick={() => setGroupsize("5-6")}>5-6</Dropdown.Item>
                            <Dropdown.Item onClick={() => setGroupsize("7+")}>7+</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
            </Form.Group>

            <Form.Group controlId="formGridOther">
                <Form.Label><h5>Other</h5></Form.Label>
                <div style={{ marginLeft: '25px' }}>
                    <Form.Row>
                        <Form.Check readOnly id={"ouS"} checked={outlet} onClick={() => toggleOutlet(!outlet)} />
                        Has outlet
                    </Form.Row>
                    <Form.Row>
                        <Form.Check readOnly id={"usS"} checked={usb} onClick={() => toggleUsb(!usb)} />
                        Has USB charging port
                    </Form.Row>
                    <Form.Row>
                        <Form.Check readOnly id={"coS"} checked={computer} onClick={() => toggleComputer(!computer)} />
                        Has public computer
                    </Form.Row>
                    <Form.Row>
                        <Form.Check readOnly id={"prS"} checked={printer} onClick={() => togglePrinter(!printer)} />
                        Has printer
                    </Form.Row>
                    <Form.Row>
                        <Form.Check readOnly id={"wbS"} checked={whiteboard} onClick={() => toggleWhiteboard(!whiteboard)} />
                        Has whiteboard
                    </Form.Row>
                    <Form.Row>
                        <Form.Check readOnly id={"foS"} checked={food} onClick={() => toggleFood(!food)} />
                        Allows food/drink
                    </Form.Row>
                </div>
            </Form.Group>

            <div style={{ textAlign: 'right', marginBottom: '100px' }}>
                <Link to={{ state: { data: props.data, preferences : {
                  ambience: ambienceVal,
                  popularity: popularityVal,
                  groupSize: groupSize,
                  outlet: outlet,
                  usb: usb,
                  printer: printer,
                  computer: computer,
                  whiteboard: whiteboard,
                  food: food
                }}, pathname: "/search-results" }}>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Link>
            </div>
        </Form>)
};

export default SearchForm;
