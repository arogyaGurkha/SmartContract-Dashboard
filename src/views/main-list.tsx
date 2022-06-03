import {
    ArrayField,
    ChipField,
    Datagrid,
    List,
    SingleFieldList,
    TextField,
    TextInput,
    SearchInput,
    WrapperField,
} from 'react-admin';
import RelativeTimeField from "../fields/custom-time-field";
import {Box, Typography} from '@mui/material'

const postFilters = [
    <SearchInput source="q" alwaysOn/>,
    <TextInput label="Title" source="title" defaultValue="Hello, World!"/>,
];

const Empty = () => (
    <Box textAlign="center" m={1}>
        <Typography variant="h4" paragraph>
            No products available
        </Typography>
        <Typography variant="body1">
            Create one or import from a file
        </Typography>
    </Box>
);

export const SmartContractList = (props: any) => (
    <List {...props} filters={postFilters} empty={<Empty/>} exporter={false}>
        <Datagrid rowClick="show">
            <WrapperField label="name_author">
                <TextField source="name"/> <br/>
                <TextField source="author"/>
            </WrapperField>
            <ArrayField source="cc_languages">
                <SingleFieldList>
                    <ChipField source="language"/>
                </SingleFieldList>
            </ArrayField>
            <TextField source="platform"/>
            <RelativeTimeField source="uploaded"/>
        </Datagrid>
    </List>
);