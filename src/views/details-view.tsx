import CodeView from "./code-view";
import {
    Show,
    SimpleShowLayout,
    TextField,
    WrapperField,
    ArrayField,
    ChipField,
    SingleFieldList,
    Datagrid,
} from 'react-admin'
import CustomTimeField from "../fields/custom-time-field";
import JsonField from "../fields/json-field";
import {Grid, Stack, Button, Divider} from '@mui/material'

const DetailsView = (props: any) => {
    return (
        <Show>
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <Stack spacing={1}>
                        <WrapperField>
                            <span style={{fontSize: 14}}>Uploaded <CustomTimeField source="uploaded"/> by <TextField
                                source="author" style={{fontSize: 14}}/></span>
                        </WrapperField>
                        <TextField source="name" label={false} style={{fontSize: 30}}/>
                        <CodeView source="cc_languages"/>
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
                        <Button variant={"contained"} onClick={installSC}>Install Smart Contract</Button>
                    </SimpleShowLayout>
                </Grid>
            </Grid>
        </Show>
    )
};

const downloadSC = ()=> {
    console.log("Downloading Smart Contract.")
};
const installSC = ()=> {
    console.log("Installing Smart Contract.")
};

export default DetailsView;