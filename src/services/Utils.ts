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
// @ts-ignore
import rundef from 'rundef';

export class Utils {
    static range = (min: number, max: number): number[] => {
        const len = max - min + 1;
        const arr = new Array(len);
        for (let i = 0; i < len; i++) {
            arr[i] = min + i;
        }
        return arr;
    };

    static isAddress(input: string): boolean {
        const re = /0x[0-9A-Fa-f]{40}/g;
        return re.test(input);
    }

    static isTransactionHash(input: string): boolean {
        const re = /0x[0-9A-Fa-f]{64}/g;
        return re.test(input);
    }

    static processDataForServerSideRendering<T>(object: T): T {
        //https://github.com/vercel/next.js/discussions/11209
        //Rest client returns undefined fields.
        return rundef(object, true, true);
    }
    static getMessage(e: unknown): string {
        return (e as any).message || `${e}`;
    }
}
