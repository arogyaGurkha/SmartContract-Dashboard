import {Create, SimpleForm, TextInput} from 'react-admin';

export const SCUploadView = (props:any) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Smart Contract Name" />
        </SimpleForm>
    </Create>
)