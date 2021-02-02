import React from "react";
import { CFooter } from "@coreui/react";

const DefaultFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="/dashboard" target="_blank" rel="noopener noreferrer">
          COLOCO
        </a>
        <span className="ml-1">&copy; 2020</span>
      </div>
    </CFooter>
  );
};

export default React.memo(DefaultFooter);
