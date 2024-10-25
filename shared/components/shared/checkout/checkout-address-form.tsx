'use client'

import { AdressInput } from "../address-input"
import { FormTextarea } from "../form"
import { WhiteBlock } from "../white-block"
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';


interface Props {
    className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({
    className
}) => {
    const { control } = useFormContext();

    return (
        <WhiteBlock title="3. Адрес доставки" className={className}>

            <div className="flex flex-col gap-5">
                <Controller
                    control={control}
                    name="address"// Будем следить за полем address
                    render={({ field, fieldState }) => (
                        <>
                        <AdressInput onChange={field.onChange} />
                        {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
                        </>
                    )}
                />

                <FormTextarea name="comment" className="text-base" rows={5} placeholder="Комментарий к заказу"/>
            </div>          
        </WhiteBlock>
    )
}