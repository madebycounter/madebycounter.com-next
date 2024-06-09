"use client";

import {
    FormEvent,
    InputHTMLAttributes,
    TextareaHTMLAttributes,
    createContext,
    useContext,
    useState,
} from "react";

type FormValue =
    | string
    | number
    | boolean
    | FileList
    | readonly string[]
    | undefined;

export type FormData = Record<string, FormValue>;

const FormContext = createContext<{
    formData: FormData;
    setFormData: (v: FormData) => void;
}>({
    formData: {},
    setFormData: () => {},
});

export interface FormProps {
    children: React.ReactNode;
    className?: string;
    onSubmit?: (values: FormData) => void;
}

function Form({ children, className, onSubmit }: FormProps) {
    const [values, setValues] = useState({});

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!event.currentTarget.checkValidity()) {
            event.currentTarget.reportValidity();
            return;
        }

        if (onSubmit) onSubmit(values);
    }

    return (
        <FormContext.Provider
            value={{ formData: values, setFormData: setValues }}
        >
            <form className={className} onSubmit={handleSubmit}>
                {children}
            </form>
        </FormContext.Provider>
    );
}

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

function Input({ name, ...props }: FormInputProps) {
    const form = useContext(FormContext);

    function getValue(elem: HTMLInputElement): FormValue {
        if (props.type === "checkbox") {
            return elem.checked;
        } else if (props.type === "file" && elem.files) {
            return elem.files;
        } else if (props.type === "number") {
            return parseFloat(elem.value);
        }
        return elem.value;
    }

    return (
        <input
            {...props}
            name={name}
            onChange={(e) => {
                form.setFormData({
                    ...form.formData,
                    [name]: getValue(e.target),
                });
            }}
        />
    );
}

export interface FormTextAreaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
}

function TextArea({ name, ...props }: FormTextAreaProps) {
    const form = useContext(FormContext);

    return (
        <textarea
            {...props}
            name={name}
            onChange={(e) => {
                form.setFormData({
                    ...form.formData,
                    [name]: e.target.value,
                });
            }}
        />
    );
}

Form.Input = Input;
Form.TextArea = TextArea;

export default Form;
