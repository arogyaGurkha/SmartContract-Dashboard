import CodeView from "./code-view";
import {
    Show,
    SimpleShowLayout,
    TextField,
    WrapperField,
    ArrayField,
    ChipField,
    SingleFieldList,
    Datagrid, useShowController,
} from 'react-admin'
import CustomTimeField from "../fields/custom-time-field";
import JsonField from "../fields/json-field";
import {Grid, Stack, Button, Divider} from '@mui/material'
import React, {useState} from "react";
import FileSaver from "file-saver";
import DropdownMenu from "./dropdown-menu";
import TransactionDialogView from "./transaction-dialog-view";
import {json} from "stream/consumers";

const DetailsView = (props: any) => {

    const {record} = useShowController();
    const [currCode, setCodeView] = useState(0);
    const changeCodeView = (val: number) => setCodeView(val);
    let codeViewMenu = []

    for (const language of record["cc_languages"]) {
        codeViewMenu.push(language.language);
    }

    /**
     * Dropdown here, select item here
     * Parse cc_languages here and send only the necessary link to <CodeView/>
     */
    return (
        <Show>
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <Stack spacing={1}>
                        <WrapperField>
                            <span style={{fontSize: 14}}>Uploaded <CustomTimeField source="uploaded"/> by <TextField
                                source="author" style={{fontSize: 14}}/></span>
                        </WrapperField>
                        <Stack direction="row"
                               justifyContent="space-between"
                               alignItems="center"
                               spacing={2}>
                            <TextField source="name" label={false} style={{fontSize: 30}}/>
                            <DropdownMenu
                                title={"Programming Languages"}
                                menuOptions={codeViewMenu}
                                menuCallbackAction={changeCodeView}/>
                        </Stack>
                        <CodeView source={record.cc_languages[currCode]}/>
                    </Stack>
                </Grid>
                <Grid item xs={6} md={4}>
                    <SimpleShowLayout>
                        <TextField source="description" label={"Chaincode Description"}/>
                        <TextField source="platform"/>
                        <TextField source="signature_policy"/>
                        <ArrayField source={"cc_languages"}>
                            {/*TODO: Write a custom component for this!!*/}
                            <Datagrid>
                                <ChipField source="language"/>
                                <JsonField source="asset_struct" name={null}/>
                                <JsonField source="dependencies" name={null}/>
                            </Datagrid>
                        </ArrayField>
                        <ArrayField source="app_languages">
                            <SingleFieldList>
                                <ChipField source="language"/>
                            </SingleFieldList>
                        </ArrayField>
                        <ArrayField source="versions">
                            <SingleFieldList>
                                <ChipField source="version"/>
                            </SingleFieldList>
                        </ArrayField>
                        <Divider light/>
                        <Button variant={"contained"} onClick={downloadSC}>Download Smart Contract</Button>
                        <Button variant={"contained"}
                                onClick={() => installSC(record)}>Install
                            Smart Contract</Button>
                        {/*<TransactionDialogButton/>*/}
                    </SimpleShowLayout>
                </Grid>
            </Grid>
        </Show>
    )
};

const downloadSC = () => {
    console.log("Downloading Smart Contract.")
    FileSaver.saveAs("https://cors-anywhere.herokuapp.com/api.github.com/repos/arogyaGurkha/GurkhaContracts/tarball/main", "CC.tar.gz")
};


const installSC = (source: any) => {
    console.log("Installing Smart Contract.")
    // TODO first save the smartcontract to server
    // Request needs
    /**
     * Name
     * Path
     * Language
     */

    console.log(source["cc_languages"][0].language)

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "cc_name": source["name"],
        "cc_path": source["name"] + "/chaincode-" + source["cc_languages"][0].language,
        "cc_language": source["cc_languages"][0].language
    });

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/fabric/dashboard/deployCC", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
};

const TransactionDialogButton = () => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const openDialog = () => {setDialogIsOpen(true);}
    const closeDialog = () => setDialogIsOpen(false);
    const jsonSrc = {
        "fabric-contract-api": "^2.0.0",
        "fabric-shim": "^2.0.0",
        "json-stringify-deterministic": "^1.0.1",
        "sort-keys-recursive": "^2.1.2"
    }

    const value = fetchAssets()

    return (
        <div>
            <Button variant={"contained"} onClick={openDialog}>Use SC for Transaction</Button>
            <TransactionDialogView open={dialogIsOpen}
                                   onClose={closeDialog}
                                   jsonSrc={jsonSrc}/>
        </div>
    )
};

const fetchAssets = () => {
    var requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow'
    };

    let data = fetch("http://localhost:8080/fabric/dashboard/smart-contracts/asset", requestOptions)
        .then(response => response.text())
        .then(result =>{ return result})
        .catch(error => console.log('error', error));
    console.log(data)
}

export default DetailsView;