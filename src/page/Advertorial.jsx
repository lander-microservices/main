import React from 'react';
import { LANDERS } from '../config/imports';

export default function Advertorial({ blok }){
    return (
    <React.Suspense fallback={<></>}>
        <LANDERS.advertorial.v1 />
    </React.Suspense>
    )
}