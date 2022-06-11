import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Page } from "../../pages/CocktailParty";
import "./Navigation.scss";

interface Props {
  onSelectNav: (selectedPage: Page) => void;
}

const Navigation = ({ onSelectNav }: Props) => {
  const [key, setKey] = useState(Page.Cocktails);

  const handleNavSelection = (eventKey: string) => {
    setKey(+eventKey);
    onSelectNav(+eventKey);
  };

  return (
    <div className="navigation">
      <Tabs
        id="navigation"
        activeKey={key}
        onSelect={(k) => k && handleNavSelection(k)}
        className="mb-3"
      >
        <Tab eventKey={Page.Cocktails} title="My Cocktails"></Tab>
        <Tab eventKey={Page.Ingredients} title="My Ingredients"></Tab>
      </Tabs>
    </div>
  );
};

export default Navigation;
