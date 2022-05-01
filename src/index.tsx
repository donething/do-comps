import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import "./index.css"
import {HashRouter, Route, Routes} from "react-router-dom"
import {DoTextFieldBtnTest} from "./test/DoTextFieldBtn_test"
import {DoSnackbarTest} from "./test/DoSnackbar_test"
import {DoVpanelTest} from "./test/DoVpanel_test"
import {DoOptionsInputTest} from "./test/DoOptionsInput_test"
import {DoListAddTest} from "./test/DoListAdd_test"
import {DoBackupPanelTest} from "./test/DoBackupPanel_test"
import {DoDialog, DoSnackbar} from "./main"
import {DoDelRevokeTest} from "./test/DoDelRevoke_test"
import {DoTextTest} from "./test/DoText_test"

ReactDOM.render(
  <React.StrictMode>
    <DoSnackbar/>
    <DoDialog/>

    <HashRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/DoSnackbar_Dialog" element={<DoSnackbarTest/>}/>
        <Route path="/DoTextFieldBtn" element={<DoTextFieldBtnTest/>}/>
        <Route path="/DoVpanel" element={<DoVpanelTest/>}/>
        <Route path="/DoOptionsInput" element={<DoOptionsInputTest/>}/>
        <Route path="/DoListAdd" element={<DoListAddTest/>}/>
        <Route path="/DoBackupPanel" element={<DoBackupPanelTest/>}/>
        <Route path="/DoDelRevoke" element={<DoDelRevokeTest/>}/>
        <Route path="/DoText" element={<DoTextTest/>}/>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
