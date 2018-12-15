import React from "react";
import { connect } from "react-redux";
import {
  toggleFilterPanelAction,
  resetStoreTypesAction,
  toggleStoreTypeAction
} from "../state/actions.js";

import ArrowDown from "./icons/arrowDown.js";
import RemoveIcon from "./icons/remove.js";
import CircleRemoveIcon from "./icons/circleRemove.js";

const mapStateToProps = state => ({
  storeTypes: state.storeTypes,
  filterPanelOpen: state.ui.filterPanelOpen,
  selectedStoreTypesId: state.filters.storeTypes
});

const mapDispatchToProps = dispatch => ({
  resetStoreTypes: () => dispatch(resetStoreTypesAction()),
  toggleStoreType: id => dispatch(toggleStoreTypeAction(id)),
  toggleFilterPanel: () => dispatch(toggleFilterPanelAction())
});

function FilterPanel({
  storeTypes,
  filterPanelOpen,
  selectedStoreTypesId,
  toggleFilterPanel,
  toggleStoreType,
  resetStoreTypes
}) {
  return (
    <div className="filterPanel">
      <div className="filter-bar_header">
        <button
          className={`filter-panel_toggleBtn${filterPanelOpen ? " open" : ""}`}
          onClick={toggleFilterPanel}
        >
          <span className="filter-panel_toggleBtn_text">Filter results</span>
          <span className="icon filter-panel_arrow">
            <ArrowDown />
          </span>
        </button>
        <button
          className={`btn filter-panel_resetBtn ${
            filterPanelOpen ? "fade-in" : "fade-out"
          }`}
          onClick={resetStoreTypes}
        >
          <span className="removeIcon">
            <CircleRemoveIcon />
          </span>
          <span className="text">reset filters</span>
        </button>
      </div>
      <div>
        <ul style={{ display: `${filterPanelOpen ? "block" : "none"}` }}>
          {storeTypes.map((storeType, i) => {
            const isActive = selectedStoreTypesId.includes(storeType.id);
            return (
              <li key={i}>
                <button
                  className="storeTypeBtn"
                  onClick={() => toggleStoreType(storeType.id)}
                >
                  {isActive ? (
                    <span className="icon">
                      <RemoveIcon />
                    </span>
                  ) : null}
                  <span className="text">{storeType.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterPanel);
