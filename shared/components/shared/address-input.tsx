'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="b91ed4f943bc4fe7c251acf4863c9d198bd09c53"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
