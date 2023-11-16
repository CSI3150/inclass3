import React, { useState, useEffect, useRef } from 'react';
import './Counter.css';

function Counter() {
  const [count, setCount] = useState(0);
  const [drones, setDrones] = useState(0);
  const [droneCost, setDroneCost] = useState(20);
  const [dpds, setDpds] = useState(0);
  const [dpdCost, setDpdCost] = useState(10);
  const [clickValue, setClickValue] = useState(1);
  const [clickUpgradeCost, setClickUpgradeCost] = useState(100);
  const [droneEfficiency, setDroneEfficiency] = useState(1);
  const [droneEfficiencyCost, setDroneEfficiencyCost] = useState(1000);
  const [showInfo, setShowInfo] = useState(false);
  const countElement = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (dpds > 0 && count >= droneCost) {
        const dronesToBuy = Math.min(dpds, Math.floor(count / droneCost));
        setDrones(drones + dronesToBuy);
        setCount(count - droneCost * dronesToBuy);
      }
      if (drones > 0) {
        setCount(prevCount => prevCount + drones * droneEfficiency);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [dpds, drones, count, droneCost, droneEfficiency]);

  const increment = () => setCount(prevCount => prevCount + clickValue);
  const decrement = () => setCount(prevCount => prevCount - clickValue);

  const purchaseDrone = () => {
    if (count >= droneCost) {
      setDrones(prevDrones => prevDrones + 1);
      setCount(prevCount => prevCount - droneCost);
    } else {
      alert(`Not enough units to purchase a drone! Current cost: ${droneCost} units`);
    }
  };

  const purchaseDpd = () => {
    if (drones >= dpdCost) {
      setDpds(prevDpds => prevDpds + 1);
      setDrones(prevDrones => prevDrones - dpdCost);
      setDpdCost(prevCost => prevCost * 2);
      setDroneCost(Math.max(droneCost - 1, 1));
    } else {
      alert(`Not enough drones to purchase a Drone Purchasing Drone! Current cost: ${dpdCost} drones`);
    }
  };

  const purchaseClickUpgrade = () => {
    if (count >= clickUpgradeCost) {
      setCount(prevCount => prevCount - clickUpgradeCost);
      setClickValue(prevValue => prevValue * (prevValue + 1));
      setClickUpgradeCost(prevCost => prevCost * 5);
    } else {
      alert(`Not enough units for Click Value Upgrade! Current cost: ${clickUpgradeCost} units`);
    }
  };

  const purchaseDroneEfficiency = () => {
    if (count >= droneEfficiencyCost) {
      setCount(prevCount => prevCount - droneEfficiencyCost);
      setDroneEfficiency(prevEfficiency => prevEfficiency + 1);
      setDroneEfficiencyCost(prevCost => prevCost * 10);
    } else {
      alert(`Not enough units for Drone Efficiency Upgrade! Current cost: ${droneEfficiencyCost} units`);
    }
  };

  const purchaseInfoUpgrade = () => {
    setShowInfo(true);
  };

  useEffect(() => {
    if (countElement.current) {
      countElement.current.classList.add("change");
      setTimeout(() => countElement.current.classList.remove("change"), 200);
    }
  }, [count]);

  return (
    <div className="sections-wrapper">
      <div className="upgrade-section">
        {count >= 100 && (
          <>
            <button onClick={purchaseClickUpgrade}>
              Increase Click Value ({clickUpgradeCost} units)
            </button>
            <button onClick={purchaseDroneEfficiency}>
              Increase Drone Efficiency ({droneEfficiencyCost} units)
            </button>
            {!showInfo && (
              <button onClick={purchaseInfoUpgrade}>Purchase Information</button>
            )}
            {showInfo && (
              <div>
                <p>Click Value: {clickValue}</p>
                <p>Drone Efficiency: {droneEfficiency}</p>
                {/* Additional information about rates and hidden values */}
              </div>
            )}
          </>
        )}
      </div>
      <div className="counter-container">
        <div className="counter">
          <div ref={countElement} className="counter-value">{count}</div>
          <button className="counter-increment" onClick={increment}>+</button>
          <button className="counter-decrement" onClick={decrement}>-</button>
        </div>
      </div>
      <div className="drone-section">
        <button className="drone-purchase" onClick={purchaseDrone}>
          Purchase Drone ({droneCost} units)
        </button>
        <div className="drones-owned">Drones Owned: {drones}</div>
        {drones >= 5 && (
          <div className="dpd-section">
            <button className="dpd-purchase" onClick={purchaseDpd}>
              Purchase DPD ({dpdCost} drones)
            </button>
            <div className="dpds-owned">DPDs Owned: {dpds}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Counter;