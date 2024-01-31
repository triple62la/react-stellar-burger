import {useState} from "react";

export function useForm(initState) {
    const [formData, setFormData] = useState(initState);

    const handleInputChange = (event) => {
        const {value, name} = event.target;
        setFormData({...formData, [name]: value});
    };
    return {formData, handleInputChange, setFormData};
}