"use client";

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input, Textarea, Button } from '@nextui-org/react';
import clsx from 'clsx';

interface IFormInput {
    name: string;
    symbol: string;
    description: string;
    price: number;
    rentalPrice: number;
    ipfs: string;
}

const CreateCourseForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = data => {
        // Handle form submission
    };

    const commonClassnames = {
        base: 'text-white',
        input: clsx(
            'group-data-[has-value=true]:text-white',
        ),
    } as any;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 rounded-3xl bg-foreground/5 backdrop-blur-lg p-6 border-default/25'>
            <div className="flex gap-4 flex-row">
                <Input
                    label="Name"
                    labelPlacement='outside'
                    placeholder='Enter the name of the course'
                    fullWidth
                    classNames={commonClassnames}
                    {...register('name', { required: true })}
                />
                {errors.name && <span>This field is required</span>}

                <Input
                    label="Symbol"
                    labelPlacement='outside'
                    placeholder='Enter the symbol'
                    fullWidth
                    classNames={commonClassnames}
                    {...register('symbol', { required: true })}
                />
                {errors.symbol && <span>This field is required</span>}
            </div>
            <Textarea
                label="Description"
                labelPlacement='outside'
                placeholder='Enter the description'
                classNames={commonClassnames}
                {...register('description', { required: true })}
            />
            {errors.description && <span>This field is required</span>}

            <Input
                label="Price"
                labelPlacement='outside'
                placeholder='Enter the price'
                type="number"
                classNames={commonClassnames}
                {...register('price', { required: true })}
            />
            {errors.price && <span>This field is required</span>}

            <Input
                label="Rental Price"
                labelPlacement='outside'
                placeholder='Enter the rental price'
                type="number"
                classNames={commonClassnames}
                {...register('rentalPrice', { required: true })}
            />
            {errors.rentalPrice && <span>This field is required</span>}

            <Input
                label="IPFS"
                labelPlacement='outside'
                placeholder='Enter the IPFS link'
                classNames={commonClassnames}
                {...register('ipfs', { required: true })}
            />
            {errors.ipfs && <span>This field is required</span>}

            <Button type="submit" fullWidth>Create Course</Button>
        </form>
    );
};

export default CreateCourseForm;
