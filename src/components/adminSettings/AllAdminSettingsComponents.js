import * as React from "react";
import "../../App.css";
import UserSettings from "./UserSettings";
import SupportFeedBack from "./SupportFeedback";
import AppSettings from "./AppSettings";
import IntegrationSettings from "./IntegrationSettings";
import ReportAnaliticsSetting from "./ReportAnaliticsSettings";
import AccountManagement from "./AccountManagement";

const tabs = [
  { key: 1, name: "User", element: <UserSettings /> },
  { key: 2, name: "Account", element: <AccountManagement /> },
  { key: 3, name: "App", element: <AppSettings /> },
  { key: 5, name: "Integration", element: <IntegrationSettings /> },
  { key: 6, name: "Report&Analitics", element: <ReportAnaliticsSetting /> },
  { key: 7, name: "Support&Feedback", element: <SupportFeedBack /> },
];

export default function AllAdminSettingsComponents({ selectedItem }) {
  for (let tab of tabs) {
    if (tab.name === selectedItem) {
      return tab.element;
    }
  }
  return (
    <div>
      <UserSettings />
    </div>
  );
}
