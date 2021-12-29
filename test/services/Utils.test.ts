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

import { Utils } from '@services/Utils';
import { expect } from 'chai';
import { it } from 'mocha';

describe('Utils', () => {
    it('range', () => {
        expect(Utils.range(2, 5)).to.be.deep.eq([3, 4, 5]);
    });

    it('isAddress', () => {
        expect(Utils.isAddress('0x61C808D82A3Ac53231750daDc13c777b59310bD9')).to.be.true;
    });

    it('isTransactionHash', () => {
        expect(Utils.isTransactionHash('0x6ecaa5d41de70aa7647db2524ba1cb0c0864fb1924424639df27b56087cf898c')).to.be.true;
    });
});
