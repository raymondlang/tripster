import { useState } from "react";

const Itinerary = (props) => {
  const [currentTab, setCurrentTab] = useState(0);

  const selectedTab = (event) => {
    event.preventDefault();
    setCurrentTab(parseInt(event.currentTarget.className));
  };

  const header = props.tabs.map((el, idx) => {
    if (idx === currentTab) {
      return (
        <li onClick={selectedTab} className={idx} key={idx}>
          <div className="current-tab-subcontainer">
            <h6 className="tabs-container-text">{el.title}</h6>
          </div>
        </li>
      );
    } else {
      return (
        <li onClick={selectedTab} className={idx} key={idx}>
          <div className="tab-subcontainer">
            <h6 className="tabs-container-text">{el.title}</h6>
          </div>
        </li>
      );
    }
  });

  return (
    <div>
      <div className="tabs-container">{header}</div>
      <div>{props.tabs[currentTab].content}</div>
    </div>
  );
};

export default Itinerary;
