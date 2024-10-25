import React from 'react';

import { useSearchParams } from 'next/navigation'

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

export interface Filters {
    prices: PriceProps
}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void
}

export const useFilters = (): ReturnProps => {

    const searchParams = useSearchParams() as unknown as Map<keyof PriceProps, string>;

    /* Фильтр стоимости*/
    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined
    });

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices((prev) => ({
          ...prev,
          [name]: value,
        }))
    }

    return React.useMemo(
        () => ({
        prices,
        setPrices: updatePrice
    }), [prices])
}