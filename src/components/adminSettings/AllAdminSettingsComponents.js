import * as React from "react";
import "../../App.css";
import UserSettings from "./UserSettings";
import SupportFeedBack from "./SupportFeedback";
import AppSettings from "./AppSettings";
import IntegrationSettings from "./IntegrationSettings";
import SecuritySettings from "./SecuritySettings";
import ReportAnaliticsSetting from "./ReportAnaliticsSettings";
import AccountManagement from './AccountManagement'

const tabs = [
    { key: 1, name: "User Settings", element: <UserSettings /> },
    { key: 2, name: "Account Managment", element: <AccountManagement /> },
    { key: 3, name: "App Settings", element: <AppSettings /> },
    { key: 4, name: "Security Settings", element: <SecuritySettings /> },
    { key: 5, name: "Integration Settings", element: <IntegrationSettings /> },
    {
      key: 6,
      name: "Report & Analitics Settings",
      element: <ReportAnaliticsSetting />,
    },
    { key: 7, name: "Support & Feedback", element: <SupportFeedBack /> },
  ];

  export default function AllAdminSettingsComponents({ selectedItem }) {
    for (let tab of tabs) {
      if (tab.name === selectedItem) {
        return tab.element;
      }
    }
      return <div><UserSettings/></div>;
  }