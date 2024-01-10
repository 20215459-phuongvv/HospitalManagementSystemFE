import { RootState } from "../../redux";

interface FindProps {
    typeEntity: string
    field: string,
    condition: string
}
export const find = (props: FindProps, state :any) => {
    const name = props.typeEntity.split(".")[0];
    const data = props.typeEntity.split(".")[1];
    const entities = state[name][data].filter((entity) => {
        return entity[props.field].toLowerCase().includes(props.condition); 
    });
}