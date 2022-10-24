import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import "./index.css"
import {HashRouter, Route, Routes} from "react-router-dom"
import {DoTextFieldBtnTest} from "./test/DoTextFieldBtn_test"
import {DoSnackbarTest} from "./test/DoSnackbar_test"
import {DoVpanelTest} from "./test/DoVpanel_test"
import {DoOptionsInputTest} from "./test/DoOptionsInput_test"
import {DoListAddTest} from "./test/DoListAdd_test"
import {DoBackupPanelTest} from "./test/DoBackupPanel_test"
import {DoBackdrop, DoDialog, DoDrawer, DoSnackbar} from "./main"
import {DoDelRevokeTest} from "./test/DoDelRevoke_test"
import {DoTextTest} from "./test/DoText_test"
import {DoFileUploadTest} from "./test/DoFileUpload_test"
import {DoListTest} from "./test/DoList_test"
import {DoAutocompleteTest} from "./test/DoAutocomplete_test"

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <DoSnackbar/>
    <DoDialog/>
    <DoDrawer/>
    <DoBackdrop/>

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
        <Route path="/DoFileUpload" element={<DoFileUploadTest/>}/>
        <Route path="/DoList" element={<DoListTest/>}/>
        <Route path="/DoAutocomplete" element={<DoAutocompleteTest/>}/>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
