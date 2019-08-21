import * as React from "react";
import {FormCoreContext, useValue} from "./Context";

export const FieldWrapper = ({children, valueKey}: React.PropsWithChildren<{
    valueKey?: string;
}>) => {
    const formCore = React.useContext(FormCoreContext);
    if (!formCore) {
        throw new Error("上下文中不存在 FormCore");
    }
    const value = useValue(formCore);
    if (!React.isValidElement(children)) {
        return <>
            {children}
        </>;
    }
    return React.cloneElement(children, {
        [valueKey != null ? valueKey : 'value']: value,
        onChange: (e: any) => {
            const newVal = typeof e === 'object' && 'preventDefault' in e ? e.target.value : e;
            formCore.update(() => newVal);
            formCore.validateWithAllParent();
        }
    })
};
