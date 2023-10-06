import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "@material-ui/core";

import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import { delay } from "../common/helper";
import Button from '@material-ui/core/Button';

import shallow from "zustand/shallow";
import { useControls, useData } from "../common/store";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { sortingAlgorithms } from "../common/config";

import {
  convertInputToArrayString,
  convertArrayStringToArray,
} from "../common/helper";

const ControlBar = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  margin: 16px 0;
  flex-wrap: wrap;
`;

const ExecutionBar = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 40%;
  flex-grow: 1;
  margin-bottom: 20px;
`;


function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

export function Controller() {

  const [algorithm, setAlgorithm] = useData(
    (state) => [state.algorithm, state.setAlgorithm],
    shallow
  );

  const [isPausing, setIsPausing] = useState(false);

  const [progress, speed] = useControls(
    (state) => [state.progress, state.speed],
    shallow
  );

  const [sortingArray, setSortingArray] = useData(
    (state) => [state.sortingArray, state.setSortingArray],
    shallow
  );

  const [startSorting, pauseSorting, resetSorting, setSpeed] = useControls(
    (state) => [
      state.startSorting,
      state.pauseSorting,
      state.resetSorting,
      state.setSpeed,
    ],
    shallow
  );

  const [arrayInput, setArrayInput] = useState(sortingArray);

  const startElement = <Button variant="outlined" onClick={startSorting}>Start</Button>;
  const pauseElement = <Button variant="outlined" onClick={pauseAndDelaySorting}>Pause</Button>;
  const resetElement = <Button variant="outlined"  onClick={resetSorting}>Restart</Button>;
  const disabledPauseElement = <Button variant="outlined"  onClick={pauseAndDelaySorting} disabled>Pause</Button>;

  async function pauseAndDelaySorting(){
    pauseSorting();
    setIsPausing(true);
    await delay(useControls.getState().swapTime);
    setIsPausing(false);
  }

  function arrayDataChangeHandler(value) {
    const arrayString = convertInputToArrayString(value);
    setArrayInput(arrayString);

    const array = convertArrayStringToArray(arrayString);
    setSortingArray(array);
    resetSorting();
  }

  function getProgressButton() {
    if(isPausing)
      return disabledPauseElement;

    switch (progress) {
      case "reset":
        return startElement;
      case "start":
        return pauseElement;
      case "pause":
        return startElement;
      case "done":
        return disabledPauseElement;
    }
  }

  return (
    <>
      <ControlBar>
        <Input
          type="file"
          id="upload"
          onChange={(event)=> { 
            console.log(event.target.files)
              event.preventDefault()
              const reader = new FileReader()
              reader.onload = async (event) => { 
                const numbersToAdd = (event.target.result).replace(/[ \t\n]+/g, ",")
                // console.log(numbersToAdd)
                arrayDataChangeHandler(numbersToAdd)
              };
              reader.readAsText(event.target.files[0])
          }}
          style={{width: '50%'}}
        />
      <TextField
          id="outlined-basic"
          label="Input"
          variant="outlined"
          onChange={(event) => arrayDataChangeHandler(event.target.value)}
          value={arrayInput}
          size="small"
          width="100px"
          style={{ flexGrow: 1, margin: '0 10px' }}
        />
      </ControlBar>
      <ExecutionBar>
        <Slider
          key={`slider-${speed}`}
          defaultValue={speed}
          onChange={(event, value) => setSpeed(value)}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
          style={{ flexGrow: 1, flexBasis: "100%" }}
        />
        <div style={{ display: "flex", marginLeft: '20px', columnGap: '5px' }}>
          {getProgressButton()}
          {resetElement}
        </div>
      </ExecutionBar>
      <AppBar position="static" color="primary">
        <Tabs
          value={algorithm}
          onChange={(event, id) => setAlgorithm(id)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {sortingAlgorithms.map((algorithm) => (
            <Tab
              label={algorithm.title}
              {...a11yProps(0)}
              key={algorithm.title}
            />
          ))}
        </Tabs>
      </AppBar>
    </>
  );
}
