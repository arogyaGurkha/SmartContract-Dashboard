import React from 'react';
import {Admin, Resource} from 'react-admin';
import {SmartContractList} from "./views/main-list";
import {dataProvider} from "./dataprovider/data-provider";
import DetailsView from "./views/details-view";
import {SCUploadView} from "./views/smartcontract-upload-view";

const App = () => (
    <Admin dataProvider={dataProvider} >
        <Resource name="smart-contracts" list={SmartContractList} show={DetailsView} create={SCUploadView}/>
    </Admin>
)
export default App;
