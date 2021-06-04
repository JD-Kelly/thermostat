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
  it('has a minimum temperature of 10 degrees', () => {
    for(let i = 0; i < 11; i++) {
      thermostat.down();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(10);
  });
  it('has Power Saving Mode set to default', () => {
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });
  it('can turn PSM off', () => {
    thermostat.turnPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
  });
  it('can turn PSM back on', () => {
    thermostat.turnPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
    thermostat.turnPowerSavingModeOn();
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });
  describe('when power saving mode is on', () => {
    it('has a maximum temperature of 25 degrees', () => {
      for (let i = 0; i < 6; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(25);
    });
  });
  describe('when power saving mode is off', () => {
    it('has a maximum temperature of 32 degress', () => {
      thermostat.turnPowerSavingModeOff();
      for (let i = 0; i < 13; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(32);
    })
  });
  it('can be reset to default temperature', () => {
    for (let i = 0; i < 6; i++) {
      thermostat.up();
    }
    thermostat.resetTemperature();
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });
  describe('displaying energy usage', () => {
    describe('when the temperature is below 18 degrees', () => {
      it('returns low-usage', () => {
        for (let i = 0; i < 3; i++) {
          thermostat.down();
        }
        expect(thermostat.energyUsage()).toEqual('low-usage');
      });
    });
    describe('when the temperature is between 18 and 25', () => {
      it('returns medium-usage', () => {
        expect(thermostat.energyUsage()).toEqual('medium-usage');
      });
    });
    describe('when the temperature is anything else', () => {
      it('returns high-usage', () => {
        thermostat.powerSavingMode = false;
        for (let i = 0; i < 6; i++) {
          thermostat.up();
        }
        expect(thermostat.energyUsage()).toEqual('high-usage');
      });
    });
  });
});

