'use strict';

describe('Thermostat', () => {

  let thermostat;

  beforeEach(() => {
    thermostat = new Thermostat();
  });
  it('starts at 20 degrees', () => {
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });
  it('increases temperature', () => {
    thermostat.up();
    expect(thermostat.getCurrentTemperature()).toEqual(21)
  });
  it('decreases temperature', () => {
    thermostat.down();
    expect(thermostat.getCurrentTemperature()).toEqual(19)
  });
});