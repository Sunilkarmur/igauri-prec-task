import React from 'react';
import { useForm, Controller, Form as FormX } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import TextInput from "@/Components/TextInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import axios from 'axios'

const schema = yup.object().shape({
    productImage: yup.mixed().required('Product image is required').test('is-image', 'Invalid image format', value => {
        if (!value) return true; // Allow empty value
        console.log(value, "value.type")
        return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    }),
    productName: yup.string().required('Product name is required'),
    sku: yup.string().required('Product SKU is required'),
    description: yup.string().required('Description is required'),
    retailPrice: yup.number().required('Product Retail Price is required').positive('Product Retail Price must be positive'),
    ourPrice: yup.number().required('Product Our Price is required').positive('Product Our Price must be positive'),
});

const AddProductForm = () => {
    const methods = useForm({
        resolver: yupResolver(schema),
    });

    const { handleSubmit, errors, control } = methods;

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('productImage',data.productImage)
        formData.append('productName',data.productName)
        formData.append('sku',data.sku)
        formData.append('description',data.description)
        formData.append('retailPrice',data.retailPrice)
        formData.append('ourPrice',data.ourPrice)
        const response = await axios.post(route('products.store'),formData)
        alert(response.data.message);
        window.location.href = route('products.index');
    };
    console.log(errors, "errors")
    return (
        <FormX {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="productImage"
                control={control}
                render={({
                             field:{onChange, ref, name, onBlur},
                             fieldState: { invalid, isTouched, isDirty, error },
                         })=>{

                    return (
                        <TextInput onChange={(e) => onChange(e.target.files[0])}
                                   onBlur={onBlur} controlId="productName" label="Product Image" type="file" placeholder="Select Product Image" name={name} register={ref} error={error} />
                    )
                }}
            />
            <Controller
                name="productName"
                control={control}
                render={({
                             field:{onChange, ref, name, onBlur},
                             fieldState: { invalid, isTouched, isDirty, error },
                         })=>{

                    return (
                        <TextInput onChange={onChange} controlId="productName" label="Product Name" type="text" placeholder="Enter Product Name" name={name} register={ref} error={error} />
                    )
                }}
            />
            <Controller
                name="sku"
                control={control}
                render={({
                             field:{onChange, ref, name, onBlur},
                             fieldState: { invalid, isTouched, isDirty, error },
                         })=>{

                    return (
                        <TextInput onChange={onChange} controlId="sku" label="Product SKU" type="text" placeholder="Enter Product SKU" name={name} register={ref} error={error} />
                    )
                }}
            />
            <Controller
                name="description"
                control={control}
                render={({
                             field:{onChange, ref, name, onBlur},
                             fieldState: { invalid, isTouched, isDirty, error },
                         })=>{

                    return (
                        <TextInput onChange={onChange} controlId="description" label="Product description" type="text" placeholder="Enter Product description" name={name} register={ref} error={error} />
                    )
                }}
            />
            <Controller
                name="retailPrice"
                control={control}
                render={({
                             field:{onChange, ref, name, onBlur},
                             fieldState: { invalid, isTouched, isDirty, error },
                         })=>{

                    return (
                        <TextInput onChange={onChange}  controlId="price" label="Retail Price" type="number" placeholder="Enter Retail Price" name={name} register={ref} error={error} />
                    )
                }}
            />
            <Controller
                name="ourPrice"
                control={control}
                render={({
                             field:{onChange, ref, name, onBlur},
                             fieldState: { invalid, isTouched, isDirty, error },
                         })=>{

                    return (
                        <TextInput onChange={onChange}  controlId="price" label="Our Price" type="number" placeholder="Enter Our Price" name={name} register={ref} error={error} />
                    )
                }}
            />
 <PrimaryButton type="button" onClick={handleSubmit(onSubmit)}>
                Submit
            </PrimaryButton>
        </Form>
        </FormX>
    );
};

export default AddProductForm;
