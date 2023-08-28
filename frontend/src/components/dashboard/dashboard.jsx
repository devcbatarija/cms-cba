import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { Toolbar } from "@mui/material";


export default function Dashboard() {
    return (
        <Toolbar className="sidebar">
          <ul>
            <li>
              <DashboardIcon aria-label="open drawer" className="icon" />
              <span>
                  Dashboard
              </span>
            </li>
            <li>
              <PersonOutlineOutlinedIcon className="icon" />
              <span>
                  Users
              </span>
            </li>
            <li>
              <StoreMallDirectoryOutlinedIcon className="icon" />
              <span>
                  Products
              </span>
            </li>
            <li>
              <CreditCardIcon className="icon" />
              <span>
                  Orders
              </span>
            </li>
            {/* <p className="title">USEFUL</p> */}
            <li>
              <AssessmentOutlinedIcon className="icon" />
              <span>
                  Categories
              </span>
            </li>
          </ul>
        </Toolbar>
      )
}

