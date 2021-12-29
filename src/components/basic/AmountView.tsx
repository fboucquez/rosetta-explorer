/*
 * Copyright 2022 Fernando Boucquez
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { Badge } from 'react-bootstrap';
import { Amount } from 'rosetta-client-typescript';

export default function AmountView({ amount, title }: { amount?: Amount; title?: string }) {
    if (!amount) {
        return <></>;
    }

    function round(num: number, decimalPlaces = 0): number {
        const p = Math.pow(10, decimalPlaces);
        const n = num * p * (1 + Number.EPSILON);
        return Math.round(n) / p;
    }

    const value = parseInt(amount.value) / 10 ** amount.currency.decimals;
    return (
        <Badge title={title || amount.value}>
            {round(value, 4)} {amount.currency.symbol}
        </Badge>
    );
}
